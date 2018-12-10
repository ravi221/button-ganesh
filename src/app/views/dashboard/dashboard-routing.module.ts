import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../_services/auth.guard';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  	{
    	path: '',
    	data: {
      		title: 'Dashboard'
    	},
    	children:[
	      {
	        path: '',
	        canActivate: [AuthGuard],
	        component: DashboardComponent,
	        data: {
	          title: 'At a Glance'
	        }
	      },
	      {
	        path: 'list',
	        canActivate: [AuthGuard],
	        component: DashboardComponent,
	        data: {
	          title: 'List'
	        }
	      }
	    ]
  	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
