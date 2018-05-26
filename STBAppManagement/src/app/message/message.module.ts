import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { MessageRoutes } from './message.routing';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    QuillModule,
    DragulaModule,
    RouterModule.forChild(MessageRoutes)
  ],
  declarations: [
    MessageComponent
  ]
})

export class MessageModule {}