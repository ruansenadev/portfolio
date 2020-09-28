import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PostFormComponent } from './post-form.component';

@Injectable()
export class PostDeactivate implements CanDeactivate<PostFormComponent> {
  constructor(private router: Router) {}
  canDeactivate(
    component: PostFormComponent): Observable<boolean>|Promise<boolean>|boolean {
    const curNav = this.router.getCurrentNavigation();
    return curNav.extras && curNav.extras.state && curNav.extras.state.done ? true : component.canDeactivate();
  }
}
