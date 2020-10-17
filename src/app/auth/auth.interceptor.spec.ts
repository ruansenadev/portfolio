import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

describe('AuthInterceptor', () => {
  let mockAuthService;
  let httpTestingController;
  let mockReqService;
  const route = '/auth';

  @Injectable()
  class MockReqService {
    constructor(private http: HttpClient) { }

    req(): void {
      this.http.get(route).subscribe(() => {
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

  it('should concat token on header', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    mockAuthService.getToken.and.returnValue(token);

    mockReqService.req();

    const httpReq = httpTestingController.expectOne(route);
    expect(httpReq.request.headers.get('Authorization')).toContain(token);
  });
});
