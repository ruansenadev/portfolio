import { Component, OnInit } from '@angular/core';
import { HomeService } from "../home.service";
import { Admin } from "../admin";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private homeService: HomeService) { }
  account: Admin

  ngOnInit(): void {
    this.homeService.getAdmin().subscribe((admin) => { this.account = admin; console.log })
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
