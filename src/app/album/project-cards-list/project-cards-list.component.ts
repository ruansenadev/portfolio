import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { ProjectsService } from "../projects.service";
import { Project } from "../project";

@Component({
  selector: 'app-project-cards-list',
  templateUrl: './project-cards-list.component.html',
  styleUrls: ['./project-cards-list.component.css']
})
export class ProjectCardsListComponent implements OnInit, OnDestroy {
  constructor(private projectsService: ProjectsService) { }
  projects: Project[]
  private projectsListen: Subscription
  statusColors: { [key: string]: string } = {
    'Protótipagem': undefined,
    'Desenvolvimento': 'accent',
    'Encerrado': 'warn',
    'Finalizado': 'primary',
  }
  ngOnInit(): void {
    this.projectsService.populateProjects()
    this.projectsListen = this.projectsService.getStream().subscribe((projects) => {
      this.projects = projects
    })
  }
  ngOnDestroy(): void {
    this.projectsListen.unsubscribe()
  }
}
