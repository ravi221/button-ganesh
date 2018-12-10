import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_services/auth.guard';

import { EditComponent } from './edit.component';
import { ListComponent } from './list.component';

const routes: Routes = [
  	{
    	path: '',
    	data: {
      		title: 'Users'
    	},
    	children:[
	      {
	        path: '',
	        canActivate: [AuthGuard],
	        component: ListComponent,
	        data: {
	          title: 'Users'
	        }
	      },
	      {
	        path: 'list',
	        canActivate: [AuthGuard],
	        component: ListComponent,
	        data: {
	          title: 'Manage Users'
	        }
	      },
	      {
	        path: 'edit/:uid',
	        canActivate: [AuthGuard],
	        component: EditComponent,
	        data: {
	          title: 'Manage User'
	        }
	      }

	    ]
  	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}