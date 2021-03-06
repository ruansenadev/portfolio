import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from './admin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../messages/message/message.component';
import { Subject, Observable } from 'rxjs';
import { imagesMap } from '../util/imageMap';
const ROUTE = '/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private messageBar: MatSnackBar) { }
  admin$ = new Subject<Admin>();
  getAdmin(): Observable<Admin> {
    return this.http.get<Admin>(ROUTE).pipe(
      imagesMap('photo', 'logo')
    );
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
    return this.http.get<string>(ROUTE + '?gravatar=true');
  }
  editProfile(id: string, name: string, lastName: string, birthdate: Date, city?: string, state?: string, photo?: string) {
    const data = new FormData();
    data.append('name', name);
    data.append('last_name', lastName);
    data.append('birthdate', new Date(birthdate).toISOString());
    if (city) { data.append('city', city); }
    if (state) { data.append('state', state); }
    if (photo) { data.append('photo', photo); }
    this.http.put<{ message: string }>(`${ROUTE}/${id}`, data).subscribe((res) => {
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
    this.http.put<{ message: string }>(`${ROUTE}/${id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } });
      this.fetchAdmin();
    }, (e) => {
      this.admin$.error(e);
    });
  }
  editProfessional(
    id: string,
    profession: string,
    biodata: string,
    logo?: string,
    nickname?: string,
    skills?: { [key: string]: any },
    social?: { [key: string]: string }) {
    const data = new FormData();
    data.append('_id', id);
    data.append('profession', profession);
    data.append('biodata', biodata);
    if (logo) { data.append('logo', logo); }
    if (nickname) { data.append('nickname', nickname); }
    if (skills) { data.append('skills', JSON.stringify(skills)); }
    if (social) { data.append('social', JSON.stringify(social)); }
    this.http.put<{ message: string }>(`${ROUTE}/${id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } });
      this.fetchAdmin();
    }, (e) => {
      this.admin$.error(e);
    });
  }
}
