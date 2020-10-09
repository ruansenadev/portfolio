import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormComponent } from './account-form.component';
import { AdminService } from '../admin.service';
import { ReactiveFormsModule, FormControlName } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AccountFormComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;
  let mockAdminService;
  const admin = {
    name: 'Nyan',
    email: 'foo@bar.baz',
    last_name: 'Cat',
    birthdate: new Date(2011, 3, 2),
    address: { city: null, state: null },
    photo: 'https://placekitten.com/150/150',
    profession: 'Tester',
    biodata: 'Nyanyanyanyanyanyanya!',
    logo: null,
    nickname: 'nyan',
    skills: { fly: true, noise: 'high', rainbow: true },
    social: null,
    fullName: 'Nyan Cat',
    location: null,
    age: 9
  };

  beforeAll(() => { mockAdminService = jasmine.createSpyObj(['getStream', 'editAccount']) });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [AccountFormComponent],
      providers: [{ provide: AdminService, useValue: mockAdminService }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;

    component.read = false;
    component.account = admin;
    mockAdminService.getStream.and.returnValue(of(null));
    fixture.detectChanges();
  });

  it('should not have password change by default', () => {
    const passwordChangeFormDE = fixture.debugElement.query(By.css('#password-change'));

    expect(passwordChangeFormDE).not.toBeTruthy();
  });

  it('should show password form', () => {
    const passwordFormBtn = fixture.debugElement.queryAll(By.css('button'))[0];

    passwordFormBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    const passwordChangeFormDE = fixture.debugElement.query(By.css('#password-change'));

    expect(passwordChangeFormDE).toBeTruthy();
  });
  
});
