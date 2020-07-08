import { NgModule } from "@angular/core";

import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  exports: [
    MatProgressBarModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class MaterialModule {}
