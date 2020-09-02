import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Admin } from "../admin";
import { AdminService } from "../admin.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private breakpointObserver: BreakpointObserver, private adminService: AdminService) { }
  private accountListener: Subscription
  @Output() account: Admin
  @Output() reading: { [key: string]: boolean } = {
    'Perfil': true,
    'Profissional': true,
    'Conta': true
  }
  panels = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Perfil', order: '1', cols: 1, rows: 2 },
          { title: 'Profissional', order: '2', cols: 2, rows: 3 },
          { title: 'Conta', order: '3', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Perfil', order: '1', cols: 2, rows: 1 },
        { title: 'Profissional', order: '2', cols: 2, rows: 2 },
        { title: 'Conta', order: '3', cols: 1, rows: 1 }
      ];
    })
  );
  ngOnInit(): void {
    this.adminService.fetchAdmin()
    this.accountListener = this.adminService.getStream().subscribe((account) => this.account = account)
  }
  canDeactivate(): boolean {
    if (Object.values(this.reading).some(panel => !panel)) {
      return confirm('Deseja realmente sair?')
    }
    return true
  }
  ngOnDestroy(): void {
    this.accountListener.unsubscribe()
  }
}
