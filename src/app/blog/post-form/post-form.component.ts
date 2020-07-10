import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from "@angular/material/chips";
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
  private postSlug: string;
  private post: Post;
  modified: string;
  labels: string[] = []

  ngOnInit(): void {
    this.isLoading = true;
    this.postSlug = this.route.snapshot.paramMap.get('slug')
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.maxLength(120)] }),
      markdown: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.maxLength(200)] }),
      icon: new FormControl(null, { validators: [Validators.pattern('^[a-z0-9_]+[a-z0-9]$')] }),
      labelsInput: new FormControl(null, { validators: [Validators.required] })
    })
    if (this.postSlug) {
      this.postsService.getPost(this.postSlug).subscribe((res) => {
        this.post = res.post
        this.form.setValue({
          title: this.post.title,
          markdown: this.post.markdown,
          description: this.post.description || null,
          icon: this.post.icon || null,
          labelsInput: ' '
        })
        this.labels = this.post.labels
        if (this.post.modified) this.modified = new Date(this.post.modified).toLocaleString()
        this.isLoading = false
      })
    } else {
      this.isLoading = false
    }
  }
  addLabel(e: MatChipInputEvent): void {
    const value = (e.value || '').trim()
    if (value.length > 1) this.labels.push(value);
    if (e.input) e.input.value = '';
  }
  removeLabel(label: string): void {
    const index = this.labels.indexOf(label)
    if (index > -1) { this.labels.splice(index, 1) }
  }
  onSend() {
    if (this.form.invalid) { return }
    this.isLoading = true
    if (this.postSlug) {
      this.postsService.editPost(this.post._id, this.form.value.title, this.post.slug, this.post.date, this.form.value.markdown, this.form.value.icon, this.form.value.description, this.labels)
    } else {
      this.postsService.addPost(this.form.value.title, this.form.value.icon, this.form.value.markdown, this.form.value.description, this.labels)
    }
    this.form.reset()
  }
}
