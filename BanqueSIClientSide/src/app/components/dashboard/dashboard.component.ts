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
  Employe = {id : null,agence: {codeAgence:0}};
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
        
      //--  RELODING SCRIPTS TO AVOID DOM HIERACHY CONFUSING 
      if(document.getElementById("jqueryScript")){
        document.getElementById("jqueryScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "jqueryScript");
        testScript.setAttribute("src", "../../../assets/js/plugins/jquery/jquery.min.js");
        document.body.appendChild(testScript);  
      }
      
      if(document.getElementById("jqueryuiScript")){
        document.getElementById("jqueryuiScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "jqueryuiScript");
        testScript.setAttribute("src", "../../../assets/js/plugins/jquery/jquery-ui.min.js");
        document.body.appendChild(testScript);
      }

      if(document.getElementById("plugin")){
        document.getElementById("plugin").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "plugin");
        testScript.setAttribute("src", "../../../assets/js/plugins.js");
        document.body.appendChild(testScript);
      }

      if(document.getElementById("plugin")){
        document.getElementById("plugin").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "plugin");
        testScript.setAttribute("src", "../../../assets/js/plugins.js");
        document.body.appendChild(testScript);
      }

        
      if(document.getElementById("bootstrapScript")){
          document.getElementById("bootstrapScript").remove();
          var testScript = document.createElement("script");
          testScript.setAttribute("id", "bootstrapScript");
          testScript.setAttribute("src", "../../../assets/js/plugins/bootstrap/bootstrap.min.js");
          document.body.appendChild(testScript);
      }

      if(document.getElementById("iCheckScript")){
            document.getElementById("iCheckScript").remove();
            var testScript = document.createElement("script");
            testScript.setAttribute("id", "iCheckScript");
            testScript.setAttribute("src", "../../../assets/js/plugins/icheck/icheck.min.js");
            document.body.appendChild(testScript);
      }

      if(document.getElementById("custScript")){
        document.getElementById("custScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "custScript");
        testScript.setAttribute("src", "../../../assets/js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js");
        document.body.appendChild(testScript);
      }

      if(document.getElementById("scrollScript")){
        document.getElementById("scrollScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "scrollScript");
        testScript.setAttribute("src", "../../../assets/js/plugins/scrolltotop/scrolltopcontrol.js");
        document.body.appendChild(testScript);        
      }

      if(document.getElementById("rickshawScript")){
        document.getElementById("rickshawScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "rickshawScript");
        testScript.setAttribute("src", "../../../assets/js/plugins/rickshaw/d3.v3.js");
        document.body.appendChild(testScript);
      }

      if(document.getElementById("rickshawMinScript")){
        document.getElementById("rickshawMinScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "rickshawMinScript");
        testScript.setAttribute("src", "../../../assets/js/plugins/rickshaw/rickshaw.min.js");
        document.body.appendChild(testScript);
      }

      if(document.getElementById("bootdatScript")){
        document.getElementById("bootdatScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "bootdatScript");
        testScript.setAttribute("src", "../../../assets/js/plugins/bootstrap/bootstrap-datepicker.js");
        document.body.appendChild(testScript);
      }

      if(document.getElementById("carouselScript")){
        document.getElementById("carouselScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "carouselScript");
        testScript.setAttribute("src", "../../../assets/js/plugins/owl/owl.carousel.min.js");
        document.body.appendChild(testScript);
      }

      if(document.getElementById("momentScript")){
        document.getElementById("momentScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "momentScript");
        testScript.setAttribute("src", "../../../assets/js/plugins/moment.min.js");
        document.body.appendChild(testScript);
      }

      if(document.getElementById("daterangerScript")){
        document.getElementById("daterangerScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "daterangerScript");
        testScript.setAttribute("src", "../../../assets/js/plugins/daterangepicker/daterangepicker.js");
        document.body.appendChild(testScript);
      }

      if(document.getElementById("actionScript")){
        document.getElementById("actionScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "actionScript");
        testScript.setAttribute("src", "../../../assets/js/actions.js");
        document.body.appendChild(testScript);
      }

      if(document.getElementById("dashboardScript")){
        document.getElementById("dashboardScript").remove();
        var testScript = document.createElement("script");
        testScript.setAttribute("id", "dashboardScript");
        testScript.setAttribute("src", "../../../assets/js/demo_dashboard.js");
        document.body.appendChild(testScript);
      }
      //-- END  RELODING SCRIPTS TO AVOID DOM HIERACHY CONFUSING 
  }
  //-- END CONSTRUCTOR && INJECTING SERVICES 

  //-- METHODES

  //-- INITIALIZING FUNCTIONS
  ngOnInit() {
          this.authService.getUserInfo$(sessionStorage.getItem("idUser")).subscribe(
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
  }
  //-- END INITIALIZING FUNCTIONS

  //-- GETTING PAYMENT BY EMPLOYE
  GetCountVersementByEmp(){
    this.dashService.GetCountVersementByEmploye(this.Employe.id).subscribe(
        data => 
        {
          this.VersementNumber = data;
        }
    );
  }
  //-- END GETTING PAYMENT BY EMPLOYE

  //-- GETTING COUNT WITHDRAWAL BY EMPLOYE
  GetCountRertraitByEmp(){
    this.dashService.GetCountRetraitByEmploye(this.Employe.id).subscribe(
        data => 
        {
          this.RetraitNumber = data;
        }
    );
  }
  //-- END GETTING COUNT WITHDRAWAL BY EMPLOYE

  //-- GETTING COUNT TRANSFER BY EMPLOYE
  GetCountVirementByEmp(){
    this.dashService.GetCountVirementByEmploye(this.Employe.id).subscribe(
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
    this.dashService.GetOperationsByEmploye(this.Employe.id).subscribe(
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
