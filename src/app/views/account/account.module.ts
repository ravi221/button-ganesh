import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';   // For ngIf
import {TranslateModule} from '@ngx-translate/core';

import { AccountComponent } from './account.component';
import { SettingsComponent } from './settings.component';
import { ChangePassComponent } from './changepass.component';
import { ProfileComponent } from './profile.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // For ngModel


// Bootstrap 
import { TooltipModule, TabsModule  } from 'ngx-bootstrap';


@NgModule({
  imports: [
    AccountRoutingModule,
	ReactiveFormsModule, 
    CommonModule,
    TranslateModule,

    FormsModule, // for ngModel,
    CommonModule,

    TooltipModule.forRoot(), TabsModule.forRoot(),
  ],
  declarations: [ AccountComponent, SettingsComponent, ChangePassComponent, ProfileComponent ],
})
export class AccountModule { }