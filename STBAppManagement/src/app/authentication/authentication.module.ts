import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';


import { AuthenticationRoutes } from './authentication.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

@NgModule({
  imports: [ 
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent
  ],
  providers: [
    JwtHelper
  ]
})

export class AuthenticationModule {}
