import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // For ngModel
import { CommonModule } from '@angular/common';   // For ngIf
import { TranslateModule } from '@ngx-translate/core';

import { ToolsModule } from '../../components/tools/tools.module';

import { ItemsRoutingModule } from './items-routing.module';

import { AddComponent } from './add.component';
import { EditComponent } from './edit.component';
import { ListComponent } from './list.component';

import { PaginationModule, TooltipModule, AlertModule, TypeaheadModule, ModalModule  } from 'ngx-bootstrap';
import { ArrayLib, DialogLib, DateLib } from '../../_lib/index';

@NgModule({
  imports: [
    ItemsRoutingModule,
    ReactiveFormsModule, 
    FormsModule, // for ngModel,
    CommonModule,
    TranslateModule,
    PaginationModule.forRoot(), TooltipModule.forRoot(), AlertModule.forRoot(), TypeaheadModule.forRoot(), ModalModule.forRoot(),
    
    ToolsModule
  ],
  declarations: [ AddComponent, EditComponent, ListComponent ],
  providers: [ DateLib, DialogLib, ArrayLib ],
  exports:[ AddComponent ]
})
export class ItemsModule { }