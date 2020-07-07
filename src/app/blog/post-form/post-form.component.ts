import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  constructor(private postsService: PostsService) { }
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.maxLength(120)]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.maxLength(200)]})
    })
  }
  onSend() {
    if (this.form.invalid) {return}
    this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.description)
    this.form.reset()
  }
}
