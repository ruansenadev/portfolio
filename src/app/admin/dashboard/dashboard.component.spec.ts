import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DashboardComponent } from './dashboard.component';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Admin } from '../admin';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockAdminService, mockRoute;
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

  @Component({
    selector: 'app-admin-profile-form',
    template: '<div></div>'
  })
  class MockAdminProfileComponent {
    @Input() read: boolean;
    @Input() account: Admin;
    @Output() done = new EventEmitter<boolean>();
  }
  @Component({
    selector: 'app-admin-account-form',
    template: '<div></div>'
  })
  class MockAdminAccountComponent {
    @Input() read: boolean;
    @Input() account: Admin;
    @Output() done = new EventEmitter<boolean>();
  }
  @Component({
    selector: 'app-admin-professional-form',
    template: '<div></div>'
  })
  class MockAdminProfessionalComponent {
    @Input() read: boolean;
    @Input() account: Admin;
    @Output() done = new EventEmitter<boolean>();
  }

  beforeEach(async(() => {
    mockAdminService = jasmine.createSpyObj(['getStream']);
    mockRoute = jasmine.createSpyObj([], { snapshot: { data: { account: admin } } })
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockAdminAccountComponent,
        MockAdminProfessionalComponent,
        MockAdminProfileComponent
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
      ],
      providers: [
        { provide: AdminService, useValue: mockAdminService },
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    mockAdminService.getStream.and.returnValue(of(admin))
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
