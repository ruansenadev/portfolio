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
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

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
    mockAuthService = jasmine.createSpyObj([], { bearer: 'Bearer ' + token });
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
    mockReqService.req();

    const httpReq = httpTestingController.expectOne(route);
    expect(httpReq.request.headers.get('Authorization')).toContain(token);
  });
});
