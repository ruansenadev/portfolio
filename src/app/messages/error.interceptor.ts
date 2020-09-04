import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageComponent } from "./message/message.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((res: HttpErrorResponse) => {
        this.messageBar.openFromComponent(MessageComponent, {
          data: { message: res.error.message || res.statusText },
          horizontalPosition: 'left'
        })
        return throwError(res)
      })
    )
  }
}
