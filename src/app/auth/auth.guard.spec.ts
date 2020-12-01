import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockAuthSubject = new BehaviorSubject<boolean>(false);
  let mockAuthService;
  let mockRouter;
  let mockRouterState;

  beforeEach(() => {
    mockRouterState = jasmine.createSpyObj<RouterStateSnapshot>(['url', 'toString', 'root'], { url: '/admin' });
    mockAuthService = jasmine.createSpyObj([], { subject: mockAuthSubject, status$: mockAuthSubject.asObservable(), redirect: '' });
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

  it('should redirect to login when not authenticated', fakeAsync(() => {
    guard.canActivate(null, mockRouterState).subscribe();
    tick();

    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/login');
  }));

  it('should register redirect url', fakeAsync(() => {
    guard.canActivate(null, mockRouterState).subscribe();
    tick();

    expect(mockAuthService.redirect).toHaveBeenCalledWith(mockRouterState.url);
  }));

  it('should redirect to dashboard when logged in', fakeAsync(() => {
    mockAuthSubject.next(true);
    (Object.getOwnPropertyDescriptor(mockRouterState, 'url').get as any).and.returnValue('/login');

    guard.canActivate(null, mockRouterState).subscribe();
    tick();
    
    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/admin');
  }));
});
