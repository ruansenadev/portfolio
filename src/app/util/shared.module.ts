import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { StatusPipe } from '../album/status.pipe';

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
    StatusPipe
  ]
})
export class SharedModule { }
