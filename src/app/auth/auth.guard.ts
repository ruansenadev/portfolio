import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<true | UrlTree> {
    return this.authService.status$
      .pipe(
        map(status => {
          if (state.url === '/login') {
            if (status) {
              return this.router.parseUrl('/admin');
            }
            return true;
          } else if (!status) {
            this.authService.redirect = state.url;
            return this.router.parseUrl('/login');
          } else {
            return status;
          }
        })
      );
  }

}
