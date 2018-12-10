import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NetService } from '../../_services/index';

@Component({
  selector: 'app-account-changepass',
  templateUrl: './changepass.component.html'  
})
export class ChangePassComponent implements OnInit {
	changePassword: ChangePassword;
  	loading:boolean = false;
	errorMsg:string = '';
  	successMsg:string = '';
  	constructor(
        private _translate: TranslateService,
        private _netService: NetService
    ) {}


  	ngOnInit() {
  		this.changePassword = new ChangePassword();
  		this.loading = false;
  	}

    submitChangePassword() {
    	this.errorMsg = ''; this.successMsg = '';
        if (this.changePassword.newPassword != this.changePassword.reenterPassword) {
        	this.errorMsg = "New password and re-enter password are not matching"; 
        } else if (this.smallCheck == false || this.capitalCheck == false || this.numberCheck == false || this.lengthCheck == false) {
        	this.errorMsg = "Invalid password, password must contain a lowercase letter, a capital letter, a number and it should contain minimum 8 characters"; 
        } else {
            this.loading = true;
            let url = "cred-changepw";
            this._netService.authPost(url, this.changePassword)
            .subscribe(
                res => { 
                    if(res.message != undefined){
                    	this.successMsg= res.message;
                    }
                    if(res.error!= undefined){
                    	this.errorMsg = res.error;
                    }
                    this.loading = false;
                },
                error => {
					this.errorMsg = error.status + ': ' + JSON.stringify(error.error);
                    this.loading = false;
                }
            );


        }
        console.log(this.changePassword);
    }




    togglePasswordValidationInformation = 0;
    showPasswordValidationInformation(state: number) {
        this.togglePasswordValidationInformation = state;
    }

    smallCheck = false;
    capitalCheck = false;
    numberCheck = false;
    lengthCheck = false;
    checkPassword() {

        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if (this.changePassword.newPassword.match(lowerCaseLetters)) {
            this.smallCheck = true;
        } else {
            this.smallCheck = false;
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (this.changePassword.newPassword.match(upperCaseLetters)) {
            this.capitalCheck = true;
        } else {
            this.capitalCheck = false;
        }


        // Validate numbers
        var numbers = /[0-9]/g;
        if (this.changePassword.newPassword.match(numbers)) {
            this.numberCheck = true;
        } else {
            this.numberCheck = false;
        }

        // Validate length

        if (this.changePassword.newPassword.length >= 8) {
            this.lengthCheck = true;
        } else {
            this.lengthCheck = false;
        }
    }













// -----------------------------------------------------
   _t(text: string): string {
        let result = text;
        this._translate.get(text, {
            value: ''
        }).subscribe((res: string) => {
            result = res;
        });
        return result;
    }

}



export class ChangePassword {
    public oldPassword: string;
    public newPassword: string;
    public reenterPassword: string;
    constructor() {
        this.oldPassword = '';
        this.newPassword = '';
        this.reenterPassword = '';
    }
}

