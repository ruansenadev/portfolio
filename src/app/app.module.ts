import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { ErrorInterceptor } from './messages/error.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { BlogCarouselComponent } from './blog/blog-carousel/blog-carousel.component';
import { AlbumCarouselComponent } from './album/album-carousel/album-carousel.component';
import { HomeComponent } from './home/home.component';
import { HomeContactComponent } from './home/home-contact/home-contact.component';
import { HomeHeroComponent } from './home/home-hero/home-hero.component';
import { FooterComponent } from './footer/footer.component';
import { MessageComponent } from './messages/message/message.component';
import { WorkComponent } from './work/work.component';
import { SheetComponent } from './share/sheet/sheet.component';
import { DispatcherComponent } from './dispatcher/dispatcher.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from "@angular/material/badge";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeHeroComponent,
    BlogCarouselComponent,
    AlbumCarouselComponent,
    HomeContactComponent,
    FooterComponent,
    MessageComponent,
    WorkComponent,
    SheetComponent,
    DispatcherComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MarkdownModule.forRoot(),
    MatFormFieldModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    LayoutModule,
    MatSidenavModule,
    MatBadgeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
