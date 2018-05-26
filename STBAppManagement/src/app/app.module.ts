import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr/ng2-toastr'; 
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NgIf } from '@angular/common';
import {NgForOf} from '@angular/common';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {CurrencyService} from './services/currency.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import {AuthenticateService} from './services/authenticate.service';
import {SidebarService} from './services/sidebar.service';
import {CheckService} from './services/check.service';
import {AccountService} from './services/account.service';
import {DashboardService} from './services/dashboard.service';
import {EmployeService} from './services/employe.service';
import {CustomerService} from './services/customer.service';
import {TaskBoardService} from './services/taskBoard.service';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,   
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),  
    ToastModule.forRoot(),
    PerfectScrollbarModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [
      {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  NgIf,
  NgForOf,
  AuthenticateService,
  JwtHelper,
  SidebarService,
  CurrencyService,
  CheckService,
  AccountService,
  DashboardService,
  EmployeService,
  CustomerService,
  TaskBoardService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
