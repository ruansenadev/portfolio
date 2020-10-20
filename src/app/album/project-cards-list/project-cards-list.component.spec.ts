import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardsListComponent } from './project-cards-list.component';
import { ProjectsService } from '../projects.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectListLoaderComponent } from './project-list-loader.component';
import { Project } from '../project';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { StatusPipe } from '../status.pipe';

describe('ProjectCardsListComponent', () => {
  let component: ProjectCardsListComponent;
  let fixture: ComponentFixture<ProjectCardsListComponent>;
  let mockProjectsService;
  let mockDialogService;
  let mockMessageService;
  let mockAuthService;

  const projects: Project[] = [
    {
      _id: '1',
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
  ];

  beforeAll(() => {
    mockProjectsService = jasmine.createSpyObj(['populateProjects', 'getStream', 'delProject']);
    mockAuthService = jasmine.createSpyObj(['getStatus', 'getListener']);
    mockDialogService = jasmine.createSpyObj(['open', 'afterClosed']);
    mockMessageService = jasmine.createSpyObj(['openFromComponent']);
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatusPipe,
        ProjectListLoaderComponent,
        ProjectCardsListComponent
      ],
      providers: [
        { provide: ProjectsService, useValue: mockProjectsService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: MatSnackBar, useValue: mockMessageService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardsListComponent);
    component = fixture.componentInstance;

    mockProjectsService.getStream.and.returnValue(of({ projects, hasMore: true }));
    mockAuthService.getListener.and.returnValue(of(false));
    fixture.detectChanges();
  });

  it('should render skeleton loader when fetching items', () => {
    component.onLoadMore();
    fixture.detectChanges();
    const postsLoaderDEs = fixture.debugElement.queryAll(By.directive(ProjectListLoaderComponent));

    expect(postsLoaderDEs.length).toBe(component.skeleton.length);
  });

  it('should delete correctly from list', () => {
    mockDialogService.open.and.returnValue(mockDialogService);
    mockDialogService.afterClosed.and.returnValue(of(true));
    mockProjectsService.delProject.and.returnValue(of({ message: 'removed' }));

    component.delProject(projects[0]);

    expect(mockProjectsService.delProject).toHaveBeenCalled();
    expect(component.projects).not.toContain(projects[0]);
  });
});
