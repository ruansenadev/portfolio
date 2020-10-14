import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let mockRoute;
  let mockPostsService;
  let mockAuthService;
  let mockMessageBar;
  let mockDialog;

  beforeAll(() => {
    mockDialog = jasmine.createSpyObj(['open']);
    mockMessageBar = jasmine.createSpyObj(['openFromComponent']);
    mockRoute = jasmine.createSpyObj([], { queryParams: {} });
    mockPostsService = jasmine.createSpyObj(['populatePosts', 'getStream', 'delPost']);
    mockAuthService = jasmine.createSpyObj(['getStatus', 'getListener']);
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockMessageBar },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: PostsService, useValue: mockPostsService },
        { provide: AuthService, useValue: mockAuthService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
  });

  it('should call for posts with params on init', () => {
    const year = 2020;
    const month = 9;
    (Object.getOwnPropertyDescriptor(mockRoute, 'queryParams').get as any).and.returnValue(of({ year, month }));

    fixture.detectChanges();

    expect(mockPostsService.populatePosts).toHaveBeenCalledWith(component.left, component.items, year, month);
  });
});
