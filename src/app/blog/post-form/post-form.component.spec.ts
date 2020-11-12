import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { PostsService } from '../posts.service';
import { Post } from '../post';
import { ImageStorageService } from 'src/app/util/image-storage.service';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let mockPostsService;
  let mockRoute;
  let mockSanitizer;
  let mockImageStorage;
  const d = new Date();
  const post: Post = {
    date: d,
    date_formated: { relative: 'há 1 min', locale: d.toLocaleDateString() },
    description: 'Testing',
    icon: 'test',
    _id: '1b',
    labels: ['Test', 'Unit'],
    markdown: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    reading: { text: '3 min read', minutes: 3 },
    slug: 'testing',
    title: 'Testing time'
  };

  beforeAll(() => {
    mockPostsService = jasmine.createSpyObj(['getStream', 'addProject', 'editProject']);
    mockImageStorage = jasmine.createSpyObj(['validateFile', 'getSignedUrl', 'uploadImage']);
    mockSanitizer = jasmine.createSpyObj(['bypassSecurityTrustUrl']);
    mockRoute = jasmine.createSpyObj([], { snapshot: { data: { post } } });
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PostFormComponent],
      providers: [
        { provide: PostsService, useValue: mockPostsService },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: DomSanitizer, useValue: mockSanitizer },
        { provide: ImageStorageService, useValue: mockImageStorage }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;

    mockPostsService.getStream.and.returnValue(of(null));
    fixture.detectChanges();
  });

  it('should create with data', () => {
    expect(component.form.value.title).toBe(post.title);
    expect(component.labels).toEqual(post.labels);
  });
});
