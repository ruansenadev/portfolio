import { Component, Input, OnChanges, SimpleChange, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { ImageStorageService, UploadObject, UploadStatus } from '../../util/image-storage.service';

@Component({
  selector: 'app-admin-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnChanges, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private sanitizer: DomSanitizer,
    private imageStorage: ImageStorageService
  ) { }
  @Input() account: Admin;
  @Input() read = true;
  @Output() done = new EventEmitter<boolean>();
  profileForm = this.fb.group({
    photo: { value: null, disabled: this.read },
    name: [{ value: null, disabled: this.read }, Validators.required],
    lastName: [{ value: null, disabled: this.read }, Validators.required],
    birthdate: [{ value: null, disabled: this.read }, Validators.required],
    city: { value: null, disabled: this.read },
    state: { value: null, disabled: this.read }
  });
  private listener: Subscription;
  private upload: UploadObject;
  uploadStatus: UploadStatus;
  preview: string | SafeUrl;
  photo: string;
  noFocus = 'no-focus';
  states = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins'];
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.account) {
      if (this.account) {
        this.profileForm.setValue({
          photo: null,
          name: this.account.name,
          lastName: this.account.last_name,
          birthdate: new Date(this.account.birthdate),
          city: this.account.address.city || null,
          state: this.account.address.state || null
        });
        this.photo = this.account.photo;
      }
    }
    if (changes.read) {
      if (this.read) {
        this.profileForm.disable();
        if (this.uploadStatus.isUploading) { this.onAbortUpload(); }
        if (this.listener) { this.listener.unsubscribe(); }
        this.noFocus = 'no-focus';
      } else {
        this.listener = this.adminService.getStream().subscribe(() => {
          this.done.emit(true);
        }, () => {
          this.done.emit(false);
        });
        this.noFocus = '';
        this.profileForm.enable();
      }
    }
  }
  onPickImage(e: Event): void {
    // TODO: add ft pick from image storage
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
    this.imageStorage.getSignedUrl(this.upload.data.name, this.upload.data.type, 'admin/photo')
      .subscribe((result) => {
        this.upload.url = result.url;
        this.upload.key = result.key;
        reader.readAsDataURL(this.upload.data);
      });
  }
  onRevertImage(): void {
    // TODO: add ft remove from image storage
    this.profileForm.patchValue({ photo: null });
    this.preview = null;
    this.upload = null;
    this.uploadStatus = null;
  }
  onGetGravatar(): void {
    this.adminService.getGravatar().subscribe((gravatar) => {
      if (gravatar === this.account.photo) { return; }
      this.profileForm.patchValue({ photo: gravatar });
      this.preview = gravatar;
    });
  }
  onUploadImage(): void {
    this.uploadStatus.isUploading = true;
    this.upload.uploadRequest = this.imageStorage.uploadImage(this.upload.url, this.upload.data)
      .subscribe(progressDone => {
        switch (progressDone) {
          case 101:
            this.uploadStatus.hasUploaded = true;
            this.uploadStatus.isUploading = false;
            this.profileForm.patchValue({
              photo: this.upload.key
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
  // save image also
  onSubmit() {
    if (this.profileForm.invalid) { return; }
    this.adminService.editProfile(
      this.account._id,
      this.profileForm.value.name,
      this.profileForm.value.lastName,
      this.profileForm.value.birthdate,
      this.profileForm.value.city,
      this.profileForm.value.state,
      this.profileForm.value.photo
    );
  }
  ngOnDestroy(): void {
    if (this.listener) { this.listener.unsubscribe(); }
  }
}
