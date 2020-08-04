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
      this.upload = gravatar
      this.photoName = ''
    })
  }
  onSendImage(): void {
    alert(`Image: ${this.photoName}`)
  }
  onSubmit() {
    alert(`Thanks!\n${this.profileForm.value.birthdate}\n${this.profileForm.value.state}`);
  }
}
