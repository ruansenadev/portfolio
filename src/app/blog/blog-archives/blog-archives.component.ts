import { Component, OnInit } from '@angular/core';
import { PostsService } from "../posts.service";

export interface Archives {
  [key: number]: [
    {
      month: string,
      count: number
    }
  ]
}
@Component({
  selector: 'blog-archives',
  templateUrl: './blog-archives.component.html',
  styleUrls: ['./blog-archives.component.css']
})
export class BlogArchivesComponent implements OnInit {
  constructor(private postsService: PostsService) { }
  archives: Archives
  ngOnInit(): void {
    this.postsService.getArchives().subscribe(archives => console.log(archives))
  }
}
