import { Component, Input, OnInit } from '@angular/core';
import { Admin } from "../../admin/admin";

@Component({
  selector: 'home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.css']
})
export class HomeHeroComponent implements OnInit {
  constructor() { }
  @Input('admin') account: Admin

  ngOnInit(): void {
  }
}
