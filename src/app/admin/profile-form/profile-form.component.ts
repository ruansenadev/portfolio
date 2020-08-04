import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Admin } from "../admin";
import { AdminService } from "../admin.service";

@Component({
  selector: 'admin-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnChanges {
  constructor(private fb: FormBuilder, private adminService: AdminService) { }
  @Input('admin') account: Admin
  profileForm = this.fb.group({
    photo: null,
    name: [null, Validators.required],
    lastName: [null, Validators.required],
    birthdate: [null, Validators.required],
    city: null,
    state: null
  });
  photo: string
  photoName: string = ''
  upload: string
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
  ngOnChanges(): void {
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
    if (this.profileForm.invalid) { return }
    this.adminService.editProfile(this.account._id, this.profileForm.value.name, this.profileForm.value.lastName, this.profileForm.value.birthdate, this.profileForm.value.city, this.profileForm.value.state)
    this.profileForm.reset()
  }
}
