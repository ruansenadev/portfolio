import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let mockHttpClient;
  let mockMessageService;

  beforeAll(() => {
    mockHttpClient = jasmine.createSpyObj(['get', 'put']);
    mockMessageService = jasmine.createSpyObj(['openFromComponent']);

    service = new AdminService(mockHttpClient, mockMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
