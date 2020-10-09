import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../blog/posts.service';
import { ProjectsService } from '../album/projects.service';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Admin } from '../admin/admin';
import { Item } from '../carousel/carousel.component';
import { CarouselPipe } from '../carousel/carousel.pipe';
import { of } from 'rxjs';
import { Project } from '../album/project';
import { Post } from '../blog/post';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockPostsService, mockProjectsService, mockRoute;

  @Component({
    selector: 'app-home-hero',
    template: '<div></div>'
  })
  class MockHomeHeroComponent {
    @Input() admin: Admin;
  }
  @Component({
    selector: 'app-carousel',
    template: '<div></div>'
  })
  class MockCarouselComponent {
    @Input() title: string;
    @Input() items: Item[] = [];
  }
  @Component({
    selector: 'app-home-contact',
    template: '<div></div>'
  })
  class MockHomeContactComponent { }

  const admin = {
    name: 'Nyan',
    email: 'foo@bar.baz',
    last_name: 'Cat',
    birthdate: new Date(2011, 3, 2),
    address: { city: null, state: null },
    photo: 'https://placekitten.com/150/150',
    profession: 'Tester',
    biodata: 'Nyanyanyanyanyanyanya!',
    logo: null,
    nickname: 'nyan',
    skills: { fly: true, noise: 'high', rainbow: true },
    social: null,
    fullName: 'Nyan Cat',
    location: null,
    age: 9
  };
  const d = new Date();
  const posts: Post[] = [
    {
      date: d,
      date_formated: { relative: "há 1 min", locale: d.toLocaleDateString() },
      description: "Test timing",
      icon: "local_library",
      _id: "1a",
      labels: ["Reading", "Timing"],
      markdown: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      reading: { text: "3 min read", minutes: 3 },
      slug: "reading-time",
      title: "Reading time"
    },
    {
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
  ];
  const projects: Project[] = [
    {
      description: 'Test project.',
      keywords: ['test', 'unit-test', 'deep-test'],
      name: 'Portfolio',
      overview: 'Test project. For testing purposes.',
      seq: 1,
      status: 'Development',
      technologies: ['TypeScript', 'Jasmine', 'Karma'],
      url: 'https://localhost:4200/'
    },
    {
      description: 'Another test project.',
      keywords: ['test', 'unit-test', 'deep-test'],
      name: 'Portfolio',
      overview: 'Test project. For testing purposes.',
      seq: 2,
      status: 'Development',
      technologies: ['TypeScript', 'Jasmine', 'Karma'],
      url: 'https://localhost:4200/'
    }
  ];

  beforeAll(() => {
    mockPostsService = jasmine.createSpyObj(['getPosts']);
    mockProjectsService = jasmine.createSpyObj(['getProjects']);
    mockRoute = jasmine.createSpyObj([], { snapshot: { data: { admin } } });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockHomeHeroComponent,
        MockCarouselComponent,
        CarouselPipe,
        MockHomeContactComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: PostsService, useValue: mockPostsService },
        { provide: ProjectsService, useValue: mockProjectsService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    mockPostsService.getPosts.and.returnValue(of({ posts }));
    mockProjectsService.getProjects.and.returnValue(of({ projects }));
    fixture.detectChanges();
  });

  it('should start with admin data', () => {
    expect(component.admin).toEqual(admin);
  });

  it('should pass data for carousels', () => {
    const carouselsDEs = fixture.debugElement.queryAll(By.directive(MockCarouselComponent));

    carouselsDEs.forEach((c) => expect(c.componentInstance.items.length).toBe(2));
  });
});
