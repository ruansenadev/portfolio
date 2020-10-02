import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from './admin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../messages/message/message.component';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
const apiAdmin = environment.api + '/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private messageBar: MatSnackBar, private authService: AuthService) { }
  admin$ = new Subject<Admin>();
  getAdmin(): Observable<Admin> {
    return this.http.get<Admin>(apiAdmin)
      .pipe(map(account => {
        if (account.photo.startsWith('/images')) { account.photo = environment.serverHost + account.photo; }
        if (account.logo) { account.logo = environment.serverHost + account.logo; }
        return account;
      }));
  }
  fetchAdmin(): void {
    this.getAdmin().subscribe(account => {
      this.admin$.next(account);
    });
  }
  getStream() {
    return this.admin$.asObservable();
  }
  getGravatar() {
    return this.http.get<string>(apiAdmin + '?gravatar=true');
  }
  savePhoto(id: string, photo: File | string, photoName: string | null): void {
    const data = new FormData();
    photoName ? data.append('photo', photo, photoName) : data.append('photo', photo);
    this.http.put<{ message: string }>(`${apiAdmin}/${id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } });
      this.fetchAdmin();
    });
  }
  editProfile(id: string, name: string, lastName: string, birthdate: Date, city: string | null, state: string | null) {
    const data = new FormData();
    data.append('name', name);
    data.append('last_name', lastName);
    data.append('birthdate', new Date(birthdate).toISOString());
    if (city) { data.append('city', city); }
    if (city) { data.append('state', state); }
    this.http.put<{ message: string }>(`${apiAdmin}/${id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } });
      this.fetchAdmin();
    }, (e) => {
      this.admin$.error(e);
    });
  }
  editAccount(id: string, email: string, password: string, passwordNew: string | null): void {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    if (passwordNew) { data.append('password_new', passwordNew); }
    this.http.put<{ message: string }>(`${apiAdmin}/${id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } });
      this.fetchAdmin();
    }, (e) => {
      this.admin$.error(e);
    });
  }
  saveLogo(id: string, logo: File | string, logoName: string | null): void {
    const data = new FormData();
    logoName ? data.append('logo', logo, logoName) : data.append('logo', logo);
    this.http.put<{ message: string }>(`${apiAdmin}/${id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } });
      this.fetchAdmin();
    });
  }
  editProfessional(
    id: string,
    profession: string,
    nickname: string | null,
    biodata: string,
    skills: { [key: string]: any } | null,
    social: { [key: string]: string } | null) {
    const data = new FormData();
    data.append('_id', id);
    data.append('profession', profession);
    if (nickname) { data.append('nickname', nickname); }
    data.append('biodata', biodata);
    if (skills) { data.append('skills', JSON.stringify(skills)); }
    if (social) { data.append('social', JSON.stringify(social)); }
    this.http.put<{ message: string }>(`${apiAdmin}/${id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } });
      this.fetchAdmin();
    }, (e) => {
      this.admin$.error(e);
    });
  }
}
