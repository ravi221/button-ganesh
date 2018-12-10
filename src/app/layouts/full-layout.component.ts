import { Component, OnInit } from '@angular/core';
import * as myGlobals from '../_shared/globals';

import { AuthenticationService } from '../_services/index';

@Component({
	selector: 'app-full-layout',
	templateUrl: './full-layout.component.html'
})

export class FullLayoutComponent {
	constructor(
		public _auth: AuthenticationService
	){}




	isSidebarVisible: boolean = true;
  	public toggleSidebar() {
    	return this.isSidebarVisible = !this.isSidebarVisible;
  	}

}
