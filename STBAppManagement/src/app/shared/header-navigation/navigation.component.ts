import { Component, AfterViewInit,OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar'; 
import {SidebarService} from '../../services/sidebar.service';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
declare var $: any;

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NotificationChange } from './NotificationChange';
import { NotificationCheque } from './NotificationCheque';
import { NotificationOperation } from './NotificationOperation';
import { NotificationOperationVI } from './NotificationOpVirement';
import { NotificationTask } from './NotificationTask';
import { NotificationOperationR} from './NotificationOpWithd';

@Component({
  selector: 'ap-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit,OnInit {
  name:string;
  Employe : {codePersonne : null,agence: {codeAgence:0}};

  NotCheckCol: AngularFirestoreCollection<NotificationCheque>;
  checks: Observable<NotificationCheque[]>;

  NotCurrCol: AngularFirestoreCollection<NotificationChange>;
  Currencys: Observable<NotificationChange[]>;

  operationsCol: AngularFirestoreCollection<NotificationOperation>;
  operations: Observable<NotificationOperation[]>;

  operationsVICol: AngularFirestoreCollection<NotificationOperationVI>;
  operationsVIs: Observable<NotificationOperationVI[]>;

  taskssCol: AngularFirestoreCollection<NotificationTask>;
  taskss: Observable<NotificationTask[]>;

  operationRCol: AngularFirestoreCollection<NotificationOperationR>;
  operationsR : Observable<NotificationOperationR[]>;

  	public config: PerfectScrollbarConfigInterface = {};
    constructor(private modalService: NgbModal,
                private sideService:SidebarService,
                private router : Router,
                private firebase:AngularFireDatabase,
                private afs: AngularFirestore
               ) {
    	
    }

      
    ngAfterViewInit() {
        
        var set = function() {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 0;
            if (width < 1170) {
                $("#main-wrapper").addClass("mini-sidebar");
            } else {
                $("#main-wrapper").removeClass("mini-sidebar");
            }
        };
        $(window).ready(set);
        $(window).on("resize", set);

        
        $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
            $(".app-search").toggle(200);
        });
        
        
        $("body").trigger("resize");
    }

    ngOnInit(){
      this.sideService.getUsernameInfo$().subscribe(
        res => {
          this.sideService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;
                  this.GetNotification();
              }
          );
        });
    }

  GetNotification(){
      this.NotCheckCol = this.afs.collection('notification', ref => ref
                                                                      .where('idAgence', '==',this.Employe.agence.codeAgence)
                                                                      .where('typeNotification', '==','EMPLOYE')
                                                                      .where('typeOperation','==','PaymentCheck')
                                                                      .orderBy('date'));
      this.checks = this.NotCheckCol.valueChanges();

      this.NotCurrCol = this.afs.collection('notification', ref => ref
                                                                      .where('idAgence', '==',this.Employe.agence.codeAgence)
                                                                      .where('typeNotification', '==','EMPLOYE')
                                                                      .where('typeOperation','==','Change')
                                                                      .orderBy('date'));
      this.Currencys = this.NotCurrCol.valueChanges();

      this.taskssCol = this.afs.collection('notification', ref => ref
                                                                      .where('idAgence', '==',this.Employe.agence.codeAgence)
                                                                      .where('typeNotification', '==','EMPLOYE')
                                                                      .where('typeOperation','==','Task')
                                                                      .orderBy('date'));
      this.taskss = this.taskssCol.valueChanges();

      this.operationsCol = this.afs.collection('notification', ref => ref
                                                                    .where('idAgence', '==',this.Employe.agence.codeAgence)
                                                                    .where('typeNotification', '==','EMPLOYE')
                                                                    .where('typeOperation','==','Payment')
                                                                    .orderBy('date'));
      this.operations = this.operationsCol.valueChanges();

      this.operationRCol = this.afs.collection('notification', ref => ref
                                                                    .where('idAgence', '==',this.Employe.agence.codeAgence)
                                                                    .where('typeNotification', '==','EMPLOYE')
                                                                    .where('typeOperation','==','Withdrawal')
                                                                    .orderBy('date'));
      this.operationsR = this.operationRCol.valueChanges();

      this.operationsVICol = this.afs.collection('notification', ref => ref
                                                                    .where('idAgence', '==',this.Employe.agence.codeAgence)
                                                                    .where('typeNotification', '==','EMPLOYE')
                                                                    .where('typeOperation','==','Transfer')
                                                                    .orderBy('date'));
      this.operationsVIs = this.operationsVICol.valueChanges();
  }
 
  //-- LOGOUT FUNCTION
  public logout(){
    sessionStorage.clear();
    this.router.navigate([""]);
  }

}
