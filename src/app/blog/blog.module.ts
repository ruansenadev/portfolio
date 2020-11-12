import { NgModule } from '@angular/core';

import { BlogRoutingModule } from './blog-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { MatPaginatorIntlBr } from './MatPaginatorIntlBr';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

import { PostFormComponent } from './post-form/post-form.component';
import { FeedComponent } from './feed/feed.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostListLoaderComponent } from './post-list/post-list-loader.component';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { PostPageComponent } from './post-page/post-page.component';
import { BlogArchivesComponent } from './blog-archives/blog-archives.component';
import { SharedModule } from '../util/shared.module';

@NgModule({
  declarations: [
    FeedComponent,
    PostListComponent,
    PostListLoaderComponent,
    PostFormComponent,
    PostDialogComponent,
    PostPageComponent,
    BlogArchivesComponent
  ],
  imports: [
    SharedModule,
    MarkdownModule.forChild(),
    MatChipsModule,
    BlogRoutingModule,
    MatPaginatorModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  providers: [
    { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA] } },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlBr}
  ]
})
export class BlogModule { }
