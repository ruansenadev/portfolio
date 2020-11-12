import { Component, Input, OnChanges, SimpleChange, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { ImageStorageService, UploadObject, UploadStatus } from 'src/app/util/image-storage.service';

@Component({
  selector: 'app-admin-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.css']
})
export class ProfessionalFormComponent implements OnChanges, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private sanitizer: DomSanitizer,
    private imageStorage: ImageStorageService
  ) { }
  @Input() account: Admin;
  @Input() read = true;
  @Output() done = new EventEmitter<boolean>();
  private listener: Subscription;
  chips: { [key: number]: string[] } = {
    0: ['\'Intermediário\'']
  };
  urls: { [key: number]: string } = {
    0: 'http://www.example.com/'
  };
  private upload: UploadObject;
  uploadStatus: UploadStatus;
  preview: string | SafeUrl;
  logo: string;
  noFocus = 'no-focus';
  professionalForm = this.fb.group({
    logo: { value: null, disabled: this.read },
    profession: [{ value: null, disabled: this.read }, Validators.required],
    nickname: { value: null, disabled: this.read },
    biodata: [{ value: null, disabled: this.read }, Validators.required],
    skills: this.fb.array([]),
    social: this.fb.array([])
  });
  get skills() {
    return this.professionalForm.get('skills') as FormArray;
  }
  get social() {
    return this.professionalForm.get('social') as FormArray;
  }
  addEntry(group: string, value: string = null) {
    (this[group] as FormArray).push(this.fb.control(value));
  }
  rmEntry(group: string, list: string, index: number) {
    (this[group] as FormArray).removeAt(index);
    delete (this[list] as [])[index];
  }
  addChip(index: number, e: MatChipInputEvent): void {
    const value = (e.value || '').trim();
    if (value.length > 1) {
      if (!this.chips[index]) { this.chips[index] = []; }
      this.chips[index].push(value);
    }
    if (e.input) { e.input.value = ''; }
  }
  rmChip(index: number, chip: string): void {
    const chipIndex = this.chips[index].indexOf(chip);
    if (chipIndex > -1) { this.chips[index].splice(chipIndex, 1); }
  }
  addUrl(index: number, e: Event): void {
    const input = e.target as HTMLInputElement;
    this.urls[index] = input.value;
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.account) {
      if (this.account) {
        this.professionalForm.patchValue({
          profession: this.account.profession,
          nickname: this.account.nickname || null,
          biodata: this.account.biodata,
        });
        if (this.account.logo) {
          this.logo = this.account.logo;
        }
        let i = 0;
        for (const prop of Object.keys(this.account.skills)) {
          this.addEntry('skills', prop);
          this.chips[i] = Array.isArray(this.account.skills[prop]) ? this.account.skills[prop] : [this.account.skills[prop]];
          i++;
        }
        i = 0;
        for (const prop of Object.keys(this.account.social)) {
          this.addEntry('social', prop);
          this.urls[i] = this.account.social[prop];
          i++;
        }
      }
    }
    if (changes.read) {
      if (this.read) {
        this.professionalForm.disable();
        if (this.uploadStatus.isUploading) { this.onAbortUpload(); }
        if (this.listener) { this.listener.unsubscribe(); }
        this.noFocus = 'no-focus';
      } else {
        this.noFocus = '';
        this.professionalForm.enable();
        this.listener = this.adminService.getStream().subscribe(() => {
          this.done.emit(true);
        }, () => {
          this.done.emit(false);
        });
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
    this.imageStorage.getSignedUrl(this.upload.data.name, this.upload.data.type, 'logo')
      .subscribe((result) => {
        this.upload.url = result.url;
        this.upload.key = result.key;
        reader.readAsDataURL(this.upload.data);
      });
  }
  onRevertImage(): void {
    this.professionalForm.patchValue({ logo: null });
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
            this.professionalForm.patchValue({
              logo: this.upload.key
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
  mapList(list: string[], dic: { [key: number]: string | string[] }): { [key: string]: any } {
    if (list.length !== Object.keys(dic).length) { return null; }
    return list.reduce((dicMapped, label, i) => {
      dicMapped[label] = Array.isArray(dic[i]) ? (dic[i].length > 1 ? dic[i] : dic[i][0]) : dic[i];
      return dicMapped;
    }, {});
  }
  onSubmit() {
    if (this.professionalForm.invalid) { return; }
    this.adminService.editProfessional(
      this.account._id,
      this.professionalForm.value.profession,
      this.professionalForm.value.biodata,
      this.professionalForm.value.logo,
      this.professionalForm.value.nickname,
      this.skills.value.some(e => !!e) ? this.mapList(this.skills.value, this.chips) : null,
      this.social.value.some(e => !!e) ? this.mapList(this.social.value, this.urls) : null
    );
  }
  ngOnDestroy(): void {
    if (this.listener) { this.listener.unsubscribe(); }
  }
}
