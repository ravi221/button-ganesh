import { Component, OnInit } from '@angular/core';
import { Register }              from '../../_models/index';
import * as myGlobals from '../../_shared/globals';
import { NetService } from '../../_services/index';

// Form 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  	selector: 'app-user-register',
  	templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

	loading:boolean = false;
	errorMsg:string = '';
  	successMsg:string = '';
	item: Register = new Register();
	globals: any;
	

  	constructor(
  		private _fb: FormBuilder,
  		private _netService: NetService
  	) { }
  	ngOnInit() {
  		this.globals = myGlobals;
  		this.buildForm();
  	}


  	resetItem(){
        this.errorMsg='';
		this.item = new Register();
		this.buildForm();	
	}
	doRegister(){
        this.loading = true;
        this._netService.authPost( 'register', this.ngForm.value)
        .subscribe(
            res => { 
                if(res.Errors){
                    this.errorMsg = res.Errors.join("<br/>");
                } 
                if(res.status == 'ok')
                {
                    this.successMsg = "<h3>Account created successfully</h3> <p>Please check your email for more details</p>";
                }              
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
        'Email': ''
    };



	validationMessages = {
	    "Title": {
	        "required": "Title is required."
	    },
	    "FirstName": {
	        "required": "First Name is required.",
	        "minlength": "First Name must be at least 2 characters long.",
	        "maxlength": "First Name cannot be more than 100 characters long."
	    },
	    "LastName": {
	        "required": "Last Name is required.",
	        "minlength": "Last Name must be at least 2 characters long.",
	        "maxlength": "Last Name cannot be more than 100 characters long."
	    },
	    "Mobile": {
	        "required": "Mobile is required.",
	        "minlength": "Mobile number must be at least 10 characters long.",
	        "maxlength": "Mobile number  cannot be more than 10 characters long.",
	        "pattern": "Please enter a valid mobile number"
	    },
	    "Email": {
	        "required": "Email is required.",
	        "minlength": "Email address  must be at least 10 characters long.",
	        "maxlength": "Email address  cannot be more than 100 characters long.",
	        "pattern": "Please enter a valid Email address"
	    }
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
	        'Email': [this.item.Email, [
	            Validators.required,
	            Validators.minLength(10),
	            Validators.maxLength(100)
	        ]],

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






}
