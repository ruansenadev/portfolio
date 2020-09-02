import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectFormComponent } from "./project-form.component";

@Injectable()
export class ProjectDeactivate implements CanDeactivate<ProjectFormComponent> {
  canDeactivate(
    component: ProjectFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return component.canDeactivate()
  }
}
