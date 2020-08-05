import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "../admin.service";
import { Admin } from '../admin';

@Component({
  selector: 'admin-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnChanges {
  constructor(private adminService: AdminService) { }
  passwordChange = false
  @Input() read: boolean
  @Input() account: Admin
  accountForm = new FormGroup({
    email: new FormControl({ value: null, disabled: this.read }, Validators.required),
    password: new FormControl({ value: null, disabled: this.read }, Validators.compose([Validators.required, Validators.minLength(8)])),
    new: new FormGroup({
      password: new FormControl({ value: null, disabled: this.read }, Validators.minLength(8)),
      passwordConfirm: new FormControl({ value: null, disabled: this.read }, Validators.minLength(8))
    }, { validators: this.confirmPasswords })
  })
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['account']) {
      if (this.account) this.accountForm.setValue({
        email: this.account.email,
        password: null,
        new: {
          password: null,
          passwordConfirm: null
        }
      })
    }
    if (changes['read']) {
      if (this.read) {
        this.passwordChange = false
        this.accountForm.disable()
      } else {
        this.accountForm.enable()
      }
    }
  }
  confirmPasswords(group: FormGroup): null | { notEqual: boolean } {
    return group.value.password === group.value.passwordConfirm ? null : { notEqual: true }
  }
  onSubmit(): void {
    if (this.accountForm.invalid) {
      return
    }
    if (!this.passwordChange && this.accountForm.value.email === this.account.email) {
      this.accountForm.reset()
      return
    }
    this.adminService.editAccount(this.account._id, this.accountForm.value.email, this.accountForm.value.password, this.accountForm.value.new.password)
  }
}
