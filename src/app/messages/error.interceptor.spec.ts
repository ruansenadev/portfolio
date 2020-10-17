import { TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

describe('ErrorInterceptor', () => {
  // TestBed.inject(ErrorInterceptor);
  let mockMessageService;
  let mockReqService;
  let httpTestingController: HttpTestingController;
  const route = '/any';

  @Injectable()
  class MockReqService {
    constructor(private http: HttpClient) { }
    req(): void {
      this.http.get(route).subscribe(() => { });
    }
  }

  beforeEach(waitForAsync(() => {
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
    mockReqService = TestBed.inject(MockReqService);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create message for server response errors', () => {
    mockReqService.req();

    const req = httpTestingController.expectOne(route);
    req.flush({ message: 'bad request' }, { status: 500, statusText: 'internal server error' });

    expect(mockMessageService.openFromComponent).toHaveBeenCalled();
  });
});
