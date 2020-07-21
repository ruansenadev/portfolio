import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Admin } from "./admin";
import { environment } from "../environments/environment";
const apiAdmin = environment.host + '/admin'

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  getAdmin() {
    return this.http.get<Admin>(apiAdmin)
  }
}
