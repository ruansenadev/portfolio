import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { PostDialogComponent } from "../post-dialog/post-dialog.component";
import { PageEvent } from '@angular/material/paginator';
import { PostsService } from "../posts.service";
import { Post } from "../post";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postsService: PostsService, private dialog: MatDialog) { }
  posts: Post[] = []
  private postsListener: Subscription;
  left: number = 0;
  itemsOptions = [5, 10, 15];
  items: number = 5;
  length: number;
  ngOnInit(): void {
    this.postsService.populatePosts(this.left, this.items)
    this.postsListener = this.postsService.getStream().subscribe((res) => {
      this.posts = res.posts
      this.length = res.max
    })
  }
  delPost(post: Post):void {
    this.dialog.open(PostDialogComponent, {
      minWidth: "250px",
      data: post
    }).afterClosed().subscribe((confirm) => {
      if(confirm) {
        this.postsService.delPost(post._id).subscribe((res) => {
          console.log(res.message)
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
    this.postsListener.unsubscribe()
  }
}