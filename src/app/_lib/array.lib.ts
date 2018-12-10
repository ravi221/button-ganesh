import { Injectable } from '@angular/core';
@Injectable()
export class ArrayLib {
    constructor() { }
         // Helper function
    findValueById(arr:any, uid:string, field: string){
        if (arr != undefined) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]['uid'] == uid){ 
                    if(arr[i]['LastName'] != undefined){
                        return arr[i]['LastName'] + '. '+arr[i]['FirstName'];
                    } else {
                        return arr[i][field];    
                    }
                }
            }
        }
        return uid;
    }

    toSentence(str:string){
        if(str == undefined) return "";
        str = str.split(/(?=[A-Z])/).join(" ").toLowerCase()    
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}    