import { Component,OnInit,ViewContainerRef } from '@angular/core';
import { Router,NavigationExtras} from '@angular/router';
import {AuthenticateService} from '../../service/authenticate.service';
import {EmailService} from '../../service/email.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  moduleId: module.id,
  selector: 'draft',
  templateUrl: 'draft.component.html'
})
export class DraftComponent implements OnInit {

    //--ATTRIBUTS
    Employe = {codePersonne : null,email:null,agence: {codeAgence:0}};
    Email = {From: null,To:null,ObjectEmail:null,MessageEmail:null,CodePersonne:null};
    //-- END ATTRIBUTS

    //-- CONSTRUCTOR && INJECTING SERVICES 
    constructor(
        private authService: AuthenticateService,
        private emailService : EmailService,
        private spinnerService: Ng4LoadingSpinnerService,
        private modal: Modal,
        private router: Router,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef
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
  }
  //-- END INITIALIZING FUNCTIONS

  SentEmail(){
      this.Email.CodePersonne = this.Employe.codePersonne;
      console.log(this.Email);
    this.emailService.SentEmail(this.Email).subscribe(
        data => {
              this.showValid("Email Sent Successfully");
        }
    )
  }
  
  DraftEmail(){
    this.Email.CodePersonne = this.Employe.codePersonne;
   
    this.emailService.DraftEmail(this.Email).subscribe(
      data => {
            console.log(data);
            this.showValid("Email Sent Successfullyn");
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
  //-- END METHODES
}