import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/admin';
import { AuthService } from '../auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { DispatcherService } from './dispatcher.service';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.css']
})
export class DispatcherComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private adminService: AdminService,
    private authService: AuthService,
    private dispatcherService: DispatcherService) { }
  @ViewChild('topNav') topNav: MatToolbar;
  @ViewChild('drawer') nav: MatSidenav;
  @ViewChild('_drawer') navAdmin: MatSidenav;
  theme: string;
  account: Admin;
  accountListener: Subscription;
  isAuth: boolean;
  authListener: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  ngOnInit(): void {
    this.theme = this.dispatcherService.getTheme();
    this.adminService.fetchAdmin();
    this.accountListener = this.adminService.getStream().subscribe((account) => this.account = account);
    this.isAuth = this.authService.getStatus();
    this.authListener = this.authService.getListener().subscribe((status) => this.isAuth = status);
  }
  onToggle(nav: string): void {
    (this[nav] as MatSidenav).toggle();
  }
  onNav(nav: string): void {
    if (this.topNav) {
      (this[nav] as MatSidenav).close();
    }
  }
  onLogout(e): void {
    e.preventDefault();
    if (this.topNav) {
      this.navAdmin.close();
      this.navAdmin._closedStream.subscribe(() => this.authService.logout());
    } else {
      this.authService.logout();
    }
  }
  onSwitchTheme(e): void {
    e.preventDefault();
    this.dispatcherService.switchTheme(this.theme === 'light' ? 'dark' : 'light');
    this.theme = this.dispatcherService.getTheme();
  }
}
