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
    constructor(private dispatcherService: DispatcherService) { }
    theme = 'light';
    onSwitchTheme(): void {
      this.dispatcherService.switchTheme('dark');
      this.theme = this.dispatcherService.getTheme();
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockDispatcher],
      providers: [DispatcherService],
      schemas: []
    });
    service = TestBed.inject(DispatcherService);
    fixture = TestBed.createComponent(MockDispatcher);
  });

  describe('Theme', () => {
    it('should create link element', () => {
      fixture.componentInstance.onSwitchTheme();
      const linkEl = fixture.debugElement.query(By.css('#Theme'));
      expect(linkEl).toBeTruthy();
    });
  });

});
