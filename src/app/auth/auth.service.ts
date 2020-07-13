import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Owner } from "./owner";

import { environment } from "../../environments/environment";
const apiAuth = environment.host + '/api/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }
  private isAuth: boolean
  private authListener = new Subject<boolean>()

  getStatus(): boolean {
    return this.isAuth
  }
  getListener() {
    return this.authListener.asObservable()
  }

  login(email: string, password: string): void {
    const data = {email, password}
    this.http.post<{message: string}>(apiAuth, data).subscribe((res) => {
      this.isAuth = true;
      this.authListener.next(true)
      console.log(res.message)
      this.router.navigate(['/'])
    })
  }
}
