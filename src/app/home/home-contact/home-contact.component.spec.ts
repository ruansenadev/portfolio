import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContactComponent } from './home-contact.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ContactComponent', () => {
  let component: HomeContactComponent;
  let fixture: ComponentFixture<HomeContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeContactComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HomeContactComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
