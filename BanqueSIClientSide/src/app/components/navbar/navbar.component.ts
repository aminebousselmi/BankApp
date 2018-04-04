import { Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from '../service/authenticate.service';
import {EmailService} from '../service/email.service';
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {

  //--ATTRIBUTS
  Employe = {codePersonne : null,agence: {codeAgence:0}};
  EmailStat = {};
  //-- END ATTRIBUTS

  //-- CONSTRUCTOR && INJECTING SERVICES 
  constructor (private authService: AuthenticateService,
               private router : Router,
               private emailService : EmailService
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
              }
          );
        });
  }
  //-- END INITIALIZING EMPLOYE DATA
 

  GetEmailStat(){
    this.emailService.GetStatisticalMail(this.Employe.codePersonne).subscribe(
      res => {
        this.EmailStat = res;
      }
    )
  }

  //-- LOGOUT FUNCTION
  public logout(){
    sessionStorage.clear();
    this.router.navigate([""]);
  }

  //-- END LOGOUT FUNCTION
}
