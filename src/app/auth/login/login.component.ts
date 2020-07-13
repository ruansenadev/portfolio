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
  isLoading: boolean = true
  form: FormGroup
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required] })
    })
    this.isLoading = false;
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.form.invalid) { return }
    this.authService.login(this.form.value.email, this.form.value.password)
  }
}
