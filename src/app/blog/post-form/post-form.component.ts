import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnDestroy {
  constructor(private postsService: PostsService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }
  private listener: Subscription;
  isLoading = true;
  form: FormGroup;
  private post: Post;
  thumbnail: string = null;
  preview: string | SafeUrl;
  modified: string;
  labels: string[] = [];
  ngOnInit(): void {
    this.post = this.route.snapshot.data.post;
    this.form = new FormGroup({
      title: new FormControl(this.post ? this.post.title : null, { validators: [Validators.required, Validators.maxLength(120)] }),
      thumbnail: new FormControl(null),
      markdown: new FormControl(this.post ? this.post.markdown : '', { validators: [Validators.required] }),
      description: new FormControl(this.post ? this.post.description : null, { validators: [Validators.maxLength(200)] }),
      icon: new FormControl(this.post ? this.post.icon : null, { validators: [Validators.pattern('^[a-z0-9_]+[a-z0-9]$')] }),
      labelsInput: new FormControl(this.post ? ' ' : null, { validators: [Validators.required] })
    });

    if (this.post) {
      this.labels = this.post.labels;
      if (this.post.thumbnailPath) {
        this.thumbnail = this.post.thumbnailPath.slice(this.post.thumbnailPath.lastIndexOf('/') + 1).slice(20);
        this.preview = this.post.thumbnailPath;
      }
      if (this.post.modified) { this.modified = new Date(this.post.modified).toLocaleString(); }
      this.isLoading = false;
    }

    this.isLoading = false;
    this.listener = this.postsService.getStream().subscribe(() => {
      this.isLoading = false;
    });
  }
  checkTab(e: KeyboardEvent): void {
    if (e.code === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      this.form.patchValue({ markdown: this.form.value.markdown.slice(0, start) + '\t' + this.form.value.markdown.slice(end) });
      target.selectionStart = target.selectionEnd = start + 1;
    }
  }
  onPick(e: Event): void {
    const imageBlob = (e.target as HTMLInputElement).files[0];
    this.form.patchValue({ thumbnail: imageBlob });
    const reader = new FileReader();
    reader.onloadend = () => {
      const extIndex = imageBlob.name.lastIndexOf('.');
      this.thumbnail = imageBlob.name.slice(0, (extIndex < 30 ? extIndex : 30)) + imageBlob.name.slice(extIndex);
      this.preview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
    };
    reader.readAsDataURL(imageBlob);
  }
  addLabel(e: MatChipInputEvent): void {
    const value = (e.value || '').trim();
    if (value.length > 1) { this.labels.push(value); }
    if (e.input) { e.input.value = ''; }
  }
  removeLabel(label: string): void {
    const index = this.labels.indexOf(label);
    if (index > -1) { this.labels.splice(index, 1); }
  }
  onSend() {
    if (this.form.invalid) { return; }
    this.isLoading = true;
    if (this.post) {
      this.postsService.editPost(
        this.post._id,
        this.form.value.title,
        this.post.slug,
        this.post.date,
        this.form.value.thumbnail || this.post.thumbnailPath,
        this.thumbnail,
        this.form.value.icon,
        this.form.value.markdown,
        this.form.value.description,
        this.labels);
    } else {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.thumbnail,
        this.thumbnail,
        this.form.value.icon,
        this.form.value.markdown,
        this.form.value.description,
        this.labels);
    }
  }
  canDeactivate(): boolean {
    return confirm(this.post ? `Deixar de editar post ${this.post.title}?` : 'Sair sem salvar post?');
  }
  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }
}
