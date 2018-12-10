import { Injectable } from '@angular/core';
@Injectable()
export class DateLib {
    constructor() { }    

    // Input: "08/04/2018 09:00 am";  
    // Output/Unix Epoch time: 1539764706
    date2EpochTime(_stringDate: any): number{
        let a = new Date(_stringDate);
        let _year = a.getFullYear();
        let _month = a.getMonth() + 1;
        let _date = a.getDate();
        let strDate = _year.toString();
        if(_month < 10 ) strDate = strDate + "-0" + _month.toString(); else strDate = strDate + "-" + _month.toString();   
        if(_date < 10 ) strDate = strDate + "-0" + _date.toString(); else strDate = strDate + "-" + _date.toString(); 
        return parseInt((new Date(strDate).getTime() / 1000).toFixed(0));
    }

}    



