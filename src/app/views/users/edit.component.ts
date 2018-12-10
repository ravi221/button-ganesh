import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NetService } from '../../_services/index';
import { UserClass }              from '../../_models/index';
import * as myGlobals from '../../_shared/globals';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  templateUrl: './edit.component.html' 
})
export class EditComponent implements OnInit {
    public loading = true;
    public globals: any;
    public item = new UserClass();
    public bItem = new UserClass();
    public putFields: any;
    public successMsg: string ='';
    public errorMsg: string ='';

    public uid: string;

    public fields_user = ['Email', 'Role', 'Manager'];
    public fields_profile = ['Company', 'HouseNo', 'Street', 'Landmark', 'Pincode', 'City', 'Photo'];
    constructor(
        private _titleService: Title,
        private _translate: TranslateService,
        private _route: ActivatedRoute,
        private _netService: NetService
    ) {}
    ngOnInit() {
        this._titleService.setTitle(this._t('Users.Edit'));
        this.globals = myGlobals;
        this._route.params.subscribe(params => {
            if (params['uid']) this.uid = params['uid'];
        });

        if (this.uid != undefined) {
            this.getPartners();
        }

    }

	public partners: any;
    getPartners(){
        this._netService.authGet('partners').subscribe(res => {this.partners = res; this.getItem(this.uid)},error => {});
    }

    getItem(uid: string) {
        this.item = new UserClass();
        this.bItem = new UserClass();
        this.loading = true;
        let apiUrl = 'users/' + uid;
        this._netService.authGet(apiUrl)
            .subscribe(
                res => {
                    this.item = res;
                    this.bItem = JSON.parse(JSON.stringify(this.item));
                    this.putFields = res.PutFields;
                    this.loading = false;
                },
                error => {
                    this.successMsg = '<h2>' + this._t('DialogMsgs.ServerNotReachable') + '</h2>' + error.status + ': ' + error.error;
                    this.loading = false;
                }
            );

    }


    // Update ------------------------------------------------------------------------------
    
    updateTextField(fName: string, task: string){
        if(this.item[task][fName].length <=0 ){
            this.item[task][fName] = this.bItem[task][fName];
        }else {
            this.updateItem(this.item['user']['uid'], fName, this.item[task][fName], task);  
        }
    } 

    updateItemLoading: boolean = false;
    updateItem(uid: string, fName: string, fValue: any, task: string) {
        let data = { Field: fName, Value: fValue, Task: task, uid: uid };

        this.successMsg = '';
        this.errorMsg = '';
        this.updateItemLoading = true;
        this._netService.authPut('fields', data)
            .subscribe(
                res => {
                    if (res.status == 'ok') {
                        this.bItem = JSON.parse(JSON.stringify(this.item));
                        this.successMsg = res.Success.join('<br/>') + ' <br/> Record : ' + data.uid + ' from ' +res.oldValue + ' to ' + data.Value;
                    }
                    this.updateItemLoading = false;
                },
                error => {
                    this.errorMsg = error.status + ': ' + JSON.stringify(error.error);
                    this.updateItemLoading = false;
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
    RefTable: string = 'categories';
}