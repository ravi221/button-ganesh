import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

// Parsing route
import { Router } from '@angular/router';

@Component({
  	selector: 'app-user',
  	templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  	constructor(
      private _title: Title, 
  		private _router: Router,		// Parsing route
  	) { }
  	
  	viewName: string;
  	ngOnInit() {
  		  switch(this._router.url){
  			    case  '/user/forgot-password': 
                this.viewName='forgot-password'; 
                this._title.setTitle('Forgot Password');
                break;
            case  '/user/register': 
                this.viewName='register'; 
                this._title.setTitle('Register');
                break;

            default : 
              this.viewName='login';
              this._title.setTitle('Login');
              break;
        }
  	}
}
