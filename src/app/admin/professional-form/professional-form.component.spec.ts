import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfessionalFormComponent } from './professional-form.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from '../admin.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ImageStorageService } from 'src/app/util/image-storage.service';

describe('ProfessionalFormComponent', () => {
  let component: ProfessionalFormComponent;
  let fixture: ComponentFixture<ProfessionalFormComponent>;
  let mockAdminService;
  let mockImageStorage;

  beforeEach(waitForAsync(() => {
    mockAdminService = jasmine.createSpyObj(['getStream', 'saveLogo', 'editProfessional']);
    mockImageStorage = jasmine.createSpyObj(['validateFile', 'getSignedUrl', 'uploadImage']);
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      declarations: [ProfessionalFormComponent],
      providers: [
        FormBuilder,
        DomSanitizer,
        { provide: AdminService, useValue: mockAdminService },
        { provide: ImageStorageService, useValue: mockImageStorage }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
