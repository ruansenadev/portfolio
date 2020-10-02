import { SkillPipe } from './skill.pipe';

describe('SkillPipe', () => {
  const skills = { JavaScript: ['Node', 'Express', 'Angular', 'MongoDB'], Git: true, English: 'Intermediate' }
  let pipe: SkillPipe;
  beforeAll(() => { pipe = new SkillPipe(); });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display list as text', () => {
    expect(pipe.transform(skills.JavaScript)).toEqual(' [ Node, Express, Angular, MongoDB ]')
  });

  it('should not display objects', () => {
    expect(pipe.transform(skills)).toEqual(' [object Object]')
  });
});
