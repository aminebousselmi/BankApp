import { Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeComponent } from './employe/employe.component';
import { NormalOperationComponent } from './NormalOperations/normalOperation.component';
import { CurrencyComponent } from './currency/currency.component';
import { CheckComponent } from './check/check.component';

export const ManageAgencyRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'normalOperation',
      component: NormalOperationComponent
    },
    {
      path: 'currency',
      component: CurrencyComponent
    },
    {
      path: 'check',
      component: CheckComponent
    },
    {
      path: 'account',
      component: AccountComponent,
    },
    {
      path: 'Customer',
      component: CustomerComponent
    },
    {
      path: 'Employee',
      component: EmployeComponent
    }
  ]
  }
];
