import { ProjectsService } from './projects.service';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let httpTestingController: HttpTestingController;
  let mockRouter;
  let mockMessagesService;
  const url = environment.api + '/projects';

  beforeAll(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockMessagesService = jasmine.createSpyObj(['openFromComponent']);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProjectsService,
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockMessagesService }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProjectsService);
  });

  it('should call api with queries', () => {
    const behind = 0, items = 3;
    const query = `?behind=${behind}&items=${items}`;
    service.getProjects(behind, items).subscribe();

    httpTestingController.expectOne(url + query);
    httpTestingController.verify();
  });
});
