import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../admin/admin';
import { AdminService } from '../admin/admin.service';

@Injectable({ providedIn: 'root' })
export class AdminResolver implements Resolve<Admin> {
  constructor(private adminService: AdminService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Admin> {
    return this.adminService.getAdmin();
  }
}
