import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { DragulaModule } from 'ng2-dragula';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { ToastModule } from 'ng2-toastr/ng2-toastr'; 

import { TodoRoutes } from './tasks.routing';
import { TodoComponent } from './todo/todo.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TodoRoutes),
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    DragulaModule,
    QuillModule,
    NgbModule,
    FileUploadModule,
    NgbModalModule
  ],
  declarations: [
    TodoComponent
  ]
})

export class TaskModule {}