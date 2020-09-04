import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from './auth/auth.guard';
import { AuthLoadGuard } from './auth/auth-load.guard';
import { AdminResolver } from "./admin/admin.resolver";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', resolve: { admin: AdminResolver }, data: { animation: 'HomePage' } },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { animation: 'LoginPage' } },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canLoad: [AuthLoadGuard], data: { animation: 'AdminMod' } },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule), data: { animation: 'BlogMod' } },
  { path: 'album', loadChildren: () => import('./album/album.module').then(m => m.AlbumModule), data: { animation: 'AlbumMod' } }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    paramsInheritanceStrategy: 'always',
    relativeLinkResolution: 'corrected'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
