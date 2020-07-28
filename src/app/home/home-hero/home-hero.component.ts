import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../admin/admin.service";
import { Admin } from "../../admin/admin";

@Component({
  selector: 'home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.css']
})
export class HomeHeroComponent implements OnInit {
  constructor(private adminService: AdminService) { }
  account: Admin

  ngOnInit(): void {
    this.adminService.getAdmin().subscribe((admin) => this.account = admin)
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
