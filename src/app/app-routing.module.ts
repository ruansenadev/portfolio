import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSerializer } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthLoadGuard } from './auth/auth-load.guard';
import { AdminResolver } from './admin/admin.resolver';
import { VoidComponent } from './void/void.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', resolve: { admin: AdminResolver } },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canLoad: [AuthLoadGuard] },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'album', loadChildren: () => import('./album/album.module').then(m => m.AlbumModule) },
  { path: '**', component: VoidComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    paramsInheritanceStrategy: 'always',
    relativeLinkResolution: 'corrected',
    malformedUriErrorHandler: (error: URIError, urlSerializer: UrlSerializer, url: string) => urlSerializer.parse('/void')
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
