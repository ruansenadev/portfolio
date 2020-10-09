import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService, mockRouter, mockRouterState;

  beforeEach(() => {
    mockRouterState = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['url', 'toString', 'root'], { url: '/admin' });
    mockAuthService = jasmine.createSpyObj(['getStatus', 'setRedirect']);
    mockRouter = jasmine.createSpyObj(['parseUrl']);
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: RouterStateSnapshot, useValue: mockRouterState }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should redirect to login if not authenticated', () => {
    mockAuthService.getStatus.and.returnValue(false);

    guard.canActivate(null, mockRouterState);

    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/login');
  });

  it('should redirect to dashboard when loggedIn', () => {
    (Object.getOwnPropertyDescriptor(mockRouterState, 'url').get as any).and.returnValue('/login');
    mockAuthService.getStatus.and.returnValue(true);

    guard.canActivate(null, mockRouterState);

    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/admin');
  });

  it('should register redirect url for service', () => {
    mockAuthService.getStatus.and.returnValue(false);

    guard.canActivate(null, mockRouterState);

    expect(mockAuthService.setRedirect).toHaveBeenCalledWith(mockRouterState.url);
  });
});
