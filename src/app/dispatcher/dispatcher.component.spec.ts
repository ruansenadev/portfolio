import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DispatcherComponent } from './dispatcher.component';
import { DispatcherService } from './dispatcher.service';
import { AdminService } from '../admin/admin.service';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DispatcherComponent', () => {
  let component: DispatcherComponent;
  let fixture: ComponentFixture<DispatcherComponent>;
  let mockAdminService;
  const mockAuthSubject = new BehaviorSubject<boolean>(false);
  let mockAuthService;
  let mockService;

  let mockAnchorEv;
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

  beforeAll(() => {
    mockService = jasmine.createSpyObj(['getTheme', 'switchTheme'], { defaultTheme: 'light' });
    mockAdminService = jasmine.createSpyObj(['fetchAdmin', 'getStream']);
    mockAuthService = jasmine.createSpyObj(['logout'], { subject: mockAuthSubject, status$: mockAuthSubject.asObservable() });
    mockAnchorEv = jasmine.createSpyObj(['preventDefault']);
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DispatcherComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ],
      providers: [
        { provide: DispatcherService, useValue: mockService },
        { provide: AdminService, useValue: mockAdminService },
        { provide: AuthService, useValue: mockAuthService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatcherComponent);
    component = fixture.componentInstance;
    mockService.getTheme.and.returnValue(mockService.defaultTheme);
    mockAdminService.getStream.and.returnValue(of(admin));
  });

  it('should initialize with data', () => {
    fixture.detectChanges();
    expect(component.theme).toBe(mockService.defaultTheme);
    expect(component.account).toEqual(admin);
  });

  it('should call to switch theme when switcher is clicked', () => {
    const switcherDE = fixture.debugElement.query(By.css('#switcher'));
    mockService.getTheme.and.returnValue('dark');

    switcherDE.triggerEventHandler('click', mockAnchorEv);

    fixture.detectChanges();
    expect(mockService.switchTheme).toHaveBeenCalled();
    expect(component.theme).not.toBe(mockService.defaultTheme);
  });

  describe('Auth', () => {
    beforeEach(() => {
      mockAuthSubject.next(true);
      fixture.detectChanges();
    });

    it('should display a second nav', () => {
      const sideNavDEs = fixture.debugElement.queryAll(By.directive(MatSidenav));
      expect(sideNavDEs.length).toBe(2);
    });

    it('should destroy second nav when logout', () => {
      mockAuthSubject.next(false);
      fixture.detectChanges();

      const sideNavDEs = fixture.debugElement.queryAll(By.directive(MatSidenav));
      expect(sideNavDEs.length).toBe(1);
    });
  });

});
