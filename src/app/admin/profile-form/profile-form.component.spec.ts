import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ProfileFormComponent } from './profile-form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from '../admin.service';
import { MatMenuModule } from '@angular/material/menu';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ImageStorageService } from 'src/app/util/image-storage.service';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;
  let mockAdminService;
  let mockImageStorage;

  beforeEach(waitForAsync(() => {
    mockAdminService = jasmine.createSpyObj(['getStream', 'getGravatar', 'savePhoto', 'editProfile']);
    mockImageStorage = jasmine.createSpyObj(['validateFile', 'getSignedUrl', 'uploadImage']);
    TestBed.configureTestingModule({
      declarations: [ProfileFormComponent],
      imports: [
        MatMenuModule,
      ],
      providers: [
        FormBuilder,
        DomSanitizer,
        { provide: AdminService, useValue: mockAdminService },
        { provide: ImageStorageService, useValue: mockImageStorage }
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
