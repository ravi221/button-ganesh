import { Component, OnInit } from '@angular/core';
import { AuthenticationService, NetService } from '../../_services/index';
import { LoginUser }              from '../../_models/index';
import { Router, ActivatedRoute  } from '@angular/router';
import * as myGlobals from '../../_shared/globals';

@Component({
  	selector: 'app-user-login',
  	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  	item:LoginUser;
  	errorMsg:string = '';
  	loading:boolean=false;
    returnUrl: string;
  	constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _auth: AuthenticationService,
        private _netService: NetService,
    ) { }
  	ngOnInit() {
      this._auth.logout();
      this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

  		this.item = new LoginUser();
  	}

  	doLogin(){
      this.errorMsg = '';
  		this.loading = true;
  		if(!this.validateEmail(this.item.email)){
  			this.errorMsg = 'Invalid Field : Email';
  		}
  		if(this.item.password.length < 8 ){
  			this.errorMsg = 'Invalid Field : Password';
  		}

  		if(!this.errorMsg){
  			  this.login();
  		}
  		
  	}

  	validateEmail(email) {
    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(String(email).toLowerCase());
	  }


    login() {
        this.loading = true;
        this.errorMsg = '';
        this._auth.login(this.item)
        .subscribe(result => {
                if (result.token) {
                    this.isProfileValid();
                    //this._router.navigateByUrl(this.returnUrl);

                } else {
                    this.errorMsg = 'Username or password is incorrect';
                }
                
            },
            error => {
                if (error.status != undefined) {
                    switch (parseInt(error.status)) {
                        case 0:
                            this.errorMsg = 'Server not reachable, try again later';
                            break;
                        case 401:
                            this.errorMsg = error.status + ': ' + error.error.title + ', Username or password is incorrect';
                            break;
                        default:
                            this.errorMsg = error.status + ': ' + JSON.stringify(error.error);
                    }
                }
                if (error == '') {
                    this.errorMsg = 'Unknown error';
                }
                this.loading = false;
            }
        );
    }





    isProfileValid(){
        let apiUrl = 'check-profile-validity';
        this._netService.authGet(apiUrl)
            .subscribe(
                res => {
                  this.loading = false;
                  if(res.status != 'ok'){
                      localStorage.setItem(myGlobals.appUID + 'ProfileMissingFields', JSON.stringify(res.data));
                      this._router.navigate(['/account/profile']);
                  }
                  if(res.status == 'ok'){
                      localStorage.removeItem(myGlobals.appUID + 'ProfileMissingFields');
                      this._router.navigate([this.returnUrl]);
                  }
                },
            error => {
                this.errorMsg = error.status + ': ' + JSON.stringify(error.error);
                this.loading = false;
            }
        );
    }



}
