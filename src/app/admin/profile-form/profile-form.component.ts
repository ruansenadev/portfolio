import { Component, Input, OnChanges, SimpleChange, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from '@angular/forms';
import { Admin } from "../admin";
import { AdminService } from "../admin.service";

@Component({
  selector: 'admin-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnChanges, OnDestroy {
  constructor(private fb: FormBuilder, private adminService: AdminService) { }
  @Input() account: Admin
  @Input() read: boolean = true
  @Output() done = new EventEmitter<boolean>()
  profileForm = this.fb.group({
    photo: { value: null, disabled: this.read },
    name: [{ value: null, disabled: this.read }, Validators.required],
    lastName: [{ value: null, disabled: this.read }, Validators.required],
    birthdate: [{ value: null, disabled: this.read }, Validators.required],
    city: { value: null, disabled: this.read },
    state: { value: null, disabled: this.read }
  });
  private listener: Subscription
  photo: string
  photoName: string = ''
  upload: string
  noFocus: string = 'no-focus'
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
    if (changes['account']) {
      if (this.account) {
        this.profileForm.setValue({
          photo: null,
          name: this.account.name,
          lastName: this.account.last_name,
          birthdate: new Date(this.account.birthdate),
          city: this.account.address.city || null,
          state: this.account.address.state || null
        })
        this.photo = this.account.photo
        this.upload = null
      }
    }
    if (changes['read']) {
      if (this.read) {
        this.profileForm.disable()
        if (this.listener) this.listener.unsubscribe()
        this.noFocus = 'no-focus'
      } else {
        this.listener = this.adminService.getStream().subscribe(() => {
          this.done.emit(true)
        }, () => {
          this.done.emit(false)
        })
        this.noFocus = ''
        this.profileForm.enable()
      }
    }
  }
  onPick(e: Event): void {
    const imageBlob = (e.target as HTMLInputElement).files[0]
    this.profileForm.patchValue({ photo: imageBlob })
    const reader = new FileReader()
    reader.onloadend = () => {
      let extIndex = imageBlob.name.lastIndexOf('.')
      this.photoName = imageBlob.name.slice(0, (extIndex < 30 ? extIndex : 30)) + imageBlob.name.slice(extIndex)
      this.upload = reader.result as string
    }
    reader.readAsDataURL(imageBlob)
  }
  onRevertImage(): void {
    this.profileForm.patchValue({ photo: null })
    this.upload = null
    this.photoName = ''
  }
  onGetImage(): void {
    this.adminService.getGravatar().subscribe((gravatar) => {
      if (gravatar === this.account.photo) {
        return
      }
      this.profileForm.patchValue({ photo: gravatar })
      this.upload = gravatar
      this.photoName = ''
    })
  }
  onSaveImage(): void {
    if (this.photoName) {
      this.adminService.savePhoto(this.account._id, this.profileForm.value.photo, this.photoName)
    } else {
      this.adminService.savePhoto(this.account._id, this.profileForm.value.photo, null)
    }
  }
  onSubmit() {
    if (this.profileForm.invalid) {
      return
    }
    this.adminService.editProfile(this.account._id, this.profileForm.value.name, this.profileForm.value.lastName, this.profileForm.value.birthdate, this.profileForm.value.city, this.profileForm.value.state)
  }
  ngOnDestroy(): void {
    if (this.listener) this.listener.unsubscribe()
  }
}
