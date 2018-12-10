import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_services/auth.guard';

import { AddComponent } from './add.component';
import { EditComponent } from './edit.component';
import { ListComponent } from './list.component';

const routes: Routes = [
  	{
    	path: '',
    	data: {
      		title: 'Locations'
    	},
    	children:[
	      {
	        path: '',
	        canActivate: [AuthGuard],
	        component: ListComponent,
	        data: {
	          title: 'Locations'
	        }
	      },
	      {
	        path: 'list',
	        canActivate: [AuthGuard],
	        component: ListComponent,
	        data: {
	          title: 'Manage Locations'
	        }
	      },
	      {
	        path: 'new',
	        canActivate: [AuthGuard],
	        component: AddComponent,
	        data: {
	          title: 'Create Location'
	        }
	      },
	      {
	        path: 'edit/:uid',
	        canActivate: [AuthGuard],
	        component: EditComponent,
	        data: {
	          title: 'Manage Location'
	        }
	      }

	    ]
  	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {}