import { AuthService } from './auth.service.prod';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { tick, fakeAsync } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;
  let mockHttpClient;
  let mockRouter;
  let token;

  beforeAll(() => {
    mockHttpClient = jasmine.createSpyObj(['post']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  });

  beforeEach(() => {
    service = new AuthService(mockHttpClient, mockRouter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('LogIn', () => {
    let apiAuth;
    let email;
    let password;

    beforeAll(() => {
      apiAuth = environment.api + '/auth';
      email = 'foo@bar.baz';
      password = '</>';
    });

    it('should auth when login is called with right data', () => {
      const expiration = new Date(Date.now() + 10000000).valueOf();

      spyOn(service, 'setExpTime');
      mockHttpClient.post.withArgs(apiAuth, { email, password }).and.returnValue(of({ message: 'sucesso', token, expiration }));

      service.login(email, password);

      expect(service.setExpTime).toHaveBeenCalled();
      expect(service.getToken()).toBe(token);
      expect(service.getStatus()).toBeTrue();
    });
  });

  describe('LogOut', () => {
    it('should deauth when logout is called', () => {
      service.setStatus(true);

      service.logout();

      expect(service.getStatus()).toBeFalse();
    });

    it('should navigate home when log out', () => {
      mockRouter.navigate.and.returnValue('true');

      service.logout();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should logout when token has expired', fakeAsync(() => {
      const msExp = 10000000;
      service.setStatus(true);
      spyOn(service, 'logout');

      service.setExpTime(msExp);
      tick(msExp);

      expect(service.logout).toHaveBeenCalled();
    }));
  });

});
