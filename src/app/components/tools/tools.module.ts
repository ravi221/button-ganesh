import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FilesComponent } from './files.component';
import { LoadingComponent } from './loading.component';

import { ReactiveFormsModule } from '@angular/forms';  // For ngModel
import { CommonModule } from '@angular/common';   // For ngIf

import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    TranslateModule,
    HttpClientModule
  ],
  declarations: [
      FilesComponent, LoadingComponent
  ],
  providers: [],
  exports: [ FilesComponent, LoadingComponent ]
})
export class ToolsModule { }