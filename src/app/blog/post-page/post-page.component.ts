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
  private id: string
  post: Post
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.postService.getPost(this.id).subscribe((res) => {
      this.post = res.post
    })
  }

}
