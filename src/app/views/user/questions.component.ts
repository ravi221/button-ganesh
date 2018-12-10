import { Component, OnInit } from '@angular/core';
import { AuthenticationService, NetService } from '../../_services/index';
import * as myGlobals from '../../_shared/globals';
import { Router } from '@angular/router';

@Component({
  	selector: 'app-questions',
  	templateUrl: './questions.component.html',
})
export class QuestionsComponent implements OnInit {
	
	
    public loading = false;
    public errorMsg = '';
    public successMsg = '';

	constructor(
		private _netService: NetService,
		private _auth: AuthenticationService,
    private _router: Router
		) { }
  	ngOnInit() {
  		this.getQuestions();
  	}

  	questions: any;
    getQuestions() {
        this.errorMsg = null;
        this.successMsg = '';
        this.loading = true;
        let url = "security-questions/" + this._auth.getUser()['email'];
        this._netService.get(url )
            .subscribe(
                result => {
                    if(result.Errors ){
                        this.errorMsg = result.Errors.join('<br/>');
                    }
                    this.questions = result.questions;
                    this.loading = false;
                },
                error => {this.loading = false;}
            );
    }

    rememberMe: boolean=false;
    doSubmit(){
      this.errorMsg = '';
      let url = "auth/RegisterDevice/" + this._auth.getUser()['email'];
      this._netService.authPost(url, {qa:this.questions, rememberMe: this.rememberMe})
            .subscribe(
                result => {
                    if (result.response == true) {
                        localStorage.setItem(myGlobals.appUID + "isDeviceRegistered", 'true');
                        this._router.navigate(['/dashboard']);
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

}
