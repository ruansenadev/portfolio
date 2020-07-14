import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) { }
  isLoading: boolean
  form: FormGroup
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required] })
    })
    this.isLoading;
  }

  onSubmit(): void {
    if (this.form.invalid) { return }
    this.isLoading = true;
    this.authService.login(this.form.value.email, this.form.value.password)
  }
}
