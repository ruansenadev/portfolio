import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { PostDialogComponent } from "../post-dialog/post-dialog.component";
import { PageEvent } from '@angular/material/paginator';
import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";
import { Post } from "../post";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageComponent } from "../../messages/message/message.component";

@Component({
  selector: 'blog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private postsService: PostsService, private dialog: MatDialog, private authService: AuthService, private messageBar: MatSnackBar) { }
  posts: Post[] = []
  private queryListener: Subscription;
  private postsListener: Subscription;
  isAuth: boolean = false;
  private authListener: Subscription;
  left: number = 0;
  itemsOptions = [5, 10, 15];
  items: number = 10;
  length: number;
  skeleton = Array(this.items)
  ngOnInit(): void {
    this.queryListener = this.route.queryParams.subscribe(params => {
      if (params.year || params.month) this.postsService.populatePosts(this.left, this.items, params.year, params.month)
      else this.postsService.populatePosts(this.left, this.items)
    })
    this.postsListener = this.postsService.getStream().subscribe((res) => {
      this.posts = res.posts
      this.length = res.max
    })
    this.isAuth = this.authService.getStatus()
    this.authListener = this.authService.getListener().subscribe((status) => this.isAuth = status)
  }
  delPost(post: Post):void {
    this.dialog.open(PostDialogComponent, {
      minWidth: "250px",
      data: post
    }).afterClosed().subscribe((confirm) => {
      if(confirm) {
        this.postsService.delPost(post._id).subscribe((res) => {
          this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } })
          this.postsService.populatePosts(this.left, this.items)
        })
      }
    })
  }
  onPaginate(paginator: PageEvent): void {
    this.left = paginator.pageIndex;
    this.items = paginator.pageSize;
    this.postsService.populatePosts(this.left, this.items)
  }
  ngOnDestroy(): void {
    this.queryListener.unsubscribe()
    this.postsListener.unsubscribe()
    this.authListener.unsubscribe()
  }
}
