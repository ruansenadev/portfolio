import { NgModule } from '@angular/core';
import { SharedModule } from '../util/shared.module';

import { MarkdownModule } from 'ngx-markdown';
import { AlbumRoutingModule } from './album-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { MatBadgeModule } from '@angular/material/badge';

import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { ProjectCardsListComponent } from './project-cards-list/project-cards-list.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectListLoaderComponent } from './project-cards-list/project-list-loader.component';

@NgModule({
  declarations: [
    ProjectFormComponent,
    ProjectDialogComponent,
    ProjectCardsListComponent,
    ProjectListLoaderComponent,
    ProjectPageComponent
  ],
  imports: [
    SharedModule,
    MarkdownModule.forChild(),
    ClipboardModule,
    CdkScrollableModule,
    ScrollingModule,
    AlbumRoutingModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatBadgeModule
  ]
})
export class AlbumModule { }
