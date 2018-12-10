import { Injectable } from '@angular/core';
@Injectable()
export class DialogLib {
    // Usage:
    // if(this._helpers.showDialog('') != true) return false;
	showDialog(msg: string){
		if(msg == '' ) msg = "Are you sure!";
		if (confirm(msg)) {
    		return true;
		} else {
    		return false;
		}
	}
}	