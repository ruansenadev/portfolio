import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
const apiAuth = environment.api + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }
  private status: boolean;
  private token: string;
  private expiration: ReturnType<typeof setTimeout>;
  private listener = new Subject<boolean>();
  private redirect = '/';

  setStatus(status: boolean): void {
    this.status = status;
  }
  getStatus(): boolean {
    return this.status;
  }
  setToken(token: string): void {
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }
  getListener() {
    return this.listener.asObservable();
  }
  setRedirect(uri: string): void {
    this.redirect = uri;
  }

  login(email: string, password: string): void {
    const data = { email, password };
    this.http.post<{ message: string, token: string, expiration: number }>(apiAuth, data).subscribe((res) => {
      this.setToken(res.token);
      this.setStatus(true);
      this.listener.next(true);
      this.saveLocal(res.token, new Date(res.expiration).toISOString());
      this.setExpTime(res.expiration - Date.now());
      this.router.navigate([this.redirect]);
    }, () => {
      this.listener.next(false);
    });
  }
  logout(): void {
    this.setStatus(false);
    this.listener.next(false);
    localStorage.clear();
    clearTimeout(this.expiration);
    this.router.navigate(['/']);
  }
  authBack(): void {
    const token = localStorage.getItem('token');
    const date = localStorage.getItem('expiration');
    if (!token || !date) { return; }
    const interval = new Date(date).getTime() - Date.now();
    if (interval > 0) {
      this.setToken(token);
      this.setStatus(true);
      this.listener.next(true);
      this.setExpTime(interval);
    } else {
      localStorage.clear();
    }
  }

  setExpTime(ms: number): void {
    this.expiration = setTimeout(() => {
      this.logout();
    }, ms);
  }
  saveLocal(token: string, expiration: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration);
  }
}
