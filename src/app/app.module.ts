import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// ngx-translate - imports
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { AppComponent } from './app.component';
//import { LoadingComponent } from './components/tools/loading.component';

import { BsDropdownModule } from 'ngx-bootstrap';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService, AuthGuard, NetService } from './_services/index';

// ngx-translate -  AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,

		// Layouts
		FullLayoutComponent,
        SimpleLayoutComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}), 

		AppRoutingModule,

		BsDropdownModule.forRoot()

	],
	providers: [AuthenticationService, AuthGuard, NetService],
	bootstrap: [AppComponent],
	//exports: [ LoadingComponent ]
})
export class AppModule {}