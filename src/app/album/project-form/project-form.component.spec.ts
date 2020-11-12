import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectFormComponent } from './project-form.component';
import { ProjectsService, Sequences } from '../projects.service';
import { Project } from '../project';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ImageStorageService } from 'src/app/util/image-storage.service';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;
  let mockProjectsService;
  let mockRoute;
  let mockSanitizer;
  let mockImageStorage;

  const project: Project = {
    _id: '1',
    description: 'Test project.',
    keywords: ['test', 'unit-test', 'deep-test'],
    name: 'Portfolio',
    overview: 'Test project. For testing purposes.',
    seq: 1,
    status: 'Development',
    technologies: ['TypeScript', 'Jasmine', 'Karma'],
    url: 'https://localhost:4200/'
  };
  const sequences: Sequences = {
    projects: new Map([[project.seq, project.name]]),
    available: new Map([[project.seq, false], [project.seq + 1, true]]),
    next: project.seq + 1
  };

  beforeAll(() => {
    mockProjectsService = jasmine.createSpyObj(['getStream', 'addProject', 'editProject']);
    mockImageStorage = jasmine.createSpyObj(['validateFile', 'getSignedUrl', 'uploadImage']);
    mockSanitizer = jasmine.createSpyObj(['bypassSecurityTrustUrl']);
    mockRoute = jasmine.createSpyObj([], { snapshot: { data: { project, sequences } } });
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectFormComponent],
      providers: [
        { provide: ProjectsService, useValue: mockProjectsService },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: DomSanitizer, useValue: mockSanitizer },
        { provide: ImageStorageService, useValue: mockImageStorage }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;

    mockProjectsService.getStream.and.returnValue(of(null));
    fixture.detectChanges();
  });

  it('should create with data', () => {
    expect(component.form.value.name).toBe(project.name);
    expect(component.form.get('seq').value).toBe(project.seq);
  });
});
