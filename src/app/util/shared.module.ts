import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { StatusPipe } from '../album/status.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StatusPipe
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ContentLoaderModule,
    StatusPipe,
    MatProgressBarModule
  ]
})
export class SharedModule { }
