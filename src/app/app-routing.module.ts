import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FeedComponent } from "./blog/feed/feed.component";
import { PostFormComponent } from "./blog/post-form/post-form.component";

const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'new', component: PostFormComponent },
  { path: 'edit/:id', component: PostFormComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
