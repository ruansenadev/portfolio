import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  constructor() { }
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(),
      content: new FormControl()
    })
  }

}
