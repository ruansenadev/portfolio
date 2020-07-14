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
  private status: boolean
  private token: string
  private listener = new Subject<boolean>()

  getStatus(): boolean {
    return this.status
  }
  getToken(): string {
    return this.token
  }
  getListener() {
    return this.listener.asObservable()
  }

  login(email: string, password: string): void {
    const data = {email, password}
    this.http.post<{message: string, token: string}>(apiAuth, data).subscribe((res) => {
      this.token = res.token;
      this.status = true;
      this.listener.next(true)
      console.log(res.message)
      this.router.navigate(['/'])
    })
  }
  logout(): void {
    this.status = false;
    this.listener.next(false);
    this.router.navigate(['/'])
  }
}
