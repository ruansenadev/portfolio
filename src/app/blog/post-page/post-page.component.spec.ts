import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPageComponent } from './post-page.component';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;
  let mockRoute;
  const d = new Date();
  const post = {
    date: d,
    date_formated: { relative: "há 1 min", locale: d.toLocaleDateString() },
    description: "Testing",
    icon: "test",
    _id: "1b",
    labels: ["Test", "Unit"],
    markdown: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    reading: { text: "3 min read", minutes: 3 },
    slug: "testing",
    title: "Testing time"
  }

  beforeAll(() => {
    mockRoute = jasmine.createSpyObj([], { snapshot: { data: { post } } });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostPageComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockRoute }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with data', () => {
    expect(component.post).toEqual(post);
    expect(fixture.nativeElement.querySelector('mat-card-title').textContent).toContain(post.title);
  });
});
