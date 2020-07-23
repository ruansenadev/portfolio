import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../projects.service";
import { Project } from '../project';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) { }
  isLoading: boolean
  form: FormGroup
  private seq: number
  private project: Project
  thumbnail: string = null
  preview: string
  chips: { [key: string]: string[] } = {
    technologies: [],
    keywords: []
  }
  ngOnInit(): void {
    this.isLoading = true
    this.seq = +this.route.snapshot.paramMap.get('seq')
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      thumbnail: new FormControl(null),
      technologies: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      homepage: new FormControl(null),
      keywords: new FormControl(null, Validators.required)
    })
    if (this.seq) {
      this.projectsService.getProject(this.seq).subscribe((project) => {
        this.project = project
        this.form.setValue({
          name: this.project.name,
          status: this.project.status,
          description: this.project.description,
          thumbnail: null,
          technologies: ' ',
          url: this.project.url,
          homepage: this.project.homepage || null,
          keywords: ' '
        })
        this.chips.technologies = this.project.technologies
        this.chips.keywords = this.project.keywords
        if (this.project.thumbnailPath) {
          this.thumbnail = this.project.thumbnailPath.slice(this.project.thumbnailPath.lastIndexOf('/') + 1).slice(20)
          this.preview = this.project.thumbnailPath
        }
        this.isLoading = false
      })
    } else {
      this.isLoading = false
    }

    this.isLoading = false;
  }
  onPick(e: Event): void {
    const imageBlob = (e.target as HTMLInputElement).files[0]
    this.form.patchValue({ thumbnail: imageBlob })
    const reader = new FileReader()
    reader.onloadend = () => {
      let extIndex = imageBlob.name.lastIndexOf('.')
      this.thumbnail = imageBlob.name.slice(0, (extIndex < 30 ? extIndex : 30)) + imageBlob.name.slice(extIndex)
      this.preview = reader.result as string
    }
    reader.readAsDataURL(imageBlob)
  }
  addChip(e: MatChipInputEvent, list: string): void {
    const value = (e.value || '').trim()
    if (value.length > 1) this.chips[list].push(value);
    if (e.input) e.input.value = '';
  }
  removeChip(chip: string, list: string): void {
    const index = this.chips[list].indexOf(chip)
    if (index > -1) { this.chips[list].splice(index, 1) }
  }
  onSend() {
    if (this.form.invalid) { return }
    this.isLoading = true
    if (this.seq) {
      this.projectsService.editProject(this.project._id, this.seq, this.form.value.name, this.form.value.status, this.form.value.thumbnail || this.project.thumbnailPath, this.thumbnail, this.form.value.description, this.chips.technologies, this.form.value.url, this.form.value.homepage, this.chips.keywords)
    } else {
      this.projectsService.addProject(this.form.value.name, this.form.value.status, this.form.value.thumbnail, this.thumbnail || null, this.form.value.description, this.chips.technologies, this.form.value.url, this.form.value.homepage, this.chips.keywords)
    }
    this.form.reset()
  }

}
