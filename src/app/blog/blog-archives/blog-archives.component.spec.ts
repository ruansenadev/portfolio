import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArchivesComponent, Archives } from './blog-archives.component';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('BlogArchivesComponent', () => {
  let component: BlogArchivesComponent;
  let fixture: ComponentFixture<BlogArchivesComponent>;
  let mockPostsService, mockRouter;

  const archivesList: Archives[] = [
    {
      year: 2020, months: [
        { num: 7, month: 'July', count: 2 },
        { num: 8, month: 'August', count: 5 },
        { num: 9, month: 'September', count: 4 }
      ]
    }
  ];

  beforeAll(() => {
    mockPostsService = jasmine.createSpyObj(['getArchives']);
    mockRouter = jasmine.createSpyObj(['navigate']);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogArchivesComponent],
      providers: [
        { provide: PostsService, useValue: mockPostsService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogArchivesComponent);
    component = fixture.componentInstance;

    mockPostsService.getArchives.and.returnValue( of( archivesList ) );
    fixture.detectChanges();
  });

  it( 'should receive data', () => {
    expect( component.archivesList ).toEqual( archivesList );
  } );

  it( 'should nav when select different date', () => {
    const year = 2021;

    component.onExpandYear(year);

    expect(mockRouter.navigate).toHaveBeenCalledWith([], { queryParams: { year } } );
  } );
});
