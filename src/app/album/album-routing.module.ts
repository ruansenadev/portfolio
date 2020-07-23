import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { ProjectFormComponent } from "./project-form/project-form.component";

const routes: Routes = [
  { path: 'new', component: ProjectFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:seq', component: ProjectFormComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AlbumRoutingModule {}
