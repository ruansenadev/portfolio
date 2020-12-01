import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.authService.bearer;
    if (token && (request.url.includes(environment.api) || request.url.startsWith('/'))) {
      request = request.clone({
        headers: request.headers.set('Authorization', token)
      });
    }
    return next.handle(request);
  }
}
