import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService, Sequences } from '../projects.service';
import { Project } from '../project';
import { Subscription } from 'rxjs';
import { ImageStorageService, UploadObject, UploadStatus } from 'src/app/util/image-storage.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private imageStorage: ImageStorageService
  ) { }
  private listener: Subscription;
  isLoading = true;
  form: FormGroup;
  private arrows = ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];
  private project: Project;
  private upload: UploadObject;
  uploadStatus: UploadStatus;
  preview: string | SafeUrl;
  thumbnail: string;
  noFocus = '';
  introduction = '';
  sequences: Sequences;
  chips: { [key: string]: string[] } = {
    technologies: [],
    keywords: []
  };
  ngOnInit(): void {
    this.sequences = this.route.snapshot.data.sequences;
    this.project = this.route.snapshot.data.project;
    this.form = new FormGroup({
      name: new FormControl(this.project ? this.project.name : '', Validators.required),
      status: new FormControl(this.project ? this.project.status : null, Validators.required),
      seq: new FormControl({ value: this.project ? this.project.seq : this.sequences.next, disabled: !!this.project }, Validators.required),
      description: new FormControl(this.project ? this.project.description : '', [Validators.required, Validators.maxLength(330)]),
      overview: new FormControl(this.project ? this.project.overview : ''),
      thumbnail: new FormControl(null),
      technologies: new FormControl(this.project ? ' ' : null, Validators.required),
      url: new FormControl(this.project ? this.project.url : null, Validators.required),
      homepage: new FormControl(this.project && this.project.homepage ? this.project.homepage : null),
      keywords: new FormControl(this.project ? ' ' : null, Validators.required)
    });
    if (this.project) {
      this.introduction = `## ${this.form.value.name}\n***\n${this.form.value.description}\n`;
      this.chips.technologies = this.project.technologies;
      this.chips.keywords = this.project.keywords;
      if (this.project.thumbnailPath) {
        this.thumbnail = this.project.thumbnailPath;
      }
    }
    this.listener = this.projectsService.getStream().subscribe(() => this.isLoading = false);
    this.isLoading = false;
  }
  onIntroChange(): void {
    if (this.form.value.overview) {
      // overview surely starts with last intro
      this.form.patchValue({ overview: this.form.value.overview.slice(this.introduction.length) });
    }
    this.introduction = (this.form.value.name ? `## ${this.form.value.name}\n***\n` : '') + (this.form.value.description ? `${this.form.value.description}\n` : '');
    if (this.introduction.length && this.form.value.overview) {
      this.form.patchValue({ overview: this.introduction + this.form.value.overview });
    }
  }
  onOverviewChange(): void {
    if (this.introduction.length) {
      if (!this.form.value.overview.startsWith(this.introduction)) {
        if (this.introduction.startsWith(this.form.value.overview)) {
          // only left a slice of intro
          this.form.patchValue({ overview: '' });
        } else {
          // intro was erased but left a slice of overview
          this.form.patchValue({ overview: this.introduction + this.form.value.overview });
        }
      }
    }
  }
  onOverviewInput(e: KeyboardEvent): void {
    const target = e.target as HTMLTextAreaElement;
    if (this.introduction && !target.value.indexOf(this.introduction)) {
      // if introduction is in start
      const start = target.selectionStart;
      const end = target.selectionEnd;
      if (start < this.introduction.length || end < this.introduction.length) {
        // dont alter introduction text
        if (!this.arrows.includes(e.code)) { e.preventDefault(); }
      }
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
  addChip(e: MatChipInputEvent, list: string): void {
    const value = (e.value || '').trim();
    if (value.length > 1) { this.chips[list].push(value); }
    if (e.input) { e.input.value = ''; }
  }
  removeChip(chip: string, list: string): void {
    const index = this.chips[list].indexOf(chip);
    if (index > -1) { this.chips[list].splice(index, 1); }
  }
  onSend() {
    if (this.form.invalid) { return; }
    this.isLoading = true;
    if (this.project) {
      this.projectsService.editProject(
        this.project._id,
        this.form.value.name,
        this.project.seq,
        this.form.value.status,
        this.form.value.description,
        this.form.value.overview || this.introduction,
        this.chips.technologies,
        this.form.value.url,
        this.chips.keywords,
        this.form.value.thumbnail,
        this.form.value.homepage
      );
    } else {
      this.projectsService.addProject(
        this.form.value.name,
        this.form.value.seq,
        this.form.value.status,
        this.form.value.description,
        this.form.value.overview || this.introduction,
        this.chips.technologies,
        this.form.value.url,
        this.chips.keywords,
        this.form.value.thumbnail,
        this.form.value.homepage
      );
    }
  }
  canDeactivate(): boolean {
    return confirm(this.project ? `Deixar de editar projeto ${this.project.name}?` : 'Sair sem salvar projeto?');
  }
  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }
}
