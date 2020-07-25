import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { ProjectResolver } from "./project.resolver";
import { ProjectFormComponent } from "./project-form/project-form.component";
import { ProjectCardsListComponent } from './project-cards-list/project-cards-list.component';
import { ProjectPageComponent } from './project-page/project-page.component';

const routes: Routes = [
  { path: '', component: ProjectCardsListComponent },
  { path: 'new', component: ProjectFormComponent, canActivate: [AuthGuard] },
  { path: ':seq', component: ProjectPageComponent, resolve: { project: ProjectResolver } },
  { path: 'edit/:seq', component: ProjectFormComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, ProjectResolver]
})
export class AlbumRoutingModule {}
