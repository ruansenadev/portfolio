import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeHeroComponent } from './home-hero.component';
import { SkillPipe } from './skill.pipe';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeHeroComponent', () => {
  let component: HomeHeroComponent;
  let fixture: ComponentFixture<HomeHeroComponent>;
  const admin = {
    name: 'Nyan',
    email: 'foo@bar.baz',
    last_name: 'Cat',
    birthdate: new Date(2011, 3, 2),
    address: { city: null, state: null },
    photo: 'https://placekitten.com/150/150',
    profession: 'Tester',
    biodata: 'Nyanyanyanyanyanyanya!',
    logo: null,
    nickname: 'nyan',
    skills: { fly: true, noise: 'high', rainbow: true },
    social: null,
    fullName: 'Nyan Cat',
    location: null,
    age: 9
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeHeroComponent,
        SkillPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HomeHeroComponent);
    component = fixture.componentInstance;
  });

  it('should render admin data', () => {
    component.admin = admin;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.hero-job').textContent).toContain(admin.profession);
    expect(fixture.nativeElement.querySelector('.hero-skills').textContent).toContain(admin.skills.fly);
  });

  it('should render skills in same order', () => {
    component.admin = admin;
    const skillsNames = Object.keys(admin.skills);

    fixture.detectChanges();

    let skillDEs = fixture.debugElement.queryAll(By.css('.skill'));
    for (let i = 0; i < skillDEs.length; i++) {
      expect(skillDEs[i].nativeElement.querySelector('.skill-name').textContent).toBe(skillsNames[i]);
    }
  })
});
