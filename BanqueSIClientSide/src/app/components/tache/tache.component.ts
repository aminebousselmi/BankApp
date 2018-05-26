import { Component,OnInit,AfterViewInit} from '@angular/core';
import {Router,NavigationEnd} from '@angular/router';
import {AuthenticateService} from '../service/authenticate.service';
import {TaskService} from '../service/task.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {AngularFireDatabase} from 'angularfire2/database';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'task',
  templateUrl: 'tache.component.html'
})
export class TacheComponent implements OnInit {

  //--ATTRIBUTS
  Employe = {codePersonne : null,username:null,agence: {codeAgence:0}};
  ListTasks = [];
  //-- END ATTRIBUTS

  //-- CONSTRUCTOR && INJECTING SERVICES 
  constructor (private authService: AuthenticateService,
               private tskServide : TaskService,
               private router: Router,
               private spinnerService: Ng4LoadingSpinnerService,
               private firebase:AngularFireDatabase,
               private afs: AngularFirestore
              ){
                this.spinnerService.show();
  }
  //-- END CONSTRUCTOR && INJECTING SERVICES 

  //-- METHODES
  
  //-- INITIALIZING EMPLOYE DATA
  ngOnInit() {

    this.authService.getUsernameInfo$().subscribe(
        res => {
          this.authService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;
                  this. GetListTasks();
              }
          );
        });
  }
  /*async ngAfterViewInit() {
    await this.loadScript('../../../assets/js/plugins/jquery/jquery.min.js');
    await this.loadScript("../../../assets/js/plugins/jquery/jquery-ui.min.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap.min.js");
    await this.loadScript("../../../assets/js/plugins/icheck/icheck.min.js");
    await this.loadScript("../../../assets/js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js");
    await this.loadScript("../../../assets/js/plugins/smartwizard/jquery.smartWizard-2.0.min.js");
    await this.loadScript("../../../assets/js/plugins/scrolltotop/scrolltopcontrol.js");
    await this.loadScript("../../../assets/js/plugins/rickshaw/d3.v3.js");
    await this.loadScript("../../../assets/js/plugins/rickshaw/rickshaw.min.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap-datepicker.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap-timepicker.min.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap-colorpicker.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap-file-input.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap-select.js");
    await this.loadScript("../../../assets/js/plugins/tagsinput/jquery.tagsinput.min.js");
    await this.loadScript("../../../assets/js/plugins/owl/owl.carousel.min.js");
    await this.loadScript("../../../assets/js/plugins/knob/jquery.knob.min.js");
    await this.loadScript("../../../assets/js/plugins/moment.min.js");
    await this.loadScript("../../../assets/js/plugins/daterangepicker/daterangepicker.js");
    await this.loadScript("../../../assets/js/plugins/summernote/summernote.js");
    await this.loadScript("../../../assets/js/plugins.js");
    await this.loadScript("../../../assets/js/actions.js");
    await this.loadScript("../../../assets/js/demo_dashboard.js");
  
  }
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
    })
  }*/
  //-- END INITIALIZING EMPLOYE DATA

  GetListTasks(){
     this.tskServide.GetListTasksByEmploye(this.Employe.codePersonne).subscribe(
              resp => {
                  this.ListTasks = resp;
                  this.spinnerService.hide();
              }
          );
  }

  ChangeEtat(idTask,etat){
    this.tskServide.TransitionEtat(idTask,etat).subscribe(
      resp => {
          this.GetListTasks();
          
        //-- PUSHING DATA INTO FIREBASE
        var dateN = new Date(); 
        var dateString = dateN.getUTCHours()+':'+dateN.getUTCMinutes()+':'+dateN.getUTCSeconds();
        this.afs.collection('notification').add({'taskMesssage':idTask+" : "+resp.messageResult,'nomUtilisateur':this.Employe.username,'typeOperation':"Task",'typeNotification' : 'EMPLOYE', 'idAgence': this.Employe.agence.codeAgence,'date':dateString});
        //-- END PUSHING DATA INTO FIREBASE
      }
    );
  }
  //-- END METHODES
}
