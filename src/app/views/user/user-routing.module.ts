import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { QuestionsComponent } from './questions.component';
const routes: Routes = [{
    path: '',
    data: {
        title: 'User'
    },
    children: [{
            path: '',
            component: UserComponent,
            data: {
                title: 'Login'
            }
        },
        {
            path: 'forgot-password',
            component: UserComponent,
            data: {
                title: 'Forgot Password'
            }
        },
        {
            path: 'login',
            component: UserComponent,
            data: {
                title: 'Login'
            }
        },        
        {
            path: 'register',
            component: UserComponent,
            data: {
                title: 'Register'
            }
        },
        {
            path: 'questions',
            component: QuestionsComponent,
            data: {
              title: 'Answer Questions'
            }
          }
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}