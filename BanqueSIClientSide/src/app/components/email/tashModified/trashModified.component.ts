import { Component,OnInit,ViewContainerRef } from '@angular/core';
import {AuthenticateService} from '../../service/authenticate.service';
import {EmailService} from '../../service/email.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import * as _ from 'underscore';
import {ActivatedRoute} from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router,NavigationExtras} from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'trashModified',
  templateUrl: 'trashModified.component.html'
})
export class TrashModifiedComponent implements OnInit {

    //-- ATTRIBUTS
    Employe = {codePersonne : null,username:null,agence: {codeAgence:0}};
    Email = {From: null,IdEmail:0,To:null,ObjectEmail:null,DateEmail:null,MessageEmail:null,CodePersonne:null};
    nomPersonne:null;
    //-- END ATTRIBUTS

    //-- CONSTRUCTOR && INJECTING SERVICES 
    constructor(
        private authService: AuthenticateService,
        private emailService : EmailService,
        private spinnerService: Ng4LoadingSpinnerService,
        private modal: Modal,
        private router: Router,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private route: ActivatedRoute
    ){
        this.toastr.setRootViewContainerRef(vcr);
        //this.spinnerService.show();
     }
    //-- END CONSTRUCTOR && INJECTING SERVICES 

    //-- METHODES

    //-- INITIALIZING FUNCTIONS
    ngOnInit() {
    this.authService.getUsernameInfo$().subscribe(
        res => {
          this.authService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;  
              }
          );
        });

        this.route.queryParams.subscribe(params => {
            this.Email.DateEmail = params["dateEmail"];
            this.Email.From = params["from"];
            this.Email.MessageEmail = params["messageEmail"];
            this.nomPersonne = params["nomPersonne"];
            this.Email.ObjectEmail = params["objectEmail"];
            this.Email.To = params["to"];
            this.Email.IdEmail = params["IdEmail"];
        });
    }

    //-- END INITIALIZING FUNCTIONS

    SentEmail(){
        this.Email.CodePersonne = this.Employe.codePersonne;
        console.log(this.Email);
        this.emailService.SendingDraftEmail(this.Email).subscribe(
          data => {
                this.showValid("Email Sent Successfully");
          }
        ) 
    }

     //-- CONTROLLING
    showError(msg) {
        this.toastr.error(msg, "Error Message");
    }

    showValid(msg) {
        this.toastr.success(msg, 'Confirming message!');
    }
    //-- END CONTROLLING

}