import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Owner } from "./owner";

import { environment } from "../../environments/environment";
const apiAuth = environment.host + '/api/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): void {
    const data = {email, password}
    this.http.post<{account: Owner}>(apiAuth, data).subscribe((res) => {
      console.log(res)
    })
  }
}
