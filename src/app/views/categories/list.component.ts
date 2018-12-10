import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { Title }     from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService, NetService } from '../../_services/index';
import * as myGlobals from '../../_shared/globals';
import { DialogLib, ArrayLib } from '../../_lib/index';


@Component({
  	selector: 'app-category-list',
  	templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
    @ViewChild(ModalDirective) modal: ModalDirective;

	public loading = true;
    public globals: any;
    public items:any;
	public totalRecords:0
    public currentPage = 1;
    public itemsPerPage = 20;
    public sortField = "CreatedAt"
    public sortOrder = "DESC";
    public searchString = "";
    public searchField = "";
    public searchFields = [{"Id": "id", "Name":"Id"}, {"Id": "Name", "Name":"Name"},  {"Id": "ShortCode", "Name":"Short code"}, {"Id": "Published", "Name":"Published"}];
    public sortFields = [{"Id": "id", "Name":"Id"}, {"Id": "Name", "Name":"Name"}, {"Id": "ShortCode", "Name":"Short code"}, {"Id": "Published", "Name":"Published"}, {"Id": "Ordering", "Name":"Order"},
    	{ "Id": "CreatedAt", "Name": "Date Created"},
        { "Id": "UpdatedAt", "Name": "Date Updated"}];
    public acl = {"Create": 0, "Read": 0, "Update":0, Delete: 0, List: 0 };
    

    errorMsg: string = '';
    successMsg: string= '';

    itemsPerPageOptions = [5, 10, 20, 25, 50, 100, 250, 500];

	    constructor(
        private _titleService: Title,
        private _translate: TranslateService,
        private _netService: NetService,
        private _auth: AuthenticationService,
        private _dialogLib: DialogLib, private _arrayLib: ArrayLib,
    ) {}



  	ngOnInit() {
		this._titleService.setTitle(this._t('Categories.List'));
        this.globals = myGlobals;
        this.acl = this._auth.createACL('categories');

        if (this.acl.List == 0) {
        	this.errorMsg = '<h2>' + this._t('DialogMsgs.AccessDenied') + '</h2><p>' + this._t('DialogMsgs.AccessDeniedMsg') + '</p>';
        } else {
            this.itemsPerPage = myGlobals.itemsPerPage;
            this.getItems();
        }
  	}
    
    toggleSortOrder() {
        if(this.sortOrder == 'DESC') this.sortOrder = 'ASC'; else  this.sortOrder = 'DESC';
        this.getItems();
    }


    getItems() {
        this.loading = true;
        let apiUrl = 'categories?limit=' + this.itemsPerPage + '&page=' + this.currentPage + '&sort=' + this.sortField + '|' + this.sortOrder; // URL to web API
        if (this.searchString.length > 0 && this.searchField.length > 0) {
            apiUrl = apiUrl + '&' + this.searchField + '=' + this.searchString;
        }
        this._netService.authGet(apiUrl)
            .subscribe(
                res => {
                    this.items = res.data;
                    this.totalRecords = res.Count;
                    this.loading = false;
                },
                error => {
                    this.errorMsg = error.status + ': ' + JSON.stringify(error.error);
                    this.loading = false;
                }
            );
    }

    deleteItem(index: string) {
        if (this._dialogLib.showDialog(this._t('DialogMsgs.Delete?') + ': ' + this.items[index].Name + '?') != true) return false;
        this.loading = true;
        let apiUrl = 'categories/' + this.items[index].uid;
        this._netService.authDelete(apiUrl)
            .subscribe(
                res => {
                    this.successMsg = '<h2>' + this._t('DialogMsgs.Deleted') + '</h2>' + this._t('DialogMsgs.DeleteSuccess') + ': ' + this.items[index].Name;
                    this.items.splice(index, 1);
                    this.loading = false;
                },
                error => {
                    this.errorMsg = error.status + ': ' + JSON.stringify(error.error);
                    this.loading = false;
                }
            );
    }


    dismissOnTime:number = 5000;
    onClosed(){
        this.successMsg = '';
        this.errorMsg = '';        
    }



    // ------------------------------------------------------------
    showModal() {
        this.modal.show();
    }
    hideModal($event: ModalDirective){
        console.log($event.dismissReason);
        this.getItems();
    }




  	// ------------------------------------------------------------
	_t(text: string): string {
        let result = text;
        this._translate.get(text, {
            value: ''
        }).subscribe((res: string) => {
            result = res;
        });
        return result;
    }  	
}
