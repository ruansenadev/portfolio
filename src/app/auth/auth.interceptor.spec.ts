import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('AuthInterceptor', () => {
  let mockAuthService;
  let httpTestingController;
  let mockReqService;
  const url = environment.api;

  @Injectable()
  class MockReqService {
    constructor(private http: HttpClient) { }

    req(): void {
      this.http.get(url).subscribe(() => {
        return;
      });
    }
  }

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['getToken']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        MockReqService,
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    mockReqService = TestBed.inject(MockReqService);
  });

  it('should be created', () => {
    const token = 'T0K3N';
    mockAuthService.getToken.and.returnValue(token);

    mockReqService.req();

    const httpReq = httpTestingController.expectOne(url);
    expect(httpReq.request.headers.get('Authorization')).toContain(token);
  });
});
