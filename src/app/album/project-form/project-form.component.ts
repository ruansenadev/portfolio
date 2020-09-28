import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService, Sequences } from '../projects.service';
import { Project } from '../project';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  constructor(private projectsService: ProjectsService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }
  private listener: Subscription;
  isLoading = true;
  form: FormGroup;
  private arrows = ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];
  private project: Project;
  thumbnail: string = null;
  preview: string | SafeUrl;
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
        this.thumbnail = this.project.thumbnailPath.slice(this.project.thumbnailPath.lastIndexOf('/') + 1).slice(20);
        this.preview = this.project.thumbnailPath;
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
        this.project.seq,
        this.form.value.name,
        this.form.value.status,
        this.form.value.thumbnail || this.project.thumbnailPath,
        this.thumbnail, this.form.value.description,
        this.form.value.overview || this.introduction,
        this.chips.technologies,
        this.form.value.url,
        this.form.value.homepage,
        this.chips.keywords);
    } else {
      this.projectsService.addProject(
        this.form.value.name,
        this.form.value.seq,
        this.form.value.status,
        this.form.value.thumbnail,
        this.thumbnail || null,
        this.form.value.description,
        this.form.value.overview || this.introduction,
        this.chips.technologies,
        this.form.value.url,
        this.form.value.homepage,
        this.chips.keywords);
    }
  }
  canDeactivate(): boolean {
    return confirm(this.project ? `Deixar de editar projeto ${this.project.name}?` : 'Sair sem salvar projeto?');
  }
  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }
}
