import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Post } from "../post";
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  constructor(private postService: PostsService, private route: ActivatedRoute) { }
  private slug: string
  post: Post
  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.postService.getPost(this.slug).subscribe((res) => {
      this.post = res.post
    })
  }

}
