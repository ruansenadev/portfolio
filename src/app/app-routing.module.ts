import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PostFormComponent } from "./blog/post-form/post-form.component";
import { PostListComponent } from "./blog/post-list/post-list.component";

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'new', component: PostFormComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
