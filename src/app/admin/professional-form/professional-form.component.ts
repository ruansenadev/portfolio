import { Component, Input, OnChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Admin } from "../admin";
import { AdminService } from "../admin.service";
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'admin-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.css']
})
export class ProfessionalFormComponent implements OnChanges {
  constructor(private fb: FormBuilder, private adminService: AdminService) { }
  @Input() account: Admin
  @Input() read: boolean
  @Output() done = new EventEmitter<boolean>()
  professionalForm = this.fb.group({
    logo: { value: null, disabled: this.read },
    profession: [{ value: null, disabled: this.read }, Validators.required],
    nickname: { value: null, disabled: this.read },
    biodata: [{ value: null, disabled: this.read }, Validators.required],
    skills: this.fb.array([]),
    social: this.fb.array([])
  });
  get skills() {
    return this.professionalForm.get('skills') as FormArray
  }
  get social() {
    return this.professionalForm.get('social') as FormArray
  }
  addEntry(group: string, value: string = null) {
    (this[group] as FormArray).push(this.fb.control(value))
  }
  rmEntry(group: string, list: string, index: number) {
    (this[group] as FormArray).removeAt(index)
    delete (this[list] as [])[index]
  }
  addChip(index: number, e: MatChipInputEvent): void {
    const value = (e.value || '').trim()
    if (value.length > 1) {
      if (!this.chips[index]) this.chips[index] = []
      this.chips[index].push(value);
    }
    if (e.input) e.input.value = '';
  }
  rmChip(index: number, chip: string): void {
    const chipIndex = this.chips[index].indexOf(chip)
    if (chipIndex > -1) { this.chips[index].splice(chipIndex, 1) }
  }
  addUrl(index: number, e: InputEvent): void {
    const input = e.target as HTMLInputElement
    this.urls[index] = input.value
  }
  chips: { [key: number]: string[] } = {
    0: ["'Intermediário'"]
  }
  urls: { [key: number]: string } = {
    0: 'http://www.example.com/'
  }
  logo: string = 'https://www.stevensegallery.com/360/170'
  logoName: string = ''
  upload: string
  noFocus: string = 'no-focus'
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['account']) {
      if (this.account) {
        this.professionalForm.patchValue({
          profession: this.account.profession,
          nickname: this.account.nickname || null,
          biodata: this.account.biodata,
        })
        if (this.account.logo) {
          this.logo = this.account.logo
          this.upload = null
        }
        if (Object.keys(this.account.skills).length) {
          let i = 0
          for (let prop in this.account.skills) {
            this.addEntry('skills', prop)
            this.chips[i] = Array.isArray(this.account.skills[prop]) ? this.account.skills[prop] : [this.account.skills[prop]]
            i++
          }
        }
        if (Object.keys(this.account.social).length) {
          let i = 0
          for (let prop in this.account.social) {
            this.addEntry('social', prop)
            this.urls[i] = this.account.social[prop]
            i++
          }
        }
      }
    }
    if (changes['read']) {
      if (this.read) {
        this.professionalForm.disable()
        this.noFocus = 'no-focus'
      } else {
        this.noFocus = ''
        this.professionalForm.enable()
      }
    }
  }
  onPick(e: Event): void {
    const imageBlob = (e.target as HTMLInputElement).files[0]
    this.professionalForm.patchValue({ logo: imageBlob })
    const reader = new FileReader()
    reader.onloadend = () => {
      let extIndex = imageBlob.name.lastIndexOf('.')
      this.logoName = imageBlob.name.slice(0, (extIndex < 30 ? extIndex : 30)) + imageBlob.name.slice(extIndex)
      this.upload = reader.result as string
    }
    reader.readAsDataURL(imageBlob)
  }
  onRevertImage(): void {
    this.professionalForm.patchValue({ logo: null })
    this.upload = null
    this.logoName = ''
  }
  onSaveImage(): void {
    if (this.logoName) {
      this.adminService.saveLogo(this.account._id, this.professionalForm.value.logo, this.logoName)
    } else {
      this.adminService.saveLogo(this.account._id, this.professionalForm.value.logo, null)
    }
  }
  mapList(list: string[], dic: { [key: number]: string | string[] }): { [key: string]: any } {
    if (list.length !== Object.keys(dic).length) { return null }
    return list.reduce((dicMapped, label, i) => {
      dicMapped[label] = Array.isArray(dic[i]) ? (dic[i].length > 1 ? dic[i] : dic[i][0]) : dic[i]
      return dicMapped
    }, {})
  }
  onSubmit() {
    if (this.professionalForm.invalid) {
      this.done.emit(false)
      return
    }
    this.adminService.editProfessional(this.account._id, this.professionalForm.value.profession, this.professionalForm.value.nickname, this.professionalForm.value.biodata,
      this.skills.value.some(e => !!e) ? this.mapList(this.skills.value, this.chips) : null,
      this.social.value.some(e => !!e) ? this.mapList(this.social.value, this.urls) : null
    )
    this.done.emit(true)
  }
}
