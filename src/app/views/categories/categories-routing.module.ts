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
      		title: 'Account'
    	},
    	children:[
	      {
	        path: '',
	        canActivate: [AuthGuard],
	        component: ListComponent,
	        data: {
	          title: 'Gadgets'
	        }
	      },
	      {
	        path: 'list',
	        canActivate: [AuthGuard],
	        component: ListComponent,
	        data: {
	          title: 'Manage Gadgets'
	        }
	      },
	      {
	        path: 'new',
	        canActivate: [AuthGuard],
	        component: AddComponent,
	        data: {
	          title: 'Register a Gadget'
	        }
	      },
	      {
	        path: 'edit/:uid',
	        canActivate: [AuthGuard],
	        component: EditComponent,
	        data: {
	          title: 'Manage Gadget'
	        }
	      }

	    ]
  	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}