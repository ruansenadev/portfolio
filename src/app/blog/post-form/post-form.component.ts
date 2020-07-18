import { Component, OnInit } from '@angular/core';
import { TAB } from "@angular/cdk/keycodes";
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
  thumbnail: string = null
  preview: string;
  modified: string;
  labels: string[] = []
  ngOnInit(): void {
    this.isLoading = true;
    this.postSlug = this.route.snapshot.paramMap.get('slug')
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.maxLength(120)] }),
      thumbnail: new FormControl(null),
      markdown: new FormControl('', { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.maxLength(200)] }),
      icon: new FormControl(null, { validators: [Validators.pattern('^[a-z0-9_]+[a-z0-9]$')] }),
      labelsInput: new FormControl(null, { validators: [Validators.required] })
    })
    if (this.postSlug) {
      this.postsService.getPost(this.postSlug).subscribe((post) => {
        this.post = post
        this.form.setValue({
          title: this.post.title,
          thumbnail: null,
          markdown: this.post.markdown,
          description: this.post.description || null,
          icon: this.post.icon || null,
          labelsInput: ' '
        })
        this.labels = this.post.labels
        if (this.post.thumbnailPath) {
          this.thumbnail = this.post.thumbnailPath.slice(this.post.thumbnailPath.lastIndexOf('/')+1)
          this.preview = this.post.thumbnailPath
        }
        if (this.post.modified) this.modified = new Date(this.post.modified).toLocaleString()
        this.isLoading = false
      })
    } else {
      this.isLoading = false
    }
  }
  checkTab(e: KeyboardEvent): void {
    if (e.keyCode === TAB) {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      this.form.patchValue({ 'markdown': this.form.value.markdown.slice(0, start)+'\t'+this.form.value.markdown.slice(end) })
      target.selectionStart = target.selectionEnd = start + 1;
    }
  }
  onPick(e: Event): void {
    const imageBlob = (e.target as HTMLInputElement).files[0]
    this.form.patchValue({ thumbnail: imageBlob })
    const reader = new FileReader()
    reader.onloadend = () => {
      let extIndex = imageBlob.name.lastIndexOf('.')
      this.thumbnail = imageBlob.name.slice(0, (extIndex<30?extIndex:30))+imageBlob.name.slice(extIndex)
      this.preview = reader.result as string
    }
    reader.readAsDataURL(imageBlob)
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
      this.postsService.editPost(this.post._id, this.form.value.title, this.post.date, this.form.value.thumbnail || this.post.thumbnailPath, this.thumbnail, this.form.value.icon, this.form.value.markdown, this.form.value.description, this.labels)
    } else {
      this.postsService.addPost(this.form.value.title, this.form.value.thumbnail, this.thumbnail, this.form.value.icon, this.form.value.markdown, this.form.value.description, this.labels)
    }
    this.form.reset()
  }
}
