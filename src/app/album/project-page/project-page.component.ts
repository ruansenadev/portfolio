import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  project: Project;
  ngOnInit(): void {
    this.project = this.route.snapshot.data.project;
  }
}
