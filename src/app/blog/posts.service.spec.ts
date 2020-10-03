import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let mockHttpClient;
  let mockRouter;
  let mockMessagesService;

  beforeAll(() => {
    mockHttpClient = jasmine.createSpyObj(['get', 'post', 'put', 'delete']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockMessagesService = jasmine.createSpyObj(['openFromComponent']);

    service = new PostsService(mockHttpClient, mockRouter, mockMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
