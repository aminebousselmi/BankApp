import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {OperationComponent} from './components/operation/operation.component';
import { AuthenticateService } from './components/service/authenticate.service';
const  appRoutes: Routes = [
    {
        path:'',
        component: LoginComponent
    },

    {
        path: 'stb',
        component:NavbarComponent,
        canActivate: [AuthenticateService],
        children: [
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate: [AuthenticateService]
   
            },
            {
                path:'operation',
                component:OperationComponent,
                canActivate: [AuthenticateService]
   
            }
        ]
    }

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);