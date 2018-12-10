import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../_services/auth.guard';
import { AccountComponent } from './account.component';


const routes: Routes = [
  	{
    	path: '',
    	data: {
      		title: 'Account'
    	},
    	children:[
	      {
	        path: '',
	        canActivate: [AuthGuard],
	        component: AccountComponent,
	        data: {
	          title: 'Profile'
	        }
	      },
	      {
	        path: 'profile',
	        canActivate: [AuthGuard],
	        component: AccountComponent,
	        data: {
	          title: 'Profile'
	        }
	      },
	      {
	        path: 'settings',
	        canActivate: [AuthGuard],
	        component: AccountComponent,
	        data: {
	          title: 'Settings'
	        }
	      },
	      {
	        path: 'security',
	        canActivate: [AuthGuard],
	        component: AccountComponent,
	        data: {
	          title: 'Security Questions'
	        }
	      },
	      
	      {
	        path: 'password',
	        canActivate: [AuthGuard],
	        component: AccountComponent,
	        data: {
	          title: 'Change Password'
	        }
	      }
 
	    ]
  	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}