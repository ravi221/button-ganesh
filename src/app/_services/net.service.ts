import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import * as myGlobals from '../_shared/globals';

@Injectable()
export class NetService {
    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
  	) {}


    get(url:string): Observable<any>{
        let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
        return this.http.get<any>(myGlobals.apiBaseUrl + url, httpOptions)
          .pipe(
            map( (response: any) => { 
                console.log(`get: ${url} load success`);
                return response;
            },
            catchError(this.handleError < any > ('get'))
          )
        );
    }
	  authGet(url:string): Observable<any>{
		    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.getToken()})};
	      return this.http.get<any>(myGlobals.apiBaseUrl + url, httpOptions)
	      	.pipe(
	        	map( (response: any) => { 
                console.log(`authGet: ${url} load success`);
                return response;
            },
	        	catchError(this.handleError < any > ('authGet'))
	        )
      	);
    }
    authPost(url:string, data:any): Observable<any>{
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.getToken()})};
      return this.http.post<any>(myGlobals.apiBaseUrl + url, data, httpOptions)
          .pipe(
            map( (response: any) => { 
                console.log(`authPost: ${url} posted successfully`);
                return response;
            },
            catchError(this.handleError < any > ('authPost'))
          )
        );
    }
    post(url:string, data:any): Observable<any>{
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
      return this.http.post<any>(myGlobals.apiBaseUrl + url, data, httpOptions)
          .pipe(
            map( (response: any) => { 
                console.log(`authPost: ${url} posted successfully`);
                return response;
            },
            catchError(this.handleError < any > ('authPost'))
          )
        );
    }
    authPut(url:string, data:any): Observable<any>{
      let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.getToken()})};
      return this.http.put<any>(myGlobals.apiBaseUrl + url, data, httpOptions)
          .pipe(
            map( (response: any) => { 
                console.log(`authPut: ${url} posted successfully with data ` + ' <br/> Record : ' + data.uid + ' to ' + data.Value);
                return response;
            },
            catchError(this.handleError < any > ('authPost'))
          )
        );
    }



      authDelete (url:string): Observable<any> {
      let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.getToken()})};
      return this.http.delete<any>(myGlobals.apiBaseUrl + url, httpOptions)
          .pipe(
            map( (response: any) => { 
                console.log(`authDelete: ` + url);
                return response;
            },
            catchError(this.handleError < any > ('authDelete'))
          )
        );
    }



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


}  	


