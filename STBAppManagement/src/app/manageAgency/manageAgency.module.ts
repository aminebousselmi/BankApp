import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import {NormalOperationService} from '../services/normalOperation.service';
import {AuthenticateService} from '../services/authenticate.service';
import { ManageAgencyRoutes } from './manageAgency.routing';
import { AccountComponent } from './account/account.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeComponent } from './employe/employe.component';
import { NormalOperationComponent } from './NormalOperations/normalOperation.component';
import { CurrencyComponent } from './currency/currency.component';
import { CheckComponent } from './check/check.component';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    QuillModule,
    DragulaModule,
    RouterModule.forChild(ManageAgencyRoutes),
    HttpModule,
    NgbModule,
    HttpClientModule,
    NgxDatatableModule,
    Ng2SmartTableModule
  ],
  declarations: [
    NormalOperationComponent,
    AccountComponent,
    CustomerComponent,
    EmployeComponent,
    CheckComponent,
    CurrencyComponent
  ],
  providers: [
    AuthenticateService,
    NormalOperationService,
    JwtHelper
  ]
})

export class ManageAgencyModule {}