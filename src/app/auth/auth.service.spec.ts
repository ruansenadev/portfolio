import { AuthService } from './auth.service.prod';
import { of } from 'rxjs';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let mockRouter;
  const route = '/auth';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  const email = 'foo@bar.baz';
  const password = '</>';

  beforeAll(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: mockRouter }
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    const expiration = Date.now() + 10000000;

    service.login(email, password);

    const req = httpTestingController.expectOne(route);
    req.flush({ message: 'sucesso', token, expiration });
  });

  it('should auth', fakeAsync(() => {
    service.status$.subscribe(status => {
      expect(status).toBeTrue();
      expect(service.bearer).toContain(token);
    });
  }));

  it('should deauth when logout is called', fakeAsync(() => {
    service.logout();

    service.status$.subscribe(status => {
      expect(status).toBeFalse();
      expect(service.bearer).toBeFalsy();
    });
  }));

  it('should logout when token has expired', fakeAsync(() => {
    const msExp = 10000000;

    spyOn(service, 'logout');

    service.setExpTime(msExp);
    tick(msExp);

    expect(service.logout).toHaveBeenCalled();
  }));

  it('should navigate home when logout', () => {
    mockRouter.navigate.and.returnValue(null);

    service.logout();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
