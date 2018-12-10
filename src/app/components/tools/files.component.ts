import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NetService, AuthenticationService } from '../../_services/index';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { DialogLib} from '../../_lib/index';
import * as myGlobals from '../../_shared/globals';

import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html'  
})
export class FilesComponent implements OnInit {
    @Input('RefTable') RefTable: string;
    @Input('RefUID') RefUID: string;
    

    constructor(
        private _translate: TranslateService,
        private _netService: NetService,
        public _auth: AuthenticationService,
        private _dialogLib: DialogLib,
        private _http: HttpClient
    ) {}


    loading: boolean = false;
    items: any;
    errMsg: string='';
    ngOnInit(){
        this.getItems();
  	}




   getItems() {
       if(!this.RefTable || !this.RefUID) return false;
        this.loading = true;
        let apiUrl = 'files?RefTable=' + this.RefTable + '&RefUID=' + this.RefUID;
        this._netService.authGet(apiUrl)
            .subscribe(
                res => {
                    this.items = res.data;
                    this.loading = false;
                },
                error => {
                  let msg = error.status + ': ' + error.error;
                    this.errMsg = msg;
                    this.loading = false;
                }
            );
    }

    selectedFile: File;
    onFileChanged(event) {
        this.selectedFile = <File>event.target.files[0]
    }


    progress: number=0;
    onUpload() {
        // upload code goes here
        console.log(this.selectedFile);
        this.loading = true;
        this.errMsg = '';
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        fd.append('Name', this.selectedFile.name);
        fd.append('RefUID', this.RefUID);
        fd.append('RefTable', this.RefTable);
        this.progress=0;
        this._http.post<any> (
              myGlobals.apiBaseUrl + 'files',
              fd, 
              {headers: new HttpHeaders({'Authorization': 'Bearer ' + this._auth.getToken() }), reportProgress: true, observe: "events"}
          ).subscribe(
              event => {
                  if(event.type === HttpEventType.UploadProgress){
                      console.log('Progress ' + Math.round(event.loaded / event.total * 100) + '%');
                      this.progress = Math.round(event.loaded / event.total * 100);
                  } else if (event.type === HttpEventType.Response){
                      if(event.body.Error != undefined){
                          this.errMsg =  event.body.Error.join('<br/>');
                          this.loading = false;
                      } else if(event.body.status != undefined ){
                          this.getItems();
                          this.selectedFile = null;  
                      }
                      //console.log(event);
                  }
              }
          );

    }
 
    msgSuccess:string = '';
    deleteItem(index: number){
        console.log(this.items[index]['uid']);
        if (this._dialogLib.showDialog(this._t('DialogMsgs.Delete?') + ': ' + this.items[index].Name + '?') != true) return false;

        this.loading = true;
        let apiUrl = 'files/' + this.items[index].uid;
        this._netService.authDelete(apiUrl)
            .subscribe(
                res => {
                    this.msgSuccess = '<h2>' + this._t('DialogMsgs.Deleted') + '</h2>' + this._t('DialogMsgs.DeleteSuccess') + ': ' + this.items[index].Name;
                    this.items.splice(index, 1);
                    this.loading = false;
                },
                error => {
                    this.errMsg =  error.status + ': ' + error.error;
                    this.loading = false;
                }
            );
    }
    

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
