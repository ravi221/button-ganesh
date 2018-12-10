import { Component, OnInit } from '@angular/core';
// Form 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfile }              from '../../_models/index';
import * as myGlobals from '../../_shared/globals';
import { Router } from '@angular/router';
import { AuthenticationService, NetService } from '../../_services/index';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-profile',
  templateUrl: './profile.component.html'  
})
export class ProfileComponent implements OnInit {

	  loading:boolean = false;
	  errorMsg:string = '';
  	successMsg:string = '';
  	alertMsg:string = '';
	item: UserProfile = new UserProfile();
	globals: any;

	validationMessages:any;
	fields: string[] = ['Title', 'FirstName', 'LastName', 'Mobile',  'Company', 'HouseNo', 'Street', 'Postcode', 'Landmark', 'City', 'Country'];
	//profileMissingFields: any;
	constructor(
  		private _fb: FormBuilder,
  		private _netService: NetService,
        private _auth: AuthenticationService,
        private _translate: TranslateService,
  	) { }
  	ngOnInit() {
  		this.globals = myGlobals;
  		this._translate.get('Validations.userprofile', {value: ''}).subscribe((res: string) => {
            this.validationMessages = res;
        });
/*

		this.profileMissingFields = JSON.parse(localStorage.getItem(myGlobals.appUID + 'ProfileMissingFields'));
		if(this.profileMissingFields['userprofile']){
			this.fields = this.profileMissingFields['userprofile'];
			this.alertMsg = "Below fields need your attention!!!!";
		}
  */		



  		this.buildForm();
  		this.getItem();
  	}

  	getItem(){
  		let apiUrl = 'account/profile';
  		this.loading = true;
        this._netService.authGet(apiUrl)
            .subscribe(
                res => {
                  if(res.status == 'ok'){
						this.item = res.data['userprofile'];
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

		this._netService.authPut( 'account/profile', this.ngForm.value)
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
        'Title': '',
        'FirstName': '',
        'LastName': '',
        'Mobile': '',
        'Company':'',
        'HouseNo':'',
        'Street':'',
        'Postcode':'',
        'Landmark':'',
        'City':'',
        'Country':''
    };

	buildForm(): void {
	    this.ngForm = this._fb.group({
	        'Title': [this.item.Title, [
	            Validators.required
	        ]],
	        'FirstName': [this.item.FirstName, [
	            Validators.required,
	            Validators.minLength(2),
	            Validators.maxLength(100)
	        ]],
	        'LastName': [this.item.LastName, [
	            Validators.required,
	            Validators.minLength(1),
	            Validators.maxLength(100)
	        ]],
	        'Mobile': [this.item.Mobile, [
	            Validators.required,
	            Validators.minLength(10),
	            Validators.maxLength(10),
	            Validators.pattern('[789][0-9]{9}')
	        ]],
	        'Company': [this.item.Company, []],
	        'HouseNo': [this.item.HouseNo, [
	        	Validators.required,
	        ]],
	        'Street': [this.item.Street, [
	        	Validators.required,
	        ]],
	        'Postcode': [this.item.Postcode, [
	        	Validators.required,
	        ]],
	        'Landmark': [this.item.Landmark, []],
	        'City': [this.item.City, [
	        	Validators.required,
	        ]],
	        'Country': [this.item.Country, []],
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
		return this._t('Fields.userprofile.' + field + '.' + element);
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
