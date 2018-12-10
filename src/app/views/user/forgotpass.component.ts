import { Component, OnInit } from '@angular/core';
import { NetService } from '../../_services/index';

@Component({
  	selector: 'app-user-forgotpass',
  	templateUrl: './forgotpass.component.html',
})
export class ForgotPassComponent implements OnInit {
    public fc: ForgotPass;
    public loading = false;
    public errorMsg = '';
    public successMsg = '';

    constructor(
        private _netService: NetService
    ) {}

    ngOnInit() {
        this.fc = new ForgotPass();
        this.fc.URL = '/forgot-password';
        this.getAuthKey();
    }


    

    verifyEmail() {
        this.loading = true;
        if (this.fc.email != this.fc.email2) {
            this.errorMsg = 'Email and re-enter email are not matching';
            this.loading = false;
        } else {
            this.getQuestions();
        }
        
    }


    resetPassword(){
        this.errorMsg = '';
        this.successMsg = '';
        for (let i=0; i<this.qa.length; i++) {
            if(this.qa[i]['Answer'] == undefined){
                this.errorMsg = 'Please answer all questions';
            }else {
                if(this.qa[i]['Answer'].length<= 0){
                    this.errorMsg = 'Please answer all questions';
                }
            }
        }
        if(this.errorMsg.length <= 0){
            this.fc.qa = this.qa;
            this.submitResetPassword();
        }
        console.log("password has been reset");
    }


    questions: any;
    public qa: QandA[];
    getQuestions() {
        this.errorMsg = null;
        this.successMsg = '';
        this.loading = true;
        let url = "security-questions/" + this.fc.email;
        this._netService.get(url )
            .subscribe(
                result => {
                    if(result.Errors ){
                        this.errorMsg = result.Errors.join('<br/>');
                    }
                    this.qa = result.questions;
                    this.loading = false;
                },
                error => {this.loading = false;}
            );
    }

    submitResetPassword() {
        this.loading = true;
        this.errorMsg = null;
        this.successMsg = '';
        let url = "forgot-password";
        this._netService.post(url, this.fc)
            .subscribe(
                result => {
                    if (result.success != undefined) {
                        this.successMsg = result.success;
                    }
                    if (result.error != undefined) {
                        this.errorMsg = result.error;
                    }
                    if(result.Errors ){
                        this.errorMsg = result.Errors.join('<br/>');
                    }
                    this.loading = false;
                },
                error => {
                    this.errorMsg =  error;
                    this.successMsg = '';
                    this.loading = false;
                }
            );
    }
    getAuthKey() {
        this.loading = true;
        this.errorMsg = null;
        this.successMsg = '';
        let url = "authkey";
        this._netService.post(url, this.fc)
            .subscribe(
                result => {
                    if (result.authKey != undefined) {
                        this.fc.authKey = result.authKey
                    } else {
                        this.errorMsg = "Unknown error";
                    }
                    this.loading = false;
                },
                error => {
                    this.errorMsg = < any > error
                    this.successMsg = '';
                    this.loading = false;
                }
            );
    }
}
export class ForgotPass {
    public email: string;
    public email2: string;
    public authKey: string;
    public URL: string;
    public qa: any;
}

export class QandA {
    public Question: string;
    public AnswerId: string;
    public Answer: string;
    constructor(){
        this.Answer='';
    }
}