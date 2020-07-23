import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardsListComponent } from './project-cards-list.component';

describe('ProjectCardsListComponent', () => {
  let component: ProjectCardsListComponent;
  let fixture: ComponentFixture<ProjectCardsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCardsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
