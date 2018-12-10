import { Component } from '@angular/core';
@Component({
  	selector: 'app-loading',
  	template: `
  	<div class="text-center border shadow-lg p-3 mb-5 rounded bg-light ">
        <img src="assets/img/loader.gif" > <br/> Loading ...<br/>
    </div>`,
})
export class LoadingComponent{}
