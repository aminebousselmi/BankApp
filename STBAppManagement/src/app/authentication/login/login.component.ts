import { Component, OnInit, AfterViewInit,OnDestroy,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

    //-- ATTRIBUTS
    private userName: string;
    private password: string;
    private postStream$: Subscription;
    //-- END ATTRIBUTS

    constructor(public router: Router,
                private authenticateService: AuthenticateService, 
                private vcr: ViewContainerRef,
                public toastr: ToastsManager
                ) {
                    this.toastr.setRootViewContainerRef(vcr);
                }
    
    //-- LOGIN FUNCTION
    login() {
        if (this.postStream$) { this.postStream$.unsubscribe }

        this.postStream$ = this.authenticateService.login$(this.userName,this.password).subscribe(
            result => {
                if (result.state == 1) {
                    this.showInfo("login successfully");
            
                } else {
                  this.showError("login failed");
                }
            }
        )
    }
    //-- END LOGIN FUNCTION

      //-- DESTROYING DATA SESSIONS
      ngOnDestroy() {
        if(this.postStream$){this.postStream$.unsubscribe()}
   }
   //-- END DESTROYING DATA SESSIONS

    ngOnInit() {}

    ngAfterViewInit() {
        $(function() {
            $(".preloader").fadeOut();
        });
        $(function() {
            (<any>$('[data-toggle="tooltip"]')).tooltip()
        });
        $('#to-recover').on("click", function() {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });
    }

    showInfo(msg) {
        this.toastr.info(msg);
    }
    showError(msg) {
        this.toastr.error(msg,'Information !');
      }
}
