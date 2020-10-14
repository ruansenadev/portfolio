import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent, Item } from './carousel.component';
import { ShareService } from '../share/share.service';
import { CarouselLoaderComponent } from './carousel-loader.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let mockShareService;

  const items: Item[] = [
    {
      icon: 'test',
      title: 'Test item',
      desc: 'test reading time',
      uri: '/blog/reading-time'
    },
    {
      icon: 'test',
      title: 'Test item2',
      desc: 'test reading time 2',
      uri: '/blog/reading-time'
    },
    {
      icon: 'test',
      title: 'Test item3',
      desc: 'test reading time 3',
      uri: '/blog/reading-time'
    }
  ];

  beforeEach(waitForAsync(() => {
    mockShareService = jasmine.createSpyObj(['openSheet']);
    TestBed.configureTestingModule({
      declarations: [
        CarouselComponent,
        CarouselLoaderComponent
      ],
      providers: [{ provide: ShareService, useValue: mockShareService }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render skeleton loaders', () => {
    const itemsLoaders = fixture.debugElement.queryAll(By.directive(CarouselLoaderComponent));

    expect(itemsLoaders.length).toBe(component.skeleton.length);
  });

  it('should render carousel items', () => {
    component.items = items;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.item').length).toBe(items.length);
  });
});
