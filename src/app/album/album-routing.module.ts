import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProjectFormComponent } from "./project-form/project-form.component";

const routes: Routes = [
  { path: 'new', component: ProjectFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AlbumRoutingModule {}
