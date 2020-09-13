import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectFormComponent } from "./project-form.component";

@Injectable()
export class ProjectDeactivate implements CanDeactivate<ProjectFormComponent> {
  constructor(private router: Router) {}
  canDeactivate(
    component: ProjectFormComponent
  ): Observable<boolean>|Promise<boolean>|boolean {
    const curNav = this.router.getCurrentNavigation()
    return curNav.extras && curNav.extras.state && curNav.extras.state.done ? true : component.canDeactivate()
  }
}
