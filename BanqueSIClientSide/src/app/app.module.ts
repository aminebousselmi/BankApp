import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgIf } from '@angular/common';
import {NgForOf} from '@angular/common';
import {routing, appRoutingProviders} from './app.routing';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {chart} from 'chart.js';
import { JwtHelper } from 'angular2-jwt';
import {DataTableModule} from "angular2-datatable";
import {DataFilterPipe} from './components/filter/data-filter-pipe';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { CKEditorModule } from 'ng2-ckeditor';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import {OperationService} from './components/service/operation.service';
import {DashboardService} from './components/service/dashboard.service';
import { AuthenticateService } from './components/service/authenticate.service';
import { ChequeService } from './components/service/cheque.service';
import { ChangeService } from './components/service/change.service';
import {CompteService} from './components/service/compte.service';
import {EmailService} from './components/service/email.service';
import {ProfileService} from './components/service/profile.service';
import {TaskService} from './components/service/task.service';

import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {OperationComponent} from './components/operation/operation.component';
import {ChequeComponent} from './components/cheque/cheque.component';
import {ChangeComponent} from './components/change/change.component';
import {EmailComponent} from './components/email/email.component';
import {InboxComponent} from './components/email/inbox/inbox.component';
import {TacheComponent} from './components/tache/tache.component';
import {SentComponent} from './components/email/sent/sent.component';
import { MessageComponent} from './components/email/message/message.component';
import {DraftComponent} from './components/email/draft/draft.component';
import {DeletedComponent} from './components/email/deleted/deleted.component';
import {TrashComponent} from './components/email/trash/trash.component';
import {TrashModifiedComponent} from './components/email/tashModified/trashModified.component';
import {DeletedModifiedComponent} from './components/email/deletedModified/deletedModified.component';
import {ProfileComponent} from './components/profile/profile.component';
import { SpinnerComponent } from './components/filter/spinner.component';
import {ChatComponent} from './components/chat/chat.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    OperationComponent,
    ChequeComponent,
    ChangeComponent,
    EmailComponent,
    InboxComponent,
    SentComponent,
    MessageComponent,
    DraftComponent,
    DeletedComponent,
    TrashComponent,
    TrashModifiedComponent,
    DeletedModifiedComponent,
    TacheComponent,
    ProfileComponent,
    ChatComponent,
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
    AmChartsModule,
    CKEditorModule,
    GooglePlaceModule,
    AngularFirestoreModule
  ],
  
  providers: [
    appRoutingProviders,
    JwtHelper,
    NgIf,
    NgForOf,
    AuthenticateService,
    OperationService,
    DashboardService,
    CompteService,
    ChequeService,
    ChangeService,
    EmailService,
    ProfileService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
