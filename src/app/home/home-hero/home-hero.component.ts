import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Admin } from "../../admin/admin";

@Component({
  selector: 'home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.css']
})
export class HomeHeroComponent {
  constructor() { }
  @Input('admin') account: Admin
  preserveArrayOrder = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => 0;
}
