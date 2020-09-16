import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Admin } from "../admin";
import { AdminService } from "../admin.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private adminService: AdminService, private route: ActivatedRoute) { }
  private accountListener: Subscription
  @Output() account: Admin
  @Output() panels = [
    { title: 'Perfil', r: true },
    { title: 'Profissional', r: true },
    { title: 'Conta', r: true }
  ]
  ngOnInit(): void {
    this.account = this.route.snapshot.data['account']
    this.accountListener = this.adminService.getStream().subscribe((account) => this.account = account)
  }
  canDeactivate(): boolean {
    if (Object.values(this.panels).some(p => !p.r)) {
      return confirm('Deseja realmente sair?')
    }
    return true
  }
  ngOnDestroy(): void {
    this.accountListener.unsubscribe()
  }
}
