import { Component,ViewContainerRef,OnInit,AfterViewInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {ChequeService} from '../service/cheque.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {AuthenticateService} from '../service/authenticate.service';
import {Chart} from 'chart.js';
import {AngularFireDatabase} from 'angularfire2/database';

import { NotificationCheque } from './NotificationCheque';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  moduleId: module.id,
  selector: 'cheque',
  templateUrl: 'cheque.component.html'
})
export class  ChequeComponent implements OnInit {

  //-- ATTRIBUTS
  Employe : {codePersonne : null,username:null,agence: {codeAgence:0}};
  Check = {BankName:null,CINProprietaire:0,CodeCompte:null,Montant:0,NomProprietaire:null,PrenomProprietaire:null,NumeroC:0,IdEmploye:0,IdAgence:0};
  Compte = [];
  CheckList = null;
  chart = [];
  chart1 = [];
  MinPercentageAmountCheck = 0 ;
  MaxPercentageAmountCheck = 0;
  AveragePercentageAmountCheck = 0; 
  dateAmountAverage = [];
  dateAmountMin = [];
  dateAmountMax = [];
  AmountMin = [];
  AmountMax = [];
  AmountAverage = [];
  alldates = [];
  notifCol: AngularFirestoreCollection<NotificationCheque>;
  notifications: Observable<NotificationCheque[]>;
  //-END ATTRIBUTS  

  //-- CONSTRUCTOR
  constructor(   
    private spinnerService: Ng4LoadingSpinnerService,
    private checkService : ChequeService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private modal: Modal,
    private authService: AuthenticateService,
    private firebase:AngularFireDatabase,
    private afs: AngularFirestore
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.spinnerService.show();
  }
  //-- END CONSTRUCTOR

  //-- METHODES

    //-- INITIALIZING EMPLOYE DATA
    ngOnInit() {
      this.authService.getUsernameInfo$().subscribe(
          res => {
            this.authService.getUserInfo$(res.data.userName).subscribe(
                resp => {
                    this.Employe = resp;
                    this.GetListAccountByAgency();
                    this.GetStatisticalCheckChart();
                    this.GetStatisticalCheckChartAmount();
                    this.GetListCheckByPerson();
                }
            );
          });
    }
   /* async ngAfterViewInit() {
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
  //-- GET LIST ACCOUNT BY AGENCY
  GetListAccountByAgency() {
    return this.checkService.GetListAccountByAgency(this.Employe.agence.codeAgence).subscribe(
      data => {
          this.Compte = data;
      }
    );
  }
  //-- END GET LIST ACCOUNT BY AGENCY

  //-- GET LIST CHECK BY PERSON
  GetListCheckByPerson() {
    return this.checkService.GetListCheckByPerson(this.Employe.codePersonne).subscribe(
      data => {
          if(data.length == 0){
            this.CheckList = null;  
          }else{
            this.CheckList = data;
          }
          this.spinnerService.hide();
      }
    );
  }
  //-- END GET LIST CHECK BY PERSON

  //-- Payment Operation Form Submitting
  CheckPaymenOperation (){
    const dialogRef = this.modal.confirm()
    .size('sm')
    .cancelBtn("No")
    .okBtn("Yes")
    .isBlocking(true)
    .title('Confirmation Alert')
    .body(`
      <p>Are you sure you want to confirm this Payment Check ?</p>
    `)
    .open().result.then((dialog: any) => 
    {
        this.Check.IdEmploye = this.Employe.codePersonne; 
        this.Check.IdAgence = this.Employe.agence.codeAgence; 
        this.checkService.VersementCheque(this.Check).subscribe(
            data => {

                if(data.idC == 0){
                  this.showError(data.messageResult);
                }else{
                  this.showValid(data.messageResult);
                  this.GetListAccountByAgency();
                  this.GetStatisticalCheckChart();
                  this.GetStatisticalCheckChartAmount();
                  this.GetListCheckByPerson();  

                //-- PUSHING DATA INTO FIREBASE
                 var dateN = new Date(); 
                 var dateString = dateN.getUTCHours()+':'+dateN.getUTCMinutes()+':'+dateN.getUTCSeconds();
                 this.afs.collection('notification').add({'codeCompte':this.Check.CodeCompte,'nomUtilisateur':this.Employe.username,'montant': this.Check.Montant,'typeOperation':"PaymentCheck",'typeNotification' : 'EMPLOYE', 'idAgence': this.Employe.agence.codeAgence,'date':dateString});
                 //-- END PUSHING DATA INTO FIREBASE
                }
            }
        )
    })
    .catch((err: any) => {
        this.showError("Transaction Annulée");
    });
  }
  //-- END Payment Operation Form Submitting

  

  GetStatisticalCheckChart(){
    this.checkService.GetStatisticalCheckChart(this.Employe.codePersonne).subscribe(
      data => {
        this.MinPercentageAmountCheck = data.minPercentageAmountCheck;
        this.MaxPercentageAmountCheck = data.maxPercentageAmountCheck;
        this.AveragePercentageAmountCheck = data.averagePercentageAmountCheck;
        
      
        this.chart = new Chart('canvas', {
          type: 'doughnut',
          data: {
            labels:  [
                      'Amount < 1000 ',
                      'Amount > 1000 && < 10.000  ',
                      'Amount > 10.000'
                    ],
            datasets: [
              {
                data: [this.MinPercentageAmountCheck,this.MaxPercentageAmountCheck ,this.AveragePercentageAmountCheck ],
                backgroundColor: [
                  "#2ecc71",
                  "#e74c3c",
                  "#3498db",
                ],
                fill: true,
                pointBackgroundColor:'#B71C1C',
                showLine:true,
                cutoutPercentage:50
                
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'Statistics of Amount Payment Operations'
            },
            scales: {
              xAxes: [{
                display: false
              }],
              yAxes: [{
                display: false
              }]
            }
          }
    
       });
      }
  )
  }

  GetAccountByCheck(codeCompte,dateCreation,solde,decouvert,taux){
    var decTaux = null;
    var decTauxString = null;
    if(taux != null){
        decTaux = taux;
        decTauxString = "Taux";
    }else{
      decTaux = decouvert;
      decTauxString = "Decouvert";
    }
    const dialogRef = this.modal.alert()
    .size('sm')
    .isBlocking(true)
    .title('Account Detail')
    .body(`
    <!-- LIST GROUP WITH BADGES -->
    <div class="panel panel-default">
        <div class="panel-body">
            <ul class="list-group border-bottom">
                <li class="list-group-item">Account Number <span class="badge badge-info">`+codeCompte+`</span></li>
                <li class="list-group-item">Date <span class="badge badge-danger">`+dateCreation+`</span></li>
                <li class="list-group-item">Balance <span class="badge badge-info">`+solde+`</span></li>
                <li class="list-group-item">`+decTauxString+`<span class="badge badge-danger">`+decTaux+`</span></li>
            </ul>                                
        </div>
    </div>
    <!-- END LIST GROUP WITH BADGES -->
    `)
    .open().result.then((dialog: any) => 
    {
    })
    .catch((err: any) => {
    });
  }

  GetStatisticalCheckChartAmount(){
    let i,j,k,l;

    this.checkService.GetStatisticalCheckLine(this.Employe.codePersonne).subscribe(
      
      data => {
        for(i = 0 ; i < data.length ; i++ ){
          this.dateAmountMin = data[0];
          this.dateAmountMax = data[1];
          this.dateAmountAverage = data[2];
        }

        for(j = 0 ; j < this.dateAmountMin.length ; j++){
            this.alldates.push(this.dateAmountMin[j].dateVersement);
            this.AmountMin.push(this.dateAmountMin[j].montant);
        }

        for(k = 0 ; k < this.dateAmountMax.length ; k++){
            this.alldates.push(this.dateAmountMax[k].dateVersement);
            this.AmountMax.push(this.dateAmountMax[k].montant);
        }

        for(l = 0 ; l < this.dateAmountAverage.length ; l++){
            this.alldates.push(this.dateAmountAverage[l].dateVersement);
            this.AmountAverage.push(this.dateAmountAverage[l].montant);
        }

        if(this.AmountMin.length == 0){
          this.AmountMin = null;
        }

        if(this.AmountMax.length == 0){
          this.AmountMax = null;
        }

        if(this.AmountAverage.length == 0){
          this.AmountAverage = null;
        }

        this.chart1 = new Chart('canvas1', {
          type: 'line',
          data: {
            labels: this.alldates,
            datasets: [{
              label: 'Min',
              data: this.AmountMin,
              backgroundColor: "rgba(46,204,113,0.4)"
            }, {
              label: 'Max',
              data: this.AmountMax,
              backgroundColor: "rgba(231,76,60,0.4)"
            },
            {
              label: 'Average',
              data: this.AmountAverage,
              backgroundColor: "rgba(52,152,219,0.4)"
            }
          ]
          },
          options: {
            title: {
              display: true,
              text: 'Statistics of Amount & Date Payment Operations'
            },
            scales: {
              xAxes: [{
                display: false
              }],
              yAxes: [{
                display: true
              }]
            }
          }
          });
      })
  }
  
  //-- CONTROLLING
  showError(msg) {
    this.toastr.error(msg, "Error Message");
  }
  showValid(msg) {
    this.toastr.success(msg, 'Confirming message!');
  }
  //-- END CONTROLLING

  //--END METHODES
}