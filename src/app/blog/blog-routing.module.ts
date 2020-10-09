import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PostResolver } from './post.resolver';

import { FeedComponent } from './feed/feed.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostDeactivate } from './post-form/post-deactivate.guard';

const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'new', component: PostFormComponent, canActivate: [AuthGuard], canDeactivate: [PostDeactivate] },
  { path: ':slug', component: PostPageComponent, resolve: { post: PostResolver } },
  {
    path: 'edit/:slug', component: PostFormComponent,
    canActivate: [AuthGuard],
    resolve: { post: PostResolver },
    canDeactivate: [PostDeactivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, PostResolver, PostDeactivate]
})

export class BlogRoutingModule { }
