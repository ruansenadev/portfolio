import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardDeactivate } from "./dashboard/dashboard-deactivate.guard";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard], canDeactivate: [DashboardDeactivate] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, DashboardDeactivate]
})

export class AdminRoutingModule { }
