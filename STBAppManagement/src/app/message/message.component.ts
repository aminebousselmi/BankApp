import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { Message } from './message';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthenticateService} from '../services/authenticate.service';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-email',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MessageComponent implements OnInit  {
  closeResult: string;
  messages: Message[];
  selectedMessage: Message;
  messageOpen = false;
  messageContent = null;
  messageCol: AngularFirestoreCollection<Message>;
  messagess: Observable<Message[]>;

  Employe : {codePersonne : null,username:null,agence: {codeAgence:0}};
  constructor(
              private modalService: NgbModal,
              private firebase:AngularFireDatabase,
              private authService:AuthenticateService,
              private afs: AngularFirestore
              ) {}

  ngOnInit(): void {
    this.authService.getUsernameInfo$().subscribe(
      res => {
        this.authService.getUserInfo$(res.data.userName).subscribe(
            resp => {
                this.Employe = resp;
                this.messageCol = this.afs.collection('message', ref => ref.where('idAgence', '==',this.Employe.agence.codeAgence).orderBy('data','desc'));
                this.messagess = this.messageCol.valueChanges();
                this.GetDataMessage(this.Employe.agence.codeAgence);
            }
        );
      });
  }
  SentMessage(){
    var dateN = new Date(); 
    var dateString = dateN.getUTCHours()+':'+dateN.getUTCMinutes()+':'+dateN.getUTCSeconds();

     //-- PUSHING DATA INTO FIREBASE
      this.afs.collection('message').add({'data': dateString,'msg':this.messageContent, 'idAgence': this.Employe.agence.codeAgence,'sentBy':this.Employe.username});
      this.GetDataMessage(this.Employe.agence.codeAgence);
    //-- END PUSHING DATA INTO FIREBASE
  }

  GetDataMessage(idA){
      this.messageCol = this.afs.collection('message', ref => ref.where('idAgence', '==',idA).orderBy('data','desc'));
  }
  onSelect(message: Message): void {
    this.selectedMessage = message;
  }
  
  
 
  // This is for the email compose 
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
    
}
