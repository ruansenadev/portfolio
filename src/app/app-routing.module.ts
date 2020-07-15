import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";
import { PostPageComponent } from "./blog/post-page/post-page.component";
import { FeedComponent } from "./blog/feed/feed.component";
import { PostFormComponent } from "./blog/post-form/post-form.component";
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new', component: PostFormComponent, canActivate: [AuthGuard] },
  { path: ':slug', component: PostPageComponent },
  { path: 'edit/:slug', component: PostFormComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
