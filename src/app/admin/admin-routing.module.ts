import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { AdminResolver } from './admin.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardDeactivate } from './dashboard/dashboard-deactivate.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: { account: AdminResolver },
    canDeactivate: [DashboardDeactivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminResolver, DashboardDeactivate]
})

export class AdminRoutingModule { }
