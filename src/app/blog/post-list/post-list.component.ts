import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { PostsService } from "../posts.service";
import { Post } from "../post";
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postsService: PostsService) { }
  posts: Post[] = []
  private postsListener: Subscription;
  ngOnInit(): void {
    this.postsService.populatePosts()
    this.postsListener = this.postsService.getStream().subscribe((posts) => {
      this.posts = posts
    })
  }
  ngOnDestroy(): void {
    this.postsListener.unsubscribe()
  }
}
