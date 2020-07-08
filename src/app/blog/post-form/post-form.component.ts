import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../post";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  constructor(private postsService: PostsService, private route: ActivatedRoute) { }
  isLoading: boolean;
  form: FormGroup;
  private postID: string;
  private post: Post;
  modified: string;
  ngOnInit(): void {
    this.isLoading = true;
    this.postID = this.route.snapshot.paramMap.get('id')
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.maxLength(120)]}),
      markdown: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.maxLength(200)]})
    })
    if (this.postID) {
      this.postsService.getPost(this.postID).subscribe((res) => {
        this.post = res.post
        this.form.setValue({
          title: this.post.title,
          markdown: this.post.markdown,
          description: this.post.description || null
        })
        if(this.post.modified) this.modified = new Date(this.post.modified).toLocaleString()
        this.isLoading = false
      })
    } else {
      this.isLoading = false
    }
  }
  onSend() {
    if (this.form.invalid) {return}
    this.isLoading = true
    if (this.postID) {
      this.postsService.editPost(this.postID, this.form.value.title, this.post.date, this.form.value.markdown, this.form.value.description)
    } else {
      this.postsService.addPost(this.form.value.title, this.form.value.markdown, this.form.value.description)
    }
    this.form.reset()
  }
}
