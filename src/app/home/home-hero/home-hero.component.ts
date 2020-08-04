import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../admin/admin.service";
import { Admin } from "../../admin/admin";
import { Subscription } from "rxjs";

@Component({
  selector: 'home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.css']
})
export class HomeHeroComponent implements OnInit {
  constructor(private adminService: AdminService) { }
  account: Admin
  accountListener: Subscription

  ngOnInit(): void {
    this.accountListener = this.adminService.getAdmin().subscribe((account) => this.account = account)
  }

  transformValue(value: any): string {
    switch (typeof value) {
      case 'object':
        return `[ ${value.join(', ')} ]`
      case 'string':
        return `'${value}'`
      default:
        return value
    }
  }
}
