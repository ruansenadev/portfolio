import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { ProjectsService } from "../projects.service";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  constructor(private projectsService: ProjectsService) { }
  isLoading: boolean
  form: FormGroup
  thumbnail: string
  preview: string
  chips: { [key: string]: string[] } = {
    technologies: [],
    keywords: []
  }
  ngOnInit(): void {
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
    console.log('Validou?')
    this.projectsService.addProject(this.form.value.name, this.form.value.status, this.form.value.thumbnail, this.thumbnail || null, this.form.value.description, this.chips.technologies, this.form.value.url, this.form.value.homepage, this.chips.keywords)
    this.form.reset()
  }

}
