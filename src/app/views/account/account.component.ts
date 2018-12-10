import { Component, OnInit, ViewChild, ViewContainerRef  } from '@angular/core';
import * as myGlobals from '../../_shared/globals';
// Parsing route
import { Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';

import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'  
})
export class AccountComponent implements OnInit {
@ViewChild('staticTabs') staticTabs: TabsetComponent;
	constructor(
		private _title: Title, 
		private _router: Router, 
	) { }
  	ngOnInit() {
  			switch(this._router.url){
  			    case  '/account/settings': 
	                this.staticTabs.tabs[2].active = true;
	                this._title.setTitle('My Account Settings');
	                break;
	            case  '/account/password': 
	                this.staticTabs.tabs[1].active = true;
	                this._title.setTitle('Change Password');
	                break;
	            default : 
	              this.staticTabs.tabs[0].active = true;
	              this._title.setTitle('My Account');
	              break;
        	}

  	}
}
