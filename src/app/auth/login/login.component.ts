import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) { }
  private listener: Subscription;
  isLoading = true;
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required] })
    });
    this.isLoading = false;
    this.listener = this.authService.status$.subscribe(() => this.isLoading = false);
  }

  onSubmit(): void {
    if (this.form.invalid) { return; }
    this.isLoading = true;
    this.authService.login(this.form.value.email, this.form.value.password);
  }
  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }
}
