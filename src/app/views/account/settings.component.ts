import { Component, OnInit } from '@angular/core';
// Form 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSettings }              from '../../_models/index';
import * as myGlobals from '../../_shared/globals';
import { Router } from '@angular/router';
import { AuthenticationService, NetService } from '../../_services/index';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-account-settings',
  	templateUrl: './settings.component.html'  
})
export class SettingsComponent implements OnInit {

	loading:boolean = false;
	errorMsg:string = '';
  	successMsg:string = '';
  	alertMsg:string = '';
	item: UserSettings = new UserSettings();
	globals: any;

	validationMessages:any;
	fields: string[] = ['ReceiveNewsLetter', 'Q1', 'A1', 'Q2', 'A2', 'Q3', 'A3',  'Q4', 'A4', 'Q5', 'A5'];
	
	constructor(
  		private _fb: FormBuilder,
  		private _netService: NetService,
        private _auth: AuthenticationService,
        private _translate: TranslateService,
  	) { }
  
    // profileMissingFields: any;
  	ngOnInit() {
  		this.globals = myGlobals;
  		this._translate.get('Validations.usersettings', {value: ''}).subscribe((res: string) => {
            this.validationMessages = res;
        });

      /*
		this.profileMissingFields = JSON.parse(localStorage.getItem(myGlobals.appUID + 'ProfileMissingFields'));
		if(this.profileMissingFields['usersettings']){
			this.fields = this.profileMissingFields['usersettings'];
			this.alertMsg = "Below fields need your attention!!!!";
		}*/

  		this.buildForm();
  		this.getItem();
  	}


  	getItem(){
  		let apiUrl = 'account/settings';
  		this.loading = true;
        this._netService.authGet(apiUrl)
            .subscribe(
                res => {
                  if(res.status == 'ok'){
						this.item = res.data['usersettings'];
						this.buildForm();
                  }else {
                	this.errorMsg = 'Unknown';
                  }
                	this.loading = false;  
                },
            error => {
                this.errorMsg = error.status + ': ' + JSON.stringify(error.error);
                this.loading = false;
            }
        );
  	}

  	resetItem(){
        this.errorMsg='';
		this.buildForm();	
	}
	doSubmit(){
		this.errorMsg = '';
		this.successMsg = '';
		this.loading = true;

		this._netService.authPut( 'account/settings', this.ngForm.value)
        .subscribe(
            res => { 
                this.successMsg = res.message;
                //this.isProfileValid();
                this.loading = false;
            },
			error =>  {
                this.errorMsg = error.status + ': ' + JSON.stringify(error.error);
            	this.loading = false;
            }
        );
	}


  	ngForm: FormGroup;
    formErrors = {
        'ReceiveNewsLetter': '',
        'Q1': '',
        'Q2': '',
        'Q3': '',
        'Q4': '',
        'Q5': '',
        'A1': '',
        'A2': '',
        'A3': '',
        'A4': '',
        'A5': '',
    };

	buildForm(): void {
	    this.ngForm = this._fb.group({
	        
	        'ReceiveNewsLetter': [this.item.ReceiveNewsLetter, [
	        	Validators.required,
	        ]],
	        'Q1': [this.item.Q1, [
	        	Validators.required,
	        ]],
	        'Q2': [this.item.Q2, [
	        	Validators.required,
	        ]],
	        'Q3': [this.item.Q3, [
	        	Validators.required,
	        ]],
	        'Q4': [this.item.Q4, [
	        	Validators.required,
	        ]],
	        'Q5': [this.item.Q5, [
	        	Validators.required,
	        ]],
			'A1': [this.item.A1, [
	        	Validators.required,
	        ]],
	        'A2': [this.item.A2, [
	        	Validators.required,
	        ]],
	        'A3': [this.item.A3, [
	        	Validators.required,
	        ]],
	        'A4': [this.item.A4, [
	        	Validators.required,
	        ]],
	        'A5': [this.item.A5, [
	        	Validators.required,
	        ]],
	        'uid': [this.item.uid, []],
	    });
	    this.ngForm.valueChanges.subscribe(data => this.onValueChanged(data));
	    this.onValueChanged(); // (re)set validation messages now
	}

	onValueChanged(data ? : any) {
	    if (!this.ngForm) {
	        return;
	    }
	    const form = this.ngForm;

	    for (const field in this.formErrors) {
	        // clear previous error message (if any)
	        this.formErrors[field] = '';
	        const control = form.get(field);
	        if (control && control.dirty && !control.valid) {
	            const messages = this.validationMessages[field];
	            for (const key in control.errors) {
	                this.formErrors[field] += messages[key] + ' ';
	            }
	        }
	    }
	}



	_tt(field, element){
		return this._t('Fields.usersettings.' + field + '.' + element);
	}


   _t(text: string): string {
        let result = text;
        this._translate.get(text, {
            value: ''
        }).subscribe((res: string) => {
            result = res;
        });
        return result;
    }
/*
    isProfileValid(){
        let apiUrl = 'check-profile-validity';
        this.profileMissingFields = null;
        this._netService.authGet(apiUrl)
            .subscribe(
                res => {
                  this.loading = false;
                  if(res.status != 'ok'){
                      localStorage.setItem(myGlobals.appUID + 'ProfileMissingFields', JSON.stringify(res.data));
                  }
                  if(res.status == 'ok'){
                      localStorage.removeItem(myGlobals.appUID + 'ProfileMissingFields');
                  }
                },
            error => {
                this.errorMsg = error.status + ': ' + JSON.stringify(error.error);
                this.loading = false;
            }
        );
    }
*/



}
