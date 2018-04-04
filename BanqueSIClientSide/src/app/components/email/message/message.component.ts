import { Component,OnInit,ViewContainerRef } from '@angular/core';
import {AuthenticateService} from '../../service/authenticate.service';
import {EmailService} from '../../service/email.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import * as _ from 'underscore';
import {ActivatedRoute} from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router} from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'message',
  templateUrl: 'message.component.html'
})
export class MessageComponent implements OnInit {

    //-- ATTRIBUTS
    Employe = {codePersonne : null,email:null,agence: {codeAgence:0}};
    Email = {From: null,To:null,ObjectEmail:null,MessageEmail:null,CodePersonne:null};
    dateEmail: string;
    from:string;
    messageEmail:string;
    nomPersonne:string;
    objectEmail:string;
    to:string;
    username:string;
    idEmail:number;
    deleted:true;
    //-- END ATTRIBUTS

    //-- CONSTRUCTOR && INJECTING SERVICES 
    constructor(
        private authService: AuthenticateService,
        private emailService : EmailService,
        private spinnerService: Ng4LoadingSpinnerService,
        private modal: Modal,
        private route: ActivatedRoute,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private router: Router
    ){
        this.toastr.setRootViewContainerRef(vcr);
        //this.spinnerService.show();
     }
  //-- END CONSTRUCTOR && INJECTING SERVICES 

  //-- METHODES
  //-- INITIALIZING FUNCTIONS
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.dateEmail = params["dateEmail"];
        this.from = params["from"];
        this.messageEmail = params["messageEmail"];
        this.nomPersonne = params["nomPersonne"];
        this.objectEmail = params["objectEmail"];
        this.to = params["to"];
        this.username = params["username"];
        this.idEmail = params["IdEmail"];
        this.deleted = params["deleted"];
    });

    this.authService.getUsernameInfo$().subscribe(
        res => {
          this.authService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;
              }
          );
    });
  }
  //-- END INITIALIZING FUNCTIONS
  SentEmail(){
    this.Email.CodePersonne = this.Employe.codePersonne;
    this.Email.From = this.Employe.email;
    this.Email.To = this.from;
    this.Email.ObjectEmail = "Re : "+this.objectEmail;
    
    this.emailService.SentEmail(this.Email).subscribe(
        data => {
                this.showValid("Email Sent Successfully");
        }
    )
  }
  deleteToTrash(){
    this.emailService.DeleteEmailSpam(this.idEmail).subscribe(
        res => {
            this.showValid(res.messageResult);
        });
  }
  GoBack(){
    this.router.navigate(['stb/email/inbox']);
  }

    //-- CONTROLLING
    showError(msg) {
        this.toastr.error(msg, "Error Message");
      }
    
      showValid(msg) {
        this.toastr.success(msg, 'Confirming message!');
      }
      //-- END CONTROLLING
  //-- END METHODES
}