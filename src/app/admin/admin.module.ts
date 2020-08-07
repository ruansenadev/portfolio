import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { AdminRoutingModule } from "./admin-routing.module";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from "@angular/material/chips";

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { ProfessionalFormComponent } from './professional-form/professional-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileFormComponent,
    AccountFormComponent,
    ProfessionalFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule
  ],
  providers: [
    { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA] } }
  ]
})
export class AdminModule { }
