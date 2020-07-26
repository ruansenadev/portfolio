import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Project } from "../project";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  project: Project
  statusIcons: { [key: string]: string } = {
    'Protótipagem': 'construction',
    'Desenvolvimento': 'build_circle',
    'Encerrado': 'highlight_off',
    'Finalizado': 'check_circle'
  }
  statusColors: { [key: string]: string } = {
    'Protótipagem': '',
    'Desenvolvimento': 'accent',
    'Encerrado': 'warn',
    'Finalizado': 'primary',
  }
  ngOnInit(): void {
    this.project = this.route.snapshot.data['project']
  }
}
