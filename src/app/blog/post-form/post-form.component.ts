import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { Subscription } from 'rxjs';
import { ImageStorageService, UploadObject, UploadStatus } from 'src/app/util/image-storage.service';

@Component({
  selector: 'app-blog-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnDestroy {
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private imageStorage: ImageStorageService
  ) { }
  private listener: Subscription;
  isLoading = true;
  form: FormGroup;
  private post: Post;
  private upload: UploadObject;
  uploadStatus: UploadStatus;
  preview: string | SafeUrl;
  thumbnail: string;
  noFocus = '';
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
        this.thumbnail = this.post.thumbnailPath;
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
  onPickImage(e: Event): void {
    this.noFocus = 'no-focus';
    this.uploadStatus = {
      isUploading: false,
      uploadProgress: 0,
      hasUploaded: false
    };
    const inputFile = e.target as HTMLInputElement;
    this.upload = {
      data: null,
      url: null,
      key: null,
      uploadRequest: null
    };
    try {
      this.upload.data = this.imageStorage.validateFile(inputFile.files[0]);
    } catch (error) {
      this.noFocus = '';
      this.upload = null;
      this.uploadStatus = null;
      return;
    }
    inputFile.value = '';
    const reader = new FileReader();
    reader.onerror = () => {
      this.upload.data = null;
    };
    reader.onloadend = () => {
      this.preview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      this.noFocus = '';
    };
    this.imageStorage.getSignedUrl(this.upload.data.name, this.upload.data.type, 'album')
      .subscribe((result) => {
        this.upload.url = result.url;
        this.upload.key = result.key;
        reader.readAsDataURL(this.upload.data);
      });
  }
  onRevertImage(): void {
    this.form.patchValue({ thumbnail: null });
    this.preview = null;
    this.upload = null;
    this.uploadStatus = null;
  }
  onUploadImage(): void {
    this.uploadStatus.isUploading = true;
    this.upload.uploadRequest = this.imageStorage.uploadImage(this.upload.url, this.upload.data)
      .subscribe(progressDone => {
        switch (progressDone) {
          case 101:
            this.uploadStatus.hasUploaded = true;
            this.uploadStatus.isUploading = false;
            this.form.patchValue({
              thumbnail: this.upload.key
            });
            break;
          case NaN:
            this.uploadStatus.isUploading = false;
            this.upload.uploadRequest.unsubscribe();
            break;
          default:
            this.uploadStatus.uploadProgress = progressDone;
        }
      });
  }
  onAbortUpload(): void {
    this.upload.uploadRequest.unsubscribe();
    this.uploadStatus.isUploading = false;
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
        this.post.date,
        this.form.value.markdown,
        this.labels,
        this.form.value.icon,
        this.form.value.thumbnail,
        this.form.value.description
      );
    } else {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.markdown,
        this.labels,
        this.form.value.icon,
        this.form.value.thumbnail,
        this.form.value.description
      );
    }
  }
  canDeactivate(): boolean {
    return confirm(this.post ? `Deixar de editar post ${this.post.title}?` : 'Sair sem salvar post?');
  }
  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }
}
