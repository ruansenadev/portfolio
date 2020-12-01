import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthLoadGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route): Observable<boolean> {
    return this.authService.status$
      .pipe(
        tap(status => status || this.router.navigateByUrl('/login'))
      );
  }
}
