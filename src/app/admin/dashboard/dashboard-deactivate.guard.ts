import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardComponent } from './dashboard.component';

@Injectable()
export class DashboardDeactivate implements CanDeactivate<DashboardComponent> {
  canDeactivate(
    component: DashboardComponent
  ): Observable<boolean>|Promise<boolean>|boolean {
    return component.canDeactivate();
  }
}
