import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService, mockHttpClient, mockRouter, token;

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
    let apiAuth, email, password;

    beforeAll(() => {
      apiAuth = environment.api + '/auth';
      email = 'foo@bar.baz';
      password = '</>';
    });

    it('should auth when login is called with right data', () => {
      const expiration = new Date(Date.now() + 10000000).valueOf();

      mockHttpClient.post.withArgs(apiAuth, { email, password }).and.returnValue(of({ message: 'sucesso', token, expiration }));

      service.login(email, password);

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
  });

});
