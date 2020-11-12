import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { RequestInterceptor } from './request.interceptor';

describe('RequestInterceptor', () => {
  let mockRequestService: RequestService;
  let httpController: HttpTestingController;
  const route = '/any';

  @Injectable()
  class RequestService {
    constructor(private http: HttpClient) { }

    req(apiRoute: string) {
      this.http.get(apiRoute).subscribe();
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RequestService,
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
      ]
    });
    httpController = TestBed.inject(HttpTestingController);
    mockRequestService = TestBed.inject(RequestService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should concat api url before requested url', () => {
    mockRequestService.req(route);

    const req = httpController.expectOne(environment.api + route);
  });
});
