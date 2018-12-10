import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as myGlobals from '../_shared/globals';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginUser } from '../_models/index';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  	constructor(
    	private _http: HttpClient,
    	private _router: Router,
  	) {}



	login(_user: LoginUser): Observable < any > {
	    let apiUrl = myGlobals.apiBaseUrl + 'token';
	    let username: string = _user.email;
	    let password: string = _user.password;
	    let httpOptions = {
	        headers: new HttpHeaders({
	            'Content-Type': 'application/json',
	            'Authorization': 'Basic ' + btoa(username + ":" + password)
	        })
	    };

	    return this._http.post < LoginUser > (apiUrl, '', httpOptions).pipe(
	        map((res: any) => {
	                if (res.token) {
	                    let JSONToken = this.parseJWT(res.token);
	                    localStorage.setItem(myGlobals.appUID + "token", res.token);
	                    localStorage.setItem(myGlobals.appUID + 'currentUser', JSON.stringify(JSONToken.user));
                      localStorage.setItem(myGlobals.appUID + 'allowedMenuItems', JSON.stringify(JSONToken.scope));
	                    return res;
	                } else {
	                    return res;
	                }
	            },
	            catchError(this.handleError < LoginUser > ('Login'))
	        )
	    );
	}
  	

  	logout(): void {
    // clear token remove user from local storage to log user out
    	localStorage.removeItem(myGlobals.appUID + 'currentUser');
      localStorage.removeItem(myGlobals.appUID + 'allowedMenuItems');
  	}









	    getToken(){
        let token = localStorage.getItem(myGlobals.appUID +'token');
        if(token == undefined || token == null){ this._router.navigate(['/login']); }
        return token;
      }
      getUser(){
        let currentUser = JSON.parse( localStorage.getItem(myGlobals.appUID + 'currentUser') );
        if(currentUser == undefined || currentUser == null){ this._router.navigate(['/login']); }
        return currentUser;
      }


      parseJWT(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError < T > (operation = 'operation', result ? : T) {
      return (error: any): Observable < T > => {

        // TODO: send the error to remote logging infrastructure
        console.log('-----------------')
        console.error(error); // log to console instead
        console.log('-----------------')

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

      getAllowedMenuItems(){
        let allowedMenuItems = JSON.parse( localStorage.getItem(myGlobals.appUID + 'allowedMenuItems') );
        if (allowedMenuItems == undefined || allowedMenuItems == null) {
          return [];
        }
        return allowedMenuItems;
      }

      IsMenuItemAllowed(path: string){
        let currentUser = this.getUser();
        //if(currentUser.role == 'ADMIN') return true;
        if (path == undefined || path == null) return false;
        path = path.substring(1);
        let items = this.getAllowedMenuItems();
        if(items == undefined || items == null) return false;
        for(let i=0; i < items.length; i++){
            //if(items[i] == path + '.all' || items[i] == path + '.list' ) {
            if(items[i] == path + '.all' || items[i] == path + '.menu') {
                return true;
            }
        }
        return false
    }



    // ------------------------------------------------------------  Menu Item related function
    //  allowedMenuItems will be received from json token.scope value
    createACL(path:string){  // NOT IN USE YET
        let acl = {"Create": 0, "Read": 0, "Update":0, Delete: 0, List: 0 }
        let currentUser = this.getUser();
        if(currentUser.role == 'SUPER_ADMIN' || currentUser.role == 'ADMIN'){
            acl =  {"Create": 1, "Read": 1, "Update":1, Delete: 1, List: 1 };
        }
        let allowedMenuItems=this.getAllowedMenuItems();
        for(let i=0; i<allowedMenuItems.length; i++){
            if (allowedMenuItems[i]==path+'.all') {
                acl =  {"Create": 1, "Read": 1, "Update":1, Delete: 1, List: 1 };
            }
            if (allowedMenuItems[i]==path+'.create') acl.Create = 1;
            if (allowedMenuItems[i]==path+'.read') acl.Read = 1;
            if (allowedMenuItems[i]==path+'.update' || allowedMenuItems[i]==path+'.put') acl.Update = 1;
            if (allowedMenuItems[i]==path+'.delete') acl.Delete = 1;
            if (allowedMenuItems[i]==path+'.list') acl.List = 1;
        }
        return acl;
    }    
    



}