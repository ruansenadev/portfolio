import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";

import { FeedComponent } from './feed/feed.component';
import { PostFormComponent } from "./post-form/post-form.component";
import { PostPageComponent } from "./post-page/post-page.component";

const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'new', component: PostFormComponent, canActivate: [AuthGuard] },
  { path: ':slug', component: PostPageComponent },
  { path: 'edit/:slug', component: PostFormComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class BlogRoutingModule {}
