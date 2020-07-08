import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { PostDialogComponent } from "../post-dialog/post-dialog.component";
import { Subscription } from "rxjs";
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
  ngOnInit(): void {
    this.postsService.populatePosts()
    this.postsListener = this.postsService.getStream().subscribe((posts) => {
      this.posts = posts
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
          this.postsService.populatePosts()
        })
      }
    })
  }
  ngOnDestroy(): void {
    this.postsListener.unsubscribe()
  }
}
