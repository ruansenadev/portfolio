import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { Router } from '@angular/router';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let mockRouter, mockBarRef;
  const data = { message: 'Message test', action: 'Close' };
  
  beforeAll(() => {
    mockRouter = jasmine.createSpyObj(['navigateByUrl']);
    mockBarRef = jasmine.createSpyObj(['dismissWithAction', 'onAction']);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      declarations: [MessageComponent],
      providers: [
        { provide: MatSnackBarRef, useValue: mockBarRef },
        { provide: MAT_SNACK_BAR_DATA, useValue: data },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;

    mockBarRef.onAction.and.returnValue(of(null));
    fixture.detectChanges();
  });

  it('should display data', () => {
    expect(component.data).toEqual(data);
    expect(fixture.nativeElement.textContent).toContain(data.message);
  });
});
