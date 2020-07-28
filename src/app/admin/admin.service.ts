import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Admin } from "./admin";
import { environment } from "../../environments/environment";
const apiAdmin = environment.server + '/admin'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getAdmin() {
    return this.http.get<Admin>(apiAdmin)
  }
}
