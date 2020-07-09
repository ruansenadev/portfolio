import { NgModule } from "@angular/core";

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
    MatPaginatorModule
  ],
  providers: [{provide: MatPaginatorIntl, useClass: MatPaginatorIntlBr}]
})
export class MaterialModule {}
