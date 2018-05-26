import { Component,ViewContainerRef, OnInit,AfterViewInit } from '@angular/core';
import {AuthenticateService} from '../service/authenticate.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {AngularFireDatabase} from 'angularfire2/database';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Message } from './message';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'chat',
  templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit{

  //-- ATTRIBUTS
  Employe : {codePersonne : null,username:null,agence: {codeAgence:0}};
  imageURL : string = "/assets/img/amine.png";
  messageContent = null;
  messages: Message[];
  messageCol: AngularFirestoreCollection<Message>;
  messagess: Observable<Message[]>;
  //-- END ATTRIBUTS

  //-- CONSTRUCTOR
  constructor(
    private authService : AuthenticateService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private modal: Modal,
    private firebase:AngularFireDatabase,
    private spinnerService: Ng4LoadingSpinnerService,
    private afs: AngularFirestore
    
  ) {
    
    this.toastr.setRootViewContainerRef(vcr);
    this.spinnerService.show();
  }
  //-- END CONSTRUCTOR
  
  //-- METHODES

    ngOnInit() {
        this.authService.getUsernameInfo$().subscribe(
            res => {
            this.authService.getUserInfo$(res.data.userName).subscribe(
                resp => {
                    this.Employe = resp;
                    this.messageCol = this.afs.collection('message', ref => ref.where('idAgence', '==',this.Employe.agence.codeAgence).orderBy('data'));
                    this.messagess = this.messageCol.valueChanges();
                    this.GetDataMessage(this.Employe.agence.codeAgence);
                    this.spinnerService.hide();
                }
            );
            }
        );  
    }

    GetDataMessage(idA){
          this.messageCol = this.afs.collection('message', ref => ref.where('idAgence', '==',idA).orderBy('data'));
        
      }

    SentMessage(){
        var dateN = new Date(); 
        var dateString = dateN.getUTCHours()+':'+dateN.getUTCMinutes()+':'+dateN.getUTCSeconds();
    
        //-- PUSHING DATA INTO FIREBASE
        this.afs.collection('message').add({'data': dateString,'msg':this.messageContent, 'idAgence': this.Employe.agence.codeAgence,'sentBy':this.Employe.username});
        this.GetDataMessage(this.Employe.agence.codeAgence);
        //-- END PUSHING DATA INTO FIREBASE
    }


}