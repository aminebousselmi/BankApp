import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import {AuthenticateService} from './services/authenticate.service';
export const routes: Routes = [
    {
        path: '',
        component: BlankComponent,
        children: [
            { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
            {
                path: 'authentication',
                loadChildren: './authentication/authentication.module#AuthenticationModule'
            }
        ]
    }, 
{
    path: '',
    component: FullComponent,
    children: [
        { path: 'dashboard', loadChildren: './dashboards/dashboard.module#DashboardModule',canActivate:[AuthenticateService] },
        { path: 'starter', loadChildren: './starter/starter.module#StarterModule',canActivate:[AuthenticateService] },
        { path: 'tasks', loadChildren: './tasks/tasks.module#TaskModule',canActivate:[AuthenticateService] },
        { path: 'manageAgency', loadChildren: './manageAgency/manageAgency.module#ManageAgencyModule',canActivate:[AuthenticateService] },
        { path: 'instant', loadChildren: './message/message.module#MessageModule',canActivate:[AuthenticateService] }
    ]
},
{
    path: '**',
    redirectTo: '' 
}];

@NgModule({
    imports: [RouterModule.forRoot(routes), NgbModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule { }

