import { Component } from '@angular/core';
@Component({
  selector: 'app-simple-layout',
  template: `
  	<div class="content body-background animated fadeIn"><router-outlet></router-outlet></div>
	`
})
export class SimpleLayoutComponent {}
