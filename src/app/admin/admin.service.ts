import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Admin } from "./admin";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageComponent } from "../messages/message/message.component";
import { environment } from "../../environments/environment";
import { Subject } from 'rxjs';
const apiAdmin = environment.server + '/admin'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private messageBar: MatSnackBar) { }
  admin$ = new Subject<Admin>()
  fetchAdmin(): void {
    this.http.get<Admin>(apiAdmin).subscribe((account) => {
      this.admin$.next(account)
    })
  }
  getAdmin() {
    return this.admin$
  }
  getGravatar() {
    return this.http.get<string>(apiAdmin+'?gravatar=true')
  }
  sendPhoto(): void {

  }
}
