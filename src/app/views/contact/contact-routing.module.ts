import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_services/auth.guard';
import { ContactComponent } from './contact.component';


const routes: Routes = [
  	{
    	path: '',
    	data: {
      		title: 'Contact'
    	},
    	children:[
	      {
	        path: '',
	        canActivate: [AuthGuard],
	        component: ContactComponent,
	        data: {
	          title: 'Contact us'
	        }
	      }
	    ]
  	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule {}
