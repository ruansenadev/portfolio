import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthLoadGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route) {
    if (this.authService.getStatus()) {
      return true;
    }
    this.router.navigateByUrl('/login')
  }
}
