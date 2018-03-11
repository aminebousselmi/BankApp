import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CompteService} from './components/service/compte.service';
import {OperationService} from './components/service/operation.service';
import {DashboardService} from './components/service/dashboard.service';
import {OperationComponent} from './components/operation/operation.component';
import { AuthenticateService } from './components/service/authenticate.service';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {chart} from 'chart.js';
import { JwtHelper } from 'angular2-jwt';
import { FormsModule } from '@angular/forms';
import {DataTableModule} from "angular2-datatable";
import {DataFilterPipe} from './components/filter/data-filter-pipe';
import { NgIf } from '@angular/common';
import {NgForOf} from '@angular/common';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    OperationComponent,
    DataFilterPipe
 
  ],

  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    BrowserAnimationsModule, 
    ToastModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule
    
  ],
  
  providers: [
    appRoutingProviders,
    JwtHelper,
    CompteService,
    NgIf,
    OperationService,
    NgForOf,
    AuthenticateService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
