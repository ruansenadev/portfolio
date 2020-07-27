import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from "../post";
import { PostsService } from "../posts.service";
import { Subscription } from 'rxjs';
import { ShareService } from "../../share/share.service";

@Component({
  selector: 'blog-carousel',
  templateUrl: './blog-carousel.component.html',
  styleUrls: ['./blog-carousel.component.css']
})
export class BlogCarouselComponent implements OnInit, OnDestroy {
  constructor(private postsService: PostsService, private shareService: ShareService) { }
  posts: Post[]
  postsListener: Subscription

  ngOnInit(): void {
    this.postsService.populatePosts()
    this.postsListener = this.postsService.getStream().subscribe((res) => {
      this.posts = res.posts
    })
  }
  showShareables(slug: string): void {
    this.shareService.openSheet('/blog/'+slug)
  }
  ngOnDestroy(): void {
    this.postsListener.unsubscribe()
  }
}
