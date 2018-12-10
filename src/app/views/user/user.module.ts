import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { ForgotPassComponent } from './forgotpass.component';
import { RegisterComponent } from './register.component';
import { UserComponent } from './user.component';

import { UserRoutingModule } from './user-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // For ngModel
import { CommonModule } from '@angular/common';   // For ngIf

import { QuestionsComponent } from './questions.component';
@NgModule({
  imports: [
    UserRoutingModule,
    ReactiveFormsModule, 
    CommonModule,
    TranslateModule,

    FormsModule, // for ngModel,
    CommonModule,
  ],
  declarations: [ LoginComponent, ForgotPassComponent, RegisterComponent, UserComponent, QuestionsComponent ],
  providers: [],
  exports: [ RegisterComponent ]
})
export class UserModule { }