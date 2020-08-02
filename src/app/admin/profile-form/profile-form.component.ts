import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'admin-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent {
  constructor(private fb: FormBuilder) {}

  profileForm = this.fb.group({
    photo: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    birthdate: [null, Validators.required],
    city: null,
    state: null
  });
  states = [
    {name: 'Acre', abbreviation: 'AC'},
    {name: 'Alagoas', abbreviation: 'AL'},
    {name: 'Amapá', abbreviation: 'AP'},
    {name: 'Amazonas', abbreviation: 'AM'},
    {name: 'Bahia', abbreviation: 'BA'},
    {name: 'Ceará', abbreviation: 'CE'},
    {name: 'Distrito Federal', abbreviation: 'DF'},
    {name: 'Espírito Santo', abbreviation: 'ES'},
    {name: 'Goiás', abbreviation: 'GO'},
    {name: 'Maranhão', abbreviation: 'MA'},
    {name: 'Mato Grosso', abbreviation: 'MT'},
    {name: 'Mato Grosso Sul', abbreviation: 'MS'},
    {name: 'Minas Gerais', abbreviation: 'MG'},
    {name: 'Pará', abbreviation: 'PA'},
    {name: 'Paraíba', abbreviation: 'PB'},
    {name: 'Paraná', abbreviation: 'PR'},
    {name: 'Pernambuco', abbreviation: 'PE'},
    {name: 'Piauí', abbreviation: 'PI'},
    {name: 'Rio de Janeiro', abbreviation: 'RJ'},
    {name: 'Rio Grande do Norte', abbreviation: 'RN'},
    {name: 'Rio Grande do Sul', abbreviation: 'RS'},
    {name: 'Rondônia', abbreviation: 'RO'},
    {name: 'Roraima', abbreviation: 'RR'},
    {name: 'Santa Catarina', abbreviation: 'SC'},
    {name: 'São Paulo', abbreviation: 'SP'},
    {name: 'Sergipe', abbreviation: 'SE'},
    {name: 'Tocantins', abbreviation: 'TO'}
  ];
  photoName: string = ''
  photo: string
  upload: string
  onPick(e: Event): void {
    const imageBlob = (e.target as HTMLInputElement).files[0]
    this.profileForm.patchValue({ photo: imageBlob })
    const reader = new FileReader()
    reader.onloadend = () => {
      let extIndex = imageBlob.name.lastIndexOf('.')
      this.photoName = imageBlob.name.slice(0, (extIndex<30?extIndex:30))+imageBlob.name.slice(extIndex)
      this.upload = reader.result as string
    }
    reader.readAsDataURL(imageBlob)
  }
  onSendImage(): void {

  }
  onSubmit() {
    alert(`Thanks! ${this.profileForm.get('birthdate').value}`);
  }
}
