import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { MarkdownModule } from "ngx-markdown";
import { MaterialModule } from "./material.module";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostFormComponent } from './blog/post-form/post-form.component';
import { FeedComponent } from './blog/feed/feed.component';
import { PostListComponent } from './blog/post-list/post-list.component';
import { PostDialogComponent } from './blog/post-dialog/post-dialog.component';
import { PostPageComponent } from './blog/post-page/post-page.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    PostListComponent,
    HeaderComponent,
    PostDialogComponent,
    FeedComponent,
    PostPageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
