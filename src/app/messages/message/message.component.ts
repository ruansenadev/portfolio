import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";
import { UrlTree } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  constructor(public message: MatSnackBarRef<MessageComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, action: string, actionIcon: string, redirect: UrlTree | string }, private router: Router) { }
  ngOnInit(): void {
    this.message.onAction().subscribe(() => {
      this.router.navigateByUrl(this.data.redirect)
    })
  }
}
