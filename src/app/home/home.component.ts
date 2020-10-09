import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../album/project';
import { ProjectsService } from '../album/projects.service';
import { Post } from '../blog/post';
import { PostsService } from '../blog/posts.service';
import { Admin } from '../admin/admin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  admin: Admin;
  projects: Project[];
  posts: Post[];
  constructor(private route: ActivatedRoute, private projectsService: ProjectsService, private postsService: PostsService) { }

  ngOnInit(): void {
    this.admin = this.route.snapshot.data.admin;
    this.projectsService.getProjects(0, 5).subscribe((res) => this.projects = res.projects);
    this.postsService.getPosts(0, 5).subscribe((res) => this.posts = res.posts);
  }
}
