import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService;


  beforeEach(waitForAsync(() => {
    mockAuthService = jasmine.createSpyObj(['login'], { status$: of(false) });
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call login on form submit', () => {
    const email = 'foo@bar.baz';
    const password = '</>';

    component.form.setValue({
      email,
      password
    });
    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
  });
});
