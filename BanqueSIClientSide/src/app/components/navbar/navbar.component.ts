import { Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from '../service/authenticate.service';
import {EmailService} from '../service/email.service';
import { Location } from '@angular/common';
import {AngularFireDatabase} from 'angularfire2/database';

import { Notification } from './Notification';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {

  //--ATTRIBUTS
  Employe = {codePersonne : null,agence: {codeAgence:0}};
  nbrMsgs = 0;
  EmailStat = {};
  notif = [];
  nbrNotif = 0;
  notifCol: AngularFirestoreCollection<Notification>;
  notifications: Observable<Notification[]>;
  
  //-- END ATTRIBUTS

  //-- CONSTRUCTOR && INJECTING SERVICES 
  constructor (private authService: AuthenticateService,
               private router : Router,
               private emailService : EmailService,
               private firebase:AngularFireDatabase,
               private afs: AngularFirestore
              ){
  
  
  }
  //-- END CONSTRUCTOR && INJECTING SERVICES 

  //-- INITIALIZING EMPLOYE DATA
 

  ngOnInit() {

    this.authService.getUsernameInfo$().subscribe(
        res => {
          this.authService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;
                  this.GetEmailStat();
                  this.GetNotification();
                  this.GetNbrMsg();
                  this.GetNbrNotifications();
                  this.notifCol = this.afs.collection('notification', ref => ref.where('idAgence', '==',this.Employe.agence.codeAgence).where('typeNotification','==','Admin').orderBy('date'));
                  this.notifications = this.notifCol.valueChanges();
              }
          );
        });
  }
  //-- END INITIALIZING EMPLOYE DATA
  GetNotification(){
      this.notif = JSON.parse(localStorage.getItem("notif"));
      //console.log(this.notif);
  }

  GetNbrMsg(){
    this.afs.collection("message").valueChanges().subscribe(
       values => this.nbrMsgs = values.length
    );
  }

  GetNbrNotifications(){
    this.afs.collection("notification",ref => ref.where('idAgence', '==',this.Employe.agence.codeAgence).where('typeNotification','==','Admin').orderBy('date')).valueChanges().subscribe(
       values => this.nbrNotif = values.length
    );
  }

  GetEmailStat(){
    this.emailService.GetStatisticalMail(this.Employe.codePersonne).subscribe(
      res => {
        this.EmailStat = res;
      }
    )
  }

  //-- LOGOUT FUNCTION
  public logout(){
    this.authService.SetStat(this.Employe.codePersonne,false).subscribe(
      resp => {
          console.log(resp);      
      }
  );
    sessionStorage.clear();
    this.router.navigate([""]);
  }

  reloadRoute(){
    window.location.reload();
  }
  //-- END LOGOUT FUNCTION
}
