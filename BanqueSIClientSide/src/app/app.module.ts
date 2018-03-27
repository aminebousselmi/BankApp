import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CompteService} from './components/service/compte.service';
import {EmailService} from './components/service/email.service';
import {OperationService} from './components/service/operation.service';
import {DashboardService} from './components/service/dashboard.service';
import {OperationComponent} from './components/operation/operation.component';
import {ChequeComponent} from './components/cheque/cheque.component';
import {ChangeComponent} from './components/change/change.component';
import { AuthenticateService } from './components/service/authenticate.service';
import {EmailComponent} from './components/email/email.component';
import { ChequeService } from './components/service/cheque.service';
import { ChangeService } from './components/service/change.service';
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
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    OperationComponent,
    ChequeComponent,
    ChangeComponent,
    EmailComponent,
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
    BootstrapModalModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    AmChartsModule
  ],
  
  providers: [
    appRoutingProviders,
    JwtHelper,
    CompteService,
    NgIf,
    OperationService,
    NgForOf,
    AuthenticateService,
    DashboardService,
    ChequeService,
    ChangeService,
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
