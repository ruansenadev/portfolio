import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ProfileFormComponent } from './profile-form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from '../admin.service';
import { MatMenuModule } from '@angular/material/menu';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;
  let mockAdminService;

  beforeEach(async(() => {
    mockAdminService = jasmine.createSpyObj(['getStream', 'getGravatar', 'savePhoto', 'editProfile']);
    TestBed.configureTestingModule({
      declarations: [ProfileFormComponent],
      imports: [
        MatMenuModule,
      ],
      providers: [
        FormBuilder,
        DomSanitizer,
        { provide: AdminService, useValue: mockAdminService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    component.read = false;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
