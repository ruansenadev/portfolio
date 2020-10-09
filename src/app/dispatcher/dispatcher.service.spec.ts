import { TestBed, ComponentFixture } from '@angular/core/testing';

import { DispatcherService } from './dispatcher.service';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DispatcherService', () => {
  let fixture: ComponentFixture<MockDispatcher>;
  let service: DispatcherService;

  @Component({
    selector: 'app-dispatcher',
    template: '<div></div>'
  })
  class MockDispatcher {
    constructor(service: DispatcherService) {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockDispatcher],
      providers: [DispatcherService],
      schemas: []
    });
    service = TestBed.get(DispatcherService);
    fixture = TestBed.createComponent(MockDispatcher);
  });

  describe('Theme', () => {
    it('should create link element', () => {
      service.loadTheme(service.defaultTheme);
      const linkEl = fixture.debugElement.query(By.css('#Theme'));
      console.log(linkEl);
      expect(linkEl).toBeTruthy();
    });
  });

});
