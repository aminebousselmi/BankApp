import { Routes } from '@angular/router';

import { Dashboard3Component } from './dashboard3/dashboard3.component';
import {AuthenticateService} from '../services/authenticate.service';
export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'dashboard',
      component: Dashboard3Component,
      data: {
        title: 'Analytical Dashboard',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Analytical Dashboard'}]
      }
    }]
  }
];
