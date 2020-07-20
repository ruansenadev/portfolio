import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Post } from "../post";

@Component({
  selector: 'blog-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  post: Post
  ngOnInit(): void {
    this.post = this.route.snapshot.data["post"]
  }

}
