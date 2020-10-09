import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAuthService;

  @Component({
    selector: 'app-dispatcher',
    template: '<div></div>'
  })
  class MockDispatcherComponent { }

  beforeEach(waitForAsync(() => {
    mockAuthService = jasmine.createSpyObj(['authBack']);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockDispatcherComponent
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should try to authenticate back', () => {
    fixture.detectChanges();

    expect(mockAuthService.authBack).toHaveBeenCalled();
  });
});
