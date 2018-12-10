import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as myGlobals from './_shared/globals';

@Component({
  	selector: 'app-root',
  	template: '<router-outlet></router-outlet>',
})
export class AppComponent {
    constructor(translate: TranslateService) {
        translate.setDefaultLang(myGlobals.languageDefault);
        translate.use(myGlobals.languageDefault);
    }
}

