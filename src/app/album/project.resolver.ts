import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from "./project";
import { ProjectsService } from "./projects.service";

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<Project> {
  constructor(private projectsService: ProjectsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Project> {
    const seq = +route.paramMap.get('seq')
    return this.projectsService.getProject(seq)
  }
}
