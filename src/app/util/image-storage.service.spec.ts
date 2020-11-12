import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ImageStorageService } from './image-storage.service';

describe('ImageStorageService', () => {
  let service: ImageStorageService;
  let mockHttpController: HttpTestingController;
  const invalidFileName = 'bl0bF!?e/10.png';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ImageStorageService);
    mockHttpController = TestBed.inject(HttpTestingController);
  });

  it('should parse file name', () => {
    const mockBlobFile = new Blob(['<a>test</a>'], { type: 'text/html' });
    const mockFile = new File([mockBlobFile], invalidFileName, { type: mockBlobFile.type });

    const safeFile = service.validateFile(mockFile);

    expect(safeFile.name).not.toEqual(mockFile.name);
  });

});
