import { CarouselPipe } from './carousel.pipe';
import { Project } from '../album/project';

describe('CarouselPipe', () => {
  let pipe: CarouselPipe;
  const project: Project = {
    _id: '1', seq: 1,
    name: 'Project',
    status: 'Ended',
    description: 'A simple project.',
    overview: 'A project without a objective, but learn',
    thumbnailPath: null,
    technologies: ['Karma', 'Jasmine'],
    url: 'https://jasmine.github.io/tutorials/your_first_suite',
    homepage: null,
    keywords: ['Test runner', 'Unit test']
  };

  beforeAll(() => { pipe = new CarouselPipe(); });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not try to map an empty list', () => {
    expect(pipe.transform([], 'post')).toEqual([]);
  });

  it('should create an empty list for unknown model', () => {
    expect(pipe.transform([project], 'batata')).toEqual([]);
  });

  it('should create carousel list', () => {
    expect(pipe.transform([project], 'project').length).toBe(1);
  });
});
