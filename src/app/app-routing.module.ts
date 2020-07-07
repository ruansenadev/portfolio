import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PostCreateComponent } from "./blog/post-create/post-create.component";

const routes: Routes = [
  { path: 'new', component: PostCreateComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
