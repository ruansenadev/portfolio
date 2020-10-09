import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPageComponent } from './project-page.component';
import { Project } from '../project';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProjectPageComponent', () => {
  let component: ProjectPageComponent;
  let fixture: ComponentFixture<ProjectPageComponent>;
  let mockRoute;

  const project: Project = {
    _id: '2',
    description: 'Another test project.',
    keywords: ['test', 'unit-test', 'deep-test'],
    name: 'Portfolio',
    overview: 'Test project. For testing purposes.',
    seq: 2,
    status: 'Development',
    technologies: ['TypeScript', 'Jasmine', 'Karma'],
    url: 'https://localhost:4200/'
  }

  beforeEach(async(() => {
    mockRoute = jasmine.createSpyObj([], { snapshot: { data: { project } } });
    TestBed.configureTestingModule({
      declarations: [ProjectPageComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockRoute }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display data', () => {
    expect(component.project).toEqual(project);
    expect(fixture.nativeElement.querySelector('mat-card-title').textContent).toContain(project.name);
  });
});
