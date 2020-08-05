import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Admin } from "./admin";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageComponent } from "../messages/message/message.component";
import { environment } from "../../environments/environment";
import { Subject } from 'rxjs';
import { AuthService } from "../auth/auth.service";
const apiAdmin = environment.server + '/admin'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private messageBar: MatSnackBar, private authService: AuthService) { }
  admin$ = new Subject<Admin>()
  fetchAdmin(): void {
    this.http.get<Admin>(apiAdmin).subscribe((account) => {
      this.admin$.next(account)
    })
  }
  getAdmin() {
    return this.admin$.asObservable()
  }
  getGravatar() {
    return this.http.get<string>(apiAdmin + '?gravatar=true')
  }
  savePhoto(_id: string, photo: File | string, photoName: string | null): void {
    const data = new FormData()
    photoName ? data.append('photo', photo, photoName) : data.append('photo', photo)
    this.http.put<{ message: string }>(`${apiAdmin}/${_id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } })
      this.fetchAdmin()
    })
  }
  editProfile(_id: string, name: string, last_name: string, birthdate: Date, city: string | null, state: string | null) {
    const data = new FormData()
    data.append('name', name)
    data.append('last_name', last_name)
    data.append('birthdate', new Date(birthdate).toISOString())
    if (city) data.append('city', city)
    if (city) data.append('state', state)
    this.http.put<{ message: string }>(`${apiAdmin}/${_id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } })
      this.fetchAdmin()
    })
  }
  editAccount(_id: string, email: string, password: string, password_new: string | null): void {
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)
    if (password_new) data.append('password_new', password_new)
    this.http.put<{ message: string }>(`${apiAdmin}/${_id}`, data).subscribe((res) => {
      this.messageBar.openFromComponent(MessageComponent, { data: { message: res.message } })
      this.authService.logout()
    })
  }
}
