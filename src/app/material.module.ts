import { NgModule } from "@angular/core";
import { ENTER, COMMA } from "@angular/cdk/keycodes";

import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule, MatPaginatorIntl } from "@angular/material/paginator";
import { MatPaginatorIntlBr } from "./blog/MatPaginatorIntlBr";
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from "@angular/material/chips";

@NgModule({
  exports: [
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
    MatChipsModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlBr },
    { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA] } }
  ]
})
export class MaterialModule { }
