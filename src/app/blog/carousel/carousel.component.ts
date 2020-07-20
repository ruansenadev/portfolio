import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from "../post";
import { PostsService } from "../posts.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'blog-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  constructor(private postsService: PostsService) { }
  posts: Post[]
  postsListener: Subscription

  ngOnInit(): void {
    this.postsService.populatePosts()
    this.postsListener = this.postsService.getStream().subscribe((res) => {
      this.posts = res.posts
    })
  }

  ngOnDestroy(): void {

  }

}
