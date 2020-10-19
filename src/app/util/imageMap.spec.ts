import { of } from 'rxjs';
import { imagesMap, MAP_LEVEL, setMapLevel } from './imageMap';
import { environment } from 'src/environments/environment';

describe('ImageMapOperator', () => {
  let mockSubj;
  const data = {
    name: 'Portfolio',
    keywords: ['portfolio', 'mean-stack', 'angular', 'express'],
    thumbnailPath: '/images/album/test.jpg',
    deepData: [
      {
        thumbnail: '/images/blog/test.png'
      }
    ],
  };

  beforeEach(() => {
    mockSubj = jasmine.createSpyObj(['asObservable']);
    mockSubj.asObservable.and.returnValue(of({ ...data }));
  });

  it('should map two level deep set by default', () => {
    mockSubj.asObservable().pipe(
      imagesMap('thumbnailPath', 'thumbnail')
    )
      .subscribe((result) => {
        expect(result.thumbnailPath).toContain(environment.serverHost);
        expect(result.deepData[0].thumbnail).toContain(environment.serverHost);
      });
  });
});
