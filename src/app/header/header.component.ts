import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) { }
  isAuth: boolean
  private authListen: Subscription

  ngOnInit(): void {
    this.isAuth = this.authService.getStatus()
    this.authListen = this.authService.getListener().subscribe((status) => this.isAuth = status)
  }
  ngOnDestroy(): void {
    this.authListen.unsubscribe()
  }
  onLogout(): void {
    this.authService.logout()
  }
}
