import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from "../project";
import { ProjectsService } from "../projects.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'album-carousel',
  templateUrl: './album-carousel.component.html',
  styleUrls: ['./album-carousel.component.css']
})
export class AlbumCarouselComponent implements OnInit, OnDestroy {
  constructor(private projectsService: ProjectsService) { }
  projects: Project[] = []
  private projectsListen: Subscription
  statusIcons: { [keys: string]: string } = {
    'Protótipagem': 'construction',
    'Desenvolvimento': 'build_circle',
    'Encerrado': 'highlight_off',
    'Finalizado': 'check_circle'
  }
  ngOnInit(): void {
    this.projectsService.populateProjects()
    this.projectsListen = this.projectsService.getStream().subscribe((projects) => this.projects = projects)
  }
  ngOnDestroy(): void {
    this.projectsListen.unsubscribe()
  }
}