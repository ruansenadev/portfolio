import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }
  private token: string;
  private expiration: ReturnType<typeof setTimeout>;
  private subject = new BehaviorSubject<boolean>(true);
  private goto = ['/'];

  get status$(): Observable<boolean> {
    return this.subject.asObservable();
  }
  get bearer(): string {
    return this.token ? 'Bearer ' + this.token : '';
  }
  set redirect(uri: string) {
    this.goto = [uri];
  }

  login(email: string, password: string): void {
    const expiration = new Date(Date.now() + 100000000);
    this.subject.next(true);
    this.saveLocal('', expiration.toISOString());
    this.setExpTime(+expiration - Date.now());
    this.router.navigate(this.goto);
  }
  logout(): void {
    this.token = '';
    this.redirect = '/';
    localStorage.clear();
    this.subject.next(false);
    clearTimeout(this.expiration);
    this.router.navigate(this.goto);
  }
  authBack(): void {
    const token = localStorage.getItem('token');
    const date = localStorage.getItem('expiration');
    if (!token || !date) { return; }
    const interval = new Date(date).getTime() - Date.now();
    if (interval > 0) {
      this.token = token;
      this.subject.next(true);
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
