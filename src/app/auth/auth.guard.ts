import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
    if (this.authService.getStatus()) {
      if (state.url === '/login') {
        return this.router.parseUrl('/admin')
      }
      return true;
    } else {
      this.authService.redirect = state.url
      return this.router.parseUrl('/login')
    }
  }

}
