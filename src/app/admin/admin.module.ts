import { NgModule } from '@angular/core';
import { SharedModule } from '../util/shared.module';

import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { AdminRoutingModule } from './admin-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    SharedModule,
    AdminRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule
  ],
  providers: [
    { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA] } }
  ]
})
export class AdminModule { }
