import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  constructor(private postsService: PostsService) { }
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', {validators: [Validators.required, Validators.maxLength(120)]}),
      content: new FormControl('', {validators: [Validators.required]}),
      description: new FormControl('', {validators: [Validators.maxLength(200)]})
    })
  }
  onSend() {
    if (this.form.invalid) {return}
    this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.description || null)
    // this.form.reset()
  }
}
