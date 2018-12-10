/*
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/index';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

*/


import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as myGlobals from '../_shared/globals';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthGuard implements CanActivate {
    token: string;
    currentUser: any;
    constructor(private _router: Router, private _http: HttpClient){
		   	this.token = localStorage.getItem(myGlobals.appUID +'token');
		   	this.currentUser = JSON.parse( localStorage.getItem(myGlobals.appUID + 'currentUser') );
    	}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(myGlobals.appUID + 'currentUser')) {
        	if (!localStorage.getItem(myGlobals.appUID + 'isDeviceRegistered')) { this.checkRegisteredDevice(); }
            return true;
        }
        this._router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }






    checkRegisteredDevice() {

        let url = "auth/checkregisterddevice/" + this.currentUser.email; ;
        this.get(url )
            .subscribe(
                res => {
                    console.log(res);
                    if(res.response == true){
                    	localStorage.setItem(myGlobals.appUID + "isDeviceRegistered", 'true');
                    }
                    if(res.response == false){
                        this._router.navigate(['/user/questions']);
                    }

                },
                error => { console.log(error);}
            );
    }




	get(url:string): Observable<any>{
		let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token})};
	    return this._http.get<any>(myGlobals.apiBaseUrl + url, httpOptions)
	      	.pipe( map( (response: any) => { return response;} )
      	);
    }



}