import { Project } from './project';
import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  let pipe: StatusPipe;
  const project: Project = {
    _id: '2',
    description: 'Another test project.',
    keywords: ['test', 'unit-test', 'isolated'],
    name: 'Portfolio',
    overview: 'Test project. For testing purposes.',
    seq: 2,
    status: 'Desenvolvimento',
    technologies: ['TypeScript', 'Jasmine', 'Karma'],
    url: 'https://localhost:4200/'
  };

  beforeAll(() => { pipe = new StatusPipe(); });

  it('should pipe to an icon', () => {
    expect(pipe.transform(project.status)).toEqual('build_circle');
  });

  it('should pipe to a color', () => {
    expect(pipe.transform(project.status, 'color')).toEqual('accent');
  });
});
