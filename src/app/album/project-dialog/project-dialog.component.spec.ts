import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogComponent } from './project-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('ProjectDialogComponent', () => {
  let component: ProjectDialogComponent;
  let fixture: ComponentFixture<ProjectDialogComponent>;

  const project = {
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule
      ],
      declarations: [ProjectDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: ProjectDialogComponent },
        { provide: MAT_DIALOG_DATA, useValue: { project, last: false }}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render project data', () => {
    expect(component.data.project).toEqual(project);
    expect(fixture.nativeElement.querySelector('h3').textContent).toBe(project.name);
  });
});
