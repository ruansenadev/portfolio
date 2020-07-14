import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.authService.getToken()
    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      })
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
