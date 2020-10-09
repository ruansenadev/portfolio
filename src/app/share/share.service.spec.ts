import { ShareService } from './share.service';

describe('ShareService', () => {
  let service: ShareService;
  let mockSheetService;
  const uri = '/album/1';

  beforeAll(() => {
    mockSheetService = jasmine.createSpyObj(['open']);
    service = new ShareService(mockSheetService);
  });

  it('should map shareable links', () => {
    const social = service.social;

    const links = service.mapLinks(uri);

    expect(Object.keys(links)).toEqual(Object.keys(social));
    expect(Object.values(links)).not.toEqual(Object.values(social));
  });

  it('should call injected service for opening sheet', () => {
    service.openSheet(uri);

    expect(mockSheetService.open).toHaveBeenCalled();
  });

});
