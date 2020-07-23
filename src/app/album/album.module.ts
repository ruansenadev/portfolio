import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { AlbumRoutingModule } from "./album-routing.module";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { ClipboardModule } from "@angular/cdk/clipboard";

import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { ProjectCardsListComponent } from './project-cards-list/project-cards-list.component';

@NgModule({
  declarations: [
    ProjectFormComponent,
    ProjectDialogComponent,
    ProjectCardsListComponent
  ],
  imports: [
    CommonModule,
    ClipboardModule,
    ReactiveFormsModule,
    AlbumRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule
  ]
})
export class AlbumModule { }
