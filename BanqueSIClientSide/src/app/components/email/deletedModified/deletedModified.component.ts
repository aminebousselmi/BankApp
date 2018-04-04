import { Component,OnInit,ViewContainerRef} from '@angular/core';
import {AuthenticateService} from '../../service/authenticate.service';
import {EmailService} from '../../service/email.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import * as _ from 'underscore';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router} from '@angular/router';
import {ActivatedRoute} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: 'deletedModified',
  templateUrl: 'deletedModified.component.html'
})
export class DeletedModifiedComponent implements OnInit {

    //-- ATTRIBUTS
    Employe = {codePersonne : null,agence: {codeAgence:0}};
    EmailStat = {};
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
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private route: ActivatedRoute,
        private router: Router
    ){
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
  
  delete(){
    this.emailService.DeleteEmail(this.idEmail).subscribe(
        res => {
            this.showValid(res.messageResult);
            this.router.navigate(['stb/email/deleted']);
        });
  }

  GoBack(){
    this.router.navigate(['stb/email/deleted']);
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