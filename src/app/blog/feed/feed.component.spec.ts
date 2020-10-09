import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import { Component } from '@angular/core';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  @Component({
    selector: 'app-blog-post-list',
    template: '<div></div>'
  })
  class MockPostList { }
  @Component({
    selector: 'app-blog-archives',
    template: '<div></div>'
  })
  class MockArchives {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockPostList,
        MockArchives,
        FeedComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
