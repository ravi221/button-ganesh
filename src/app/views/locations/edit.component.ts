import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NetService } from '../../_services/index';
import { Category }              from '../../_models/index';
import * as myGlobals from '../../_shared/globals';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  templateUrl: './edit.component.html' 
})
export class EditComponent implements OnInit {
    public loading = true;
    public globals: any;
    public item = new Category();
    public bItem = new Category();
    public putFields: any;
    public successMsg: string ='';
    public errorMsg: string ='';

    public uid: string;

    public fields_left = ['Name', 'Alias', 'Content', 'Tags', 'Icon', 'Img'];
    public fields_right = ['Published', 'AllowUsers', 'AllowPartners', 'ParentId', 'CategoryType', 'UserId', 'Ordering'];
    constructor(
        private _titleService: Title,
        private _translate: TranslateService,
        private _route: ActivatedRoute,
        private _netService: NetService
    ) {}
    ngOnInit() {
        this._titleService.setTitle(this._t('Categories.Edit'));
        this.globals = myGlobals;
        this._route.params.subscribe(params => {
            if (params['uid']) this.uid = params['uid'];
        });

        if (this.uid != undefined) {
            this.getCategories();
        }

    }

    getItem(uid: string) {
        this.item = new Category();
        this.bItem = new Category();
        this.loading = true;
        let apiUrl = 'categories/' + uid;
        this._netService.authGet(apiUrl)
            .subscribe(
                res => {
                    this.item = res.data;
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


    public categoriesList: any;
    getCategories() {
        let apiUrl = 'categories';
        this._netService.authGet(apiUrl)
            .subscribe(
                res => { this.categoriesList = res.data; this.getItem(this.uid); },
                error => {}
            );
    }  


    // Update ------------------------------------------------------------------------------
    updateTextField(fName: string) {
        if (this.item[fName].length <= 0) {
            this.item[fName] = this.bItem[fName];
        } else {
            this.updateItem(this.item.uid, fName, this.item[fName]);
        }
    }
    updateToggleField(fName: string) {
        if (this.item[fName] < 0) {
            this.item[fName] = this.bItem[fName];
        } else {
            this.item[fName] = +this.item[fName];
            this.updateItem(this.item['uid'], fName, this.item[fName]);
        }
    }

    updateItemLoading: boolean = false;
    updateItem(uid: string, fName: string, fValue: any) {
        this.successMsg = '';
        this.errorMsg = '';
        let data = {
            Field: fName,
            Value: fValue,
            Task: 'category',
            uid: uid
        };
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




    


    // ------------------------------------------------------------------------------
    public log: any;
    isHistoryLoading: boolean = false;
    loadHistory(){
        this.isHistoryLoading = true;
        let apiUrl = 'log/' + this.item.uid;
        this._netService.authGet(apiUrl).subscribe(
            res => {
                    this.log = res.data;
                    this.isHistoryLoading = false;
                },
                error => { this.isHistoryLoading = false; }
            );
    }

}