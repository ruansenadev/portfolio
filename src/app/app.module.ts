import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./material.module";
import { AppComponent } from './app.component';
import { PostFormComponent } from './blog/post-form/post-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostListComponent } from './blog/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { PostDialogComponent } from './blog/post-dialog/post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    PostListComponent,
    HeaderComponent,
    PostDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
