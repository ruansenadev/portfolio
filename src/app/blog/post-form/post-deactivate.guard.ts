import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PostFormComponent } from "./post-form.component";

@Injectable()
export class PostDeactivate implements CanDeactivate<PostFormComponent> {
  canDeactivate(
    component: PostFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return component.canDeactivate()
  }
}
