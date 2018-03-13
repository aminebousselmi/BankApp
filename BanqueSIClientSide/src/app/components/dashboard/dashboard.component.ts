import { Component,OnInit } from '@angular/core';
import {AuthenticateService} from '../service/authenticate.service';
import {DashboardService} from '../service/dashboard.service';
import {Chart} from 'chart.js';
import {DataTable} from 'angular2-datatable';
import {DataFilterPipe} from '../filter/data-filter-pipe';
import * as pattern from 'patternomaly';
@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit  {

  //-- ATTRIBUTS
  Employe = {codePersonne : null,agence: {codeAgence:0}};
  VersementNumber = 0;
  RetraitNumber = 0;
  VirementNumber = 0;
  CountCustomer = 0;
  CountAccount = 0;
  chart = [];
  montantV = [];
  alldates = [];
  operations = [];
  //-- END ATTRIBUTS

  //-- CONSTRUCTOR && INJECTING SERVICES 
  constructor(private authService: AuthenticateService,private dashService : DashboardService){
        
   
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
                  this.GetCountVersementByEmp();
                  this.GetCountRertraitByEmp();
                  this.GetCountVirementByEmp();
                  this.GetOperationsByEmp();
                  this.GetCountAccountByAgenc();
                  this.GeClientStatisByAgence();
              }
          );
        });
  }
  //-- END INITIALIZING FUNCTIONS

  //-- GETTING PAYMENT BY EMPLOYE
  GetCountVersementByEmp(){
    this.dashService.GetCountVersementByEmploye(this.Employe.codePersonne).subscribe(
        data => 
        {
          this.VersementNumber = data;
        }
    );
  }
  //-- END GETTING PAYMENT BY EMPLOYE

  //-- GETTING COUNT WITHDRAWAL BY EMPLOYE
  GetCountRertraitByEmp(){
    this.dashService.GetCountRetraitByEmploye(this.Employe.codePersonne).subscribe(
        data => 
        {
          this.RetraitNumber = data;
        }
    );
  }
  //-- END GETTING COUNT WITHDRAWAL BY EMPLOYE

  //-- GETTING COUNT TRANSFER BY EMPLOYE
  GetCountVirementByEmp(){
    this.dashService.GetCountVirementByEmploye(this.Employe.codePersonne).subscribe(
        data => 
        {
          this.VirementNumber = data;
        }
    );
  }
  //-- END GETTING COUNT TRANSFER BY EMPLOYE

  //-- GETTING OPERATION BY EMPLOYE TO ANALYTIC USING CHART.JS
  GetOperationsByEmp(){
    let i;
    //-- CONSUMING REST API SERVICE TO GET OPERATIONS
    this.dashService.GetOperationsByEmploye(this.Employe.codePersonne).subscribe(
        data => 
        {
          this.operations = data;
          //-- PUTTING DATA INTO ARRAYS
          for(i = 0 ; i < data.length ; i++ ){
            //-- AMOUNT
            this.montantV.push(data[i].montant) ;
            //-- DATE 
            let jsdate = new Date(data[i].dateOperation)
            this.alldates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}));
          }
          //-- END PUTTING DATA INTO ARRAYS

          //-- CREATING CHART DRAW TO ANALYZE OPERATIONS 

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: this.alldates,
              datasets: [
                {
                  data: this.montantV,
                  backgroundColor: '#C8E6C9',
                  fill: true,
                  pointBackgroundColor:'#B71C1C',
                  showLine:true
                  
                }
              ]
            },
            options: {
              legend: {
                display: false
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
        //-- END CREATING CHART DRAW TO ANALYZE OPERATIONS 
          
        }
    );
  }
  //-- END GETTING OPERATION BY EMPLOYE TO ANALYTIC USING CHART.JS
  
   //-- GETTING OPERATION BY EMPLOYE TO ANALYTIC USING CHART.JS
    GetCountAccountByAgenc(){
      this.dashService.GetCountAccountByAgency(this.Employe.agence.codeAgence).subscribe(
        data => 
        {
          this.CountAccount = data;
        }
      );
    
    }
  //-- END GETTING OPERATION BY EMPLOYE TO ANALYTIC USING CHART.JS

  GeClientStatisByAgence(){
    this.dashService.GetCountCustomerByAgency(this.Employe.agence.codeAgence).subscribe(
      data => 
      {
        this.CountCustomer = data;
      }
    );
    /*
    this.chart = new Chart('ClientStatistique', {
      type: 'doughnut',
      data: {
        labels: [
          'Red'
        ],
        datasets: [{
          data: [10],
          backgroundColor: [
            pattern.draw('circle', '#ff7f0e')
          ]
          
        }]
      },
      options: {
        legend: {
          display: false
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
  */
  //-- END CREATING CHART DRAW TO ANALYZE OPERATIONS
}
//-- END GETTING OPERATION BY EMPLOYE TO ANALYTIC USING CHART.JS
  //-- END METHODES
}
