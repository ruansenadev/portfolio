import { Component, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Admin } from "../admin";
import { AdminService } from "../admin.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver, private adminService: AdminService) { }
  @Output() account: Admin
  @Output() reading: { [key: string]: boolean } = {
    'Perfil': true,
    'Conta': true
  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Perfil', order: '1', cols: 1, rows: 2 },
          { title: '2', order: '2', cols: 2, rows: 2 },
          { title: 'Conta', order: '3', cols: 1, rows: 1 },
          { title: '4', order: '4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Perfil', order: '1', cols: 2, rows: 1 },
        { title: '2', order: '2', cols: 2, rows: 1 },
        { title: 'Conta', order: '3', cols: 1, rows: 1 },
        { title: '4', order: '4', cols: 1, rows: 1 }
      ];
    })
  );
  ngOnInit(): void {
    this.adminService.fetchAdmin()
    this.adminService.admin$.subscribe((account) => this.account = account)
  }
}
