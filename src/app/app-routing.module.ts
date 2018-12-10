import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import {AuthGuard} from './_services/auth.guard';

const routes: Routes = [{
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        component: SimpleLayoutComponent,
        children: [{
            path: 'user',
            loadChildren: './views/user/user.module#UserModule'
        }]
    },

    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'dashboard',
            loadChildren: './views/dashboard/dashboard.module#DashboardModule'
        }]
    },
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'contact',
            loadChildren: './views/contact/contact.module#ContactModule'
        }]
    },
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'account',
            loadChildren: './views/account/account.module#AccountModule'
        }]
    },
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'users',
            loadChildren: './views/users/users.module#UsersModule'
        }]
    },
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'items',
            loadChildren: './views/items/items.module#ItemsModule'
        }]
    },
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'categories',
            loadChildren: './views/categories/categories.module#CategoriesModule'
        }]
    },
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'locations',
            loadChildren: './views/locations/locations.module#LocationsModule'
        }]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}