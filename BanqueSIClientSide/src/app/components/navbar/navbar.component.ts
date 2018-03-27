import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateService} from '../service/authenticate.service';
import { Location } from '@angular/common';
declare var jquery:any;
declare var $ :any;

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {

  //--ATTRIBUTS
  Employe : {nomPersonne:null};
  //-- END ATTRIBUTS

  //-- CONSTRUCTOR && INJECTING SERVICES 
  constructor (private authService: AuthenticateService,
               private router : Router
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
              }
          );
        });
  }
  //-- END INITIALIZING EMPLOYE DATA

  //-- LOGOUT FUNCTION
  public logout(){
    sessionStorage.clear();
    this.router.navigate([""]);
  }

  public reload(){
    location.reload();
  }
  //-- END LOGOUT FUNCTION
}
