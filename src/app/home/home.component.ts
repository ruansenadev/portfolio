import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from "../album/project";
import { ProjectsService } from "../album/projects.service";
import { Post } from "../blog/post";
import { PostsService } from "../blog/posts.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  projects: Project[]
  posts: Post[]
  private projectsListener: Subscription
  private postsListener: Subscription
  constructor(private projectsService: ProjectsService, private postsService: PostsService) { }

  ngOnInit(): void {
    this.projectsService.populateProjects()
    this.projectsListener = this.projectsService.getStream().subscribe((projects) => this.projects = projects)
    this.postsService.populatePosts()
    this.postsListener = this.postsService.getStream().subscribe((sub) => this.posts = sub.posts)
  }
  ngOnDestroy(): void {
    this.postsListener.unsubscribe()
    this.projectsListener.unsubscribe()
  }
}
