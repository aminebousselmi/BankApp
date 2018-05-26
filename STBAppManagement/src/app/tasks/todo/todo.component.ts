import { Component, ViewContainerRef, ChangeDetectionStrategy, Inject, ViewChild, TemplateRef  } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {AuthenticateService} from '../../services/authenticate.service';
import { DOCUMENT } from '@angular/platform-browser';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import {TaskBoardService} from '../../services/taskBoard.service';
import {AngularFireDatabase} from 'angularfire2/database';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  closeResult: string;
  priorities = ['Hight', 'Normal', 'Low'];
  Employe : {codePersonne : null,agence: {codeAgence:0}};
  ListEmployes  = [];
  GetArrayBackLog = [];
  GetArrayTODO = [];
  GetArrayINPROCESS = [];
  GetArrayDONE = [];
  Activated = false;
  Task = {Title: '', Content: '',DateStart:'',DateEnd:'', Priority: this.priorities[0],idEmploye:0,idChefAgence:0};

  constructor(public toastr: ToastsManager,
            @Inject(DOCUMENT) doc: any,
             vcr: ViewContainerRef,
             private dragulaService: DragulaService,
             private modalService: NgbModal,
             private taskService: TaskBoardService,
             private authService:AuthenticateService,
             private firebase:AngularFireDatabase,
             private afs: AngularFirestore
            ) {
         this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.authService.getUsernameInfo$().subscribe(
      res => {
        this.authService.getUserInfo$(res.data.userName).subscribe(
            resp => {
                this.Employe = resp;
                this.taskService.GetListEmploye(this.Employe.agence.codeAgence).subscribe(
                  resp => {
                   
                      for (var i = 0 ;i < resp.length ; i++){
                        var Emp = {codePersonne : 2, username : "test"};
                        Emp.codePersonne = resp[i].codePersonne;
                        Emp.username = resp[i].username;
                        this.ListEmployes.push(Emp);
                        this.BackLogList();
                        this.ToDoList();
                        this.InProcessList();
                        this.DoneList();
                      }
                  }
              );
            }
        );
      });

    this.dragulaService
      .drag
      .subscribe(value => {
        //console.log((value[1].innerText).substring(10,11));
        //console.log(value[1].parentElement.parentElement.getElementsByTagName("h6")[0].innerHTML);
        if(value[1].parentElement.parentElement.getElementsByTagName("h6")[0].innerHTML == "Backlog"){
            this.Activated = true;
            console.log(this.Activated);
        }else{this.Activated == false;}
      });

    this.dragulaService
      .drop
      .subscribe(value => {
        //console.log(value[1].parentElement.parentElement.getElementsByTagName("h6")[0].innerHTML);
        var DmEl = value[1].innerText;
        var result = '';
        for(var i = 0 ; i< 10 ; i++){
            if(!isNaN(DmEl[i])){
                result += DmEl[i];
            }
         
        }
        //console.log(document.getElementById("usernameTsk").innerHTML);
        this.taskService.ChangeEtat(result,value[1].parentElement.parentElement.getElementsByTagName("h6")[0].innerHTML).subscribe(
          resp => {
            if(this.Activated == true && value[1].parentElement.parentElement.getElementsByTagName("h6")[0].innerHTML == "ToDo"){
                //-- PUSHING DATA INTO FIREBASE
                var dateN = new Date(); 
                var dateString = dateN.getUTCHours()+':'+dateN.getUTCMinutes()+':'+dateN.getUTCSeconds();
                this.afs.collection('notification').add({'msg':value[1].innerText,'typeNotification':"Admin", 'idAgence': this.Employe.agence.codeAgence,'date':dateString});
                //-- END PUSHING DATA INTO FIREBASE
                this.Activated = false;
            }
            this.showInfo("Task State Changed To "+value[1].parentElement.parentElement.getElementsByTagName("h6")[0].innerHTML);
          }
        );
        setTimeout(() => {
        console.log("");
        }, 1000);
      });
  }

  open2(content) { 
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  TaskAdd(){
      this.taskService.AddTask({TaskTitle: this.Task.Title, TaskContent: this.Task.Content,DateDebut:this.Task.DateStart,DateFin:this.Task.DateEnd, Priority: this.Task.Priority,idChefAgence:this.Employe.codePersonne,idEmploye:this.Task.idEmploye}).subscribe(
        resp => {
          this.showInfo("Task Add Successfully");
          this.BackLogList();
        }
    );
  }

  BackLogList(){
    this.taskService.GetListBackLog(this.Employe.codePersonne).subscribe(
      resp => {
          this.GetArrayBackLog = resp;
      }
    );
  }

  ToDoList(){
    this.taskService.GetListTODO(this.Employe.codePersonne).subscribe(
      resp => {
          this.GetArrayTODO = resp;
      }
    );
  }

  InProcessList(){
    this.taskService.GetListINPROCESS(this.Employe.codePersonne).subscribe(
      resp => {
          this.GetArrayINPROCESS = resp;
      }
    );
  }

  DoneList(){
    this.taskService.GetListDONE(this.Employe.codePersonne).subscribe(
      resp => {
          this.GetArrayDONE = resp;
      }
    );
  }

  showInfo(msg) {
    this.toastr.info(msg);
  }
  showError(msg) {
    this.toastr.error(msg,'Information !');
  }

}