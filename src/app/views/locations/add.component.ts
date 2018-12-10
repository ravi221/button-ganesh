import { Component, OnInit } from '@angular/core';
import { Location }              from '../../_models/index';
import * as myGlobals from '../../_shared/globals';
import { NetService } from '../../_services/index';
import { TranslateService } from '@ngx-translate/core';
// Form 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  	selector: 'app-location-add',
  	templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {
	  loading:boolean = false;
	  errorMsg:string = '';
  	successMsg:string = '';
	  item: Location = new Location();
	  globals: any;	
	  fields: string[] = ['Name', 'Country', 'Published'];
	  constructor(
  		  private _netService: NetService,
  		  private _translate: TranslateService,
  	) { }
  	ngOnInit() {
  		  this.globals = myGlobals;
  	}

	  doSubmit(){
        this.errorMsg='';
        this.successMsg='';
		    this.loading = true;
        if(!this.item.Published ) { this.item.Published  = 0; } else { this.item.Published = 1; }
        if(!this.item.AllowUsers ) { this.item.AllowUsers  = 0; } else { this.item.AllowUsers = 1; }
        if(!this.item.AllowPartners ) { this.item.AllowPartners  = 0; } else { this.item.AllowPartners = 1; }
        this.item.Ordering = +this.item.Ordering;
        delete this.item.id;

        this._netService.authPost( 'locations', this.item)
        .subscribe(
            res => { 
                if(res.error){
                    this.errorMsg = res.error.join("<br/>");
                } else {
                    this.successMsg = '<h2>'+this._t('DialogMsgs.Success') + '</h2>'+  this._t('DialogMsgs.RecordCreatedSuccess') + ' / '+res.data.Name;
                }              
              this.loading = false;
            },
            error =>  {
              this.errorMsg = error.status + ': ' + JSON.stringify(error.error);
              this.loading = false;
            }
        );
	}




	// ------------------------------------------------------------------------------
    _t(text: string): string {
        let result = text;
        this._translate.get(text, {value: ''}).subscribe((res: string) => {
            result = res;
        });
        return result;
    }

    // ------------------------------------------------------------------------------
    dismissOnTime:number = 10000;
    onClosed(){
        this.successMsg = '';
        this.errorMsg = '';

    }
	


    public countries: any;
    public timeZones: any;
    getCountries() {
        let apiUrl = 'countries';
        this._netService.authGet(apiUrl)
            .subscribe(
                res => { this.countries = res.Countries;  this.timeZones =res.TimeZones ;},
                error => {}
            );
    }  


}


