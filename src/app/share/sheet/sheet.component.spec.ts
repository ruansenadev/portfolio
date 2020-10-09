import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetComponent } from './sheet.component';
import { MatListModule } from '@angular/material/list';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

describe('SheetComponent', () => {
  let component: SheetComponent;
  let fixture: ComponentFixture<SheetComponent>;
  let mockSheet;
  const data = {
    WhatsApp: 'https://wa.me/?text=test',
    Facebook: 'https://www.facebook.com/sharer/sharer.php?u=https://example.com',
    Email: 'mailto:foo@bar.baz?&subject=&body=test'
  }

  beforeEach(async(() => {
    mockSheet = jasmine.createSpyObj(['dismiss']);
    TestBed.configureTestingModule({
      imports: [MatListModule],
      declarations: [SheetComponent],
      providers: [
        { provide: MatBottomSheetRef, useValue: mockSheet },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: data }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display links', () => {
    expect(component.data).toEqual(data);
    Object.keys(data).forEach(s => expect(fixture.nativeElement.textContent).toContain(s));
  });
});
