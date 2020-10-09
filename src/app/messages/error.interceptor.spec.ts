import { TestBed, async } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { M } from '@angular/cdk/keycodes';

describe('ErrorInterceptor', () => {
   // TestBed.inject(ErrorInterceptor);
  let mockMessageService, mockReqService;
  let httpTestingController: HttpTestingController;
  const url = environment.api;

  @Injectable()
  class MockReqService {
    constructor(private http: HttpClient) { }
    req(): void {
      this.http.get(url).subscribe(() => { });
    }
  }

  beforeEach(async(() => {
    mockMessageService = jasmine.createSpyObj(['openFromComponent']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        MockReqService,
        { provide: MatSnackBar, useValue: mockMessageService }
      ]
    }).compileComponents();
    mockReqService = TestBed.get(MockReqService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('should create message for server errors', () => {
    mockReqService.req();

    const req = httpTestingController.expectOne(url);
    req.error(new ErrorEvent('test error'), { status: 500, statusText: 'bad server error' });

    expect(mockMessageService.openFromComponent).toHaveBeenCalled();
  });
});
