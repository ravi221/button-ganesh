import { Component, OnInit } from '@angular/core';

import { Item }              from '../../_models/index';
import { DateLib } from '../../_lib/index';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NetService, AuthenticationService } from '../../_services/index';

@Component({
  	selector: 'app-item-add',
  	templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {
	constructor(
    ) {}
	
  	ngOnInit() {
  	}
}
