import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent {
  constructor(public share: MatBottomSheetRef<SheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: { [key: string]: string } ) { }
}
