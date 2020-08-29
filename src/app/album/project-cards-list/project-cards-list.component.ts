import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ProjectDialogComponent } from "../project-dialog/project-dialog.component";
import { AuthService } from "../../auth/auth.service";
import { ProjectsService } from "../projects.service";
import { Project } from "../project";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageComponent } from "../../messages/message/message.component";

@Component({
  selector: 'app-project-cards-list',
  templateUrl: './project-cards-list.component.html',
  styleUrls: [
    // './project-cards-list.component.css',
     './project-cards-list.component.scss']
})
export class ProjectCardsListComponent implements OnInit, OnDestroy {
  constructor(private projectsService: ProjectsService, private dialog: MatDialog, private authService: AuthService, private messageBar: MatSnackBar) { }
  projects: Project[]
  isAuth: boolean
  private projectsListen: Subscription
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
    this.projectsService.populateProjects()
    this.projectsListen = this.projectsService.getStream().subscribe((projects) => {
      this.projects = projects
    })
    this.isAuth = this.authService.getStatus()
  }
  delProject(project: Project): void {
    const last = this.projects[0].seq == project.seq
    this.dialog.open(ProjectDialogComponent, {
      minWidth: "250px",
      data: { project, last }
    }).afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.projectsService.delProject(project._id).subscribe((res) => {
          this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } })
          this.projectsService.populateProjects()
        })
      }
    })
  }
  ngOnDestroy(): void {
    this.projectsListen.unsubscribe()
  }
}
