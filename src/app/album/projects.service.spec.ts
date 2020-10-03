import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let mockHttpClient;
  let mockRouter;
  let mockMessageService;

  beforeAll(() => {
    mockHttpClient = jasmine.createSpyObj(['get', 'post', 'put', 'delete']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockMessageService = jasmine.createSpyObj(['openFromComponent']);

    service = new ProjectsService(mockHttpClient, mockRouter, mockMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
