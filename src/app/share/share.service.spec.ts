import { ShareService } from './share.service';

describe('ShareService', () => {
  let service: ShareService;
  let mockSheetService;
  const uri = '/album/1';

  beforeAll(() => {
    mockSheetService = jasmine.createSpyObj(['open']);
    service = new ShareService(mockSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create all links', () => {
    const social = service.social;
    
    const links = service.mapLinks(uri);

    expect(Object.keys(links)).toEqual(Object.keys(social));
  });

  it('should map shareable links', () => {
    const social = service.social;

    const links = service.mapLinks(uri);

    expect(Object.values(links)).not.toEqual(Object.values(social));
  });

});
