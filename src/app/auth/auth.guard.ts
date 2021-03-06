import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
    if (state.url === '/login') {
      if (this.authService.getStatus()) {
        return this.router.parseUrl('/admin');
      }
      return true;
    }
    if (this.authService.getStatus()) {
      return true;
    } else {
      this.authService.setRedirect(state.url);
      return this.router.parseUrl('/login');
    }
  }

}
