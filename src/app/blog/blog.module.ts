import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { BlogRoutingModule } from "./blog-routing.module";
import { MarkdownModule } from "ngx-markdown";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from "@angular/material/chips";
import { MatPaginatorIntlBr } from "./MatPaginatorIntlBr";
import { MatPaginatorModule, MatPaginatorIntl } from "@angular/material/paginator";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";

import { PostFormComponent } from './post-form/post-form.component';
import { FeedComponent } from './feed/feed.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { PostPageComponent } from './post-page/post-page.component';

@NgModule({
  declarations: [
    FeedComponent,
    PostListComponent,
    PostFormComponent,
    PostDialogComponent,
    PostPageComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    ReactiveFormsModule,
    MatChipsModule,
    BlogRoutingModule,
    MatPaginatorModule,
    MatListModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA] } },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlBr}
  ]
})
export class BlogModule { }
