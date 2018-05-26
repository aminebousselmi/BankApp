import { Component,OnInit,ViewContainerRef } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";
import {AuthenticateService} from '../../services/authenticate.service';
import {DashboardService} from '../../services/dashboard.service';
declare var $: any;
declare var require: any;
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
	templateUrl: './dashboard3.component.html',
    styleUrls: ['./dashboard3.component.css']
})
export class Dashboard3Component implements OnInit {
    Employe : {codePersonne : null,agence: {codeAgence:0}};
    SumTask : {todoSum:0,inProcessSum:0,doneSum:0,totoalTask:0}
    EmployeControl = [];
	subtitle:string;
    userV = false;
    checkV = false;
    currencyV = false;
    normalOV = false;
    constructor(private authService:AuthenticateService,
                private dashService:DashboardService,
                private vcr: ViewContainerRef,
                public toastr: ToastsManager
    ) {
        this.toastr.setRootViewContainerRef(vcr);
		this.subtitle = "This is some text within a card block.";
	}


    // This is for the donute chart
    donuteChart1: Chart;     
    


     
  //-- INITIALIZING EMPLOYE DATA
  ngOnInit() {
    this.authService.getUsernameInfo$().subscribe(
        res => {
          this.authService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;
                  this.GetDataControl();
                  this.GetDataControlNormalOperations();
                  this.GetDataControlCurrency();
                  this.GetDataControlCheck();
                  this.GetSumsTasks();
                  this.GetEmploye();
              }
          );
        });
  }
  //-- END INITIALIZING EMPLOYE DATA

    GetDataControl(){
        this.dashService.GetStatusEmploye().subscribe(
            resp => {
                this.userV = resp;
            }
        );
    }

    SetAccessUser(username){
        this.dashService.SetAccessOnlyUser(username).subscribe(
            resp => {
                this.showInfo(resp.messageResult);
                this.GetEmploye();
            }
        );
    }

    ControlSecurityEmploye(){
        this.dashService.ControlEmployes().subscribe(
            resp => {
                this.showInfo(resp.messageResult);
            }
        );
    }
    UserControl(){
        if(this.userV == false){
            this.userV = true;
            this.ControlSecurityEmploye()
        }else{
            this.userV = false;
            this.ControlSecurityEmploye()
        }
    }

    GetDataControlNormalOperations(){
        this.dashService.GetStatusEmployeNormalOperations().subscribe(
            resp => {
                this.normalOV = resp;
            }
        );
    }

    ControlSecurityEmployeNormalOperations(){
        this.dashService.ControlEmployesNormalOperations().subscribe(
            resp => {
                this.showInfo(resp.messageResult);
            }
        );
    }
    
    NormalOperationControl(){
        if(this.normalOV == false){
            this.normalOV = true;
            this.ControlSecurityEmployeNormalOperations();
        }else{
            this.normalOV = false;
            this.ControlSecurityEmployeNormalOperations();
        }
    }

    
    GetDataControlCurrency(){
        this.dashService.GetStatusEmployeCurrency().subscribe(
            resp => {
                this.currencyV = resp;
            }
        );
    }

    ControlSecurityEmployeCurrency(){
        this.dashService.ControlEmployesCurrency().subscribe(
            resp => {
                this.showInfo(resp.messageResult);
            }
        );
    }

    CurrencyControl(){
        if(this.currencyV == false){
            this.currencyV = true;
            this.ControlSecurityEmployeCurrency();
        }else{
            this.currencyV = false;
            this.ControlSecurityEmployeCurrency();
        }
    }

    GetDataControlCheck(){
        this.dashService.GetStatusEmployeCheck().subscribe(
            resp => {
                this.checkV = resp;
            }
        );
    }

    ControlSecurityEmployeCheck(){
        this.dashService.ControlEmployesCheck().subscribe(
            resp => {
                this.showInfo(resp.messageResult);
            }
        );
    }
    
    CheckControl(){
        if(this.checkV == false){
            this.checkV = true;
            this.ControlSecurityEmployeCheck();
        }else{
            this.checkV = false;
            this.ControlSecurityEmployeCheck();
        }
    }

    GetEmploye(){
        this.dashService.GetEmploye(this.Employe.agence.codeAgence).subscribe(
            resp => {
                this.EmployeControl = resp;
            }
        )
    }
    GetSumsTasks(){
        this.dashService.GetSumTasks(this.Employe.codePersonne).subscribe(
            resp => {
                this.SumTask = resp;
                //this.donuteChart1.data.series[0] = 
                //this.donuteChart1.data.series[2] = ;
                //this.donuteChart1.data.series[1] = ;

                this.donuteChart1 =  {
                    type: 'Pie',
                    data: {
                        "series": [
                            this.SumTask.todoSum,
                            this.SumTask.doneSum,
                            this.SumTask.inProcessSum
                        ]
                    },
                    options: {
                      donut: true,
                      showLabel: false,
                      donutWidth: 30  
                    }
                    // events: {
                    //   draw(data: any): boolean {
                    //     return data;
                    //   }
                    // }
                  };     
            }
        );
    }

    showInfo(msg) {
        this.toastr.info(msg);
    }
    showError(msg) {
        this.toastr.error(msg,'Information !');
    }

}