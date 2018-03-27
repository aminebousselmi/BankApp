import { Component,OnInit } from '@angular/core';
import {AuthenticateService} from '../service/authenticate.service';
import {DashboardService} from '../service/dashboard.service';
import {Chart} from 'chart.js';
import {DataTable} from 'angular2-datatable';
import {DataFilterPipe} from '../filter/data-filter-pipe';
import * as pattern from 'patternomaly';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

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
  AccountList = [];
  chartChange: AmChart;
  chartChangeSell : AmChart;
  chartChangeDetailed : AmChart;
  TotalSell = 0;
  TotalBuy = 0;
  TotalChange = 0;
  valueInterval = 0;
  EndValue = 0;

  chartData1 = [];
  chartData2 = [];
  chartData3 = [];
  chartData4 = [];
  //-- END ATTRIBUTS

  //-- CONSTRUCTOR && INJECTING SERVICES 
  constructor(
    private authService: AuthenticateService,
    private dashService : DashboardService,
    private spinnerService: Ng4LoadingSpinnerService,
    private AmCharts: AmChartsService
  ){
    this.spinnerService.show();
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
                  this.CreateChartChange();
                  this.CreateDetailedChartChange()
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

  CreateDetailedChartChange(){

    this.dashService.GetDetailedStatisticalChartByIdEmploye(this.Employe.codePersonne).subscribe(
      res => {
        console.log(res);
          for ( var i = 0; i < res[0]['dateChange'].length; i++ ) {
            this.chartData1.push( {
              "date": res[0]['dateChange'][i],
              "value": res[0]['montant'][i],
              "volume": res[0]['exchangeRate'][i]
            } );
          }

          for ( var j = 0; j < res[1]['dateChange'].length; j++ ) {
            this.chartData2.push( {
              "date": res[1]['dateChange'][j],
              "value": res[1]['montant'][j],
              "volume": res[1]['exchangeRate'][j]
            } );
          }
          
          this.chartChangeDetailed = this.AmCharts.makeChart( "chartdivDetailed", {
            "type": "stock",
            "theme": "light",
            "dataSets": [ {
                "title": "BUY",
                "fieldMappings": [ {
                  "fromField": "value",
                  "toField": "value"
                }, {
                  "fromField": "volume",
                  "toField": "volume"
                } ],
                "dataProvider": this.chartData1,
                "categoryField": "date"
              }, {
                "title": "SELL",
                "fieldMappings": [ {
                  "fromField": "value",
                  "toField": "value"
                }, {
                  "fromField": "volume",
                  "toField": "volume"
                } ],
                "dataProvider": this.chartData2,
                "categoryField": "date"
              }
            ],
          
            "panels": [ {
              "showCategoryAxis": false,
              "title": "Value",
              "percentHeight": 70,
              "stockGraphs": [ {
                "id": "g1",
                "valueField": "value",
                "comparable": true,
                "compareField": "value",
                "balloonText": "[[title]]:<b>[[value]]</b>",
                "compareGraphBalloonText": "[[title]]:<b>[[value]]</b>"
              } ],
              "stockLegend": {
                "periodValueTextComparing": "[[percents.value.close]]%",
                "periodValueTextRegular": "[[value.close]]"
              }
            }, {
              "title": "Volume",
              "percentHeight": 30,
              "stockGraphs": [ {
                "valueField": "volume",
                "type": "column",
                "showBalloon": false,
                "fillAlphas": 1
              } ],
              "stockLegend": {
                "periodValueTextRegular": "[[value.close]]"
              }
            } ],
          
            "chartScrollbarSettings": {
              "graph": "g1"
            },
          
            "chartCursorSettings": {
              "valueBalloonsEnabled": true,
              "fullWidth": true,
              "cursorAlpha": 0.1,
              "valueLineBalloonEnabled": true,
              "valueLineEnabled": true,
              "valueLineAlpha": 0.5
            },
          
            "periodSelector": {
              "position": "left",
              "periods": [ {
                "period": "MM",
                "selected": true,
                "count": 1,
                "label": "1 month"
              }, {
                "period": "YYYY",
                "count": 1,
                "label": "1 year"
              }, {
                "period": "YTD",
                "label": "YTD"
              }, {
                "period": "MAX",
                "label": "MAX"
              } ]
            },
          
            "dataSetSelector": {
              "position": "left"
            },
          
            "export": {
              "enabled": true
            }
          } );

          console.log(this.chartData1);
          console.log(this.chartData2);
      }
    );
  }

  CreateChartChange(){
    this.dashService.GetTotalBuyDeviseByEmploye(this.Employe.codePersonne).subscribe(
        res => {
          this.TotalBuy = Math.ceil(res);
          this.TotalChange += this.TotalBuy;

          this.dashService.GetTotalSellDeviseByEmploye(this.Employe.codePersonne).subscribe(
            res => {
              this.TotalSell = Math.ceil(res);
              this.TotalChange += this.TotalSell;
              
              this.TotalChange = Math.ceil(this.TotalChange);
              this.valueInterval = Math.ceil(this.TotalChange/11);
              this.EndValue = Math.ceil(this.TotalChange/2);

              this.setChartSell(this.TotalSell,this.TotalChange,this.valueInterval,this.EndValue);
              this.setChartBuy(this.TotalBuy,this.TotalChange,this.valueInterval,this.EndValue);
            }
          )
        }
    )
   
  }
  setChartSell(TotalSell,TotalChange,ValueInterval,EndValue){
    
    this.chartChangeSell =  this.AmCharts.makeChart( "chartdivSell", {
      "type": "gauge",
      "theme": "light",
      "axes": [ {
        "axisThickness": 1,
        "axisAlpha": 0.2,
        "tickAlpha": 0.2,
        "valueInterval": ValueInterval,
        "bands": [ {
          "color": "#84b761",
          "endValue":  EndValue,
          "startValue":  0
        }, 
        {
          "color": "#cc4748",
          "endValue": TotalChange,
          "innerRadius": "95%",
          "startValue": EndValue
        } ],
        "bottomText": "0 TND",
        "bottomTextYOffset": -20,
        "endValue": TotalChange
      } ],
      "arrows": [ {} ],
      "export": {
        "enabled": true
      }
    });
    this.chartChangeSell.arrows[ 0 ].setValue(TotalSell);
    this.chartChangeSell.axes[ 0 ].setBottomText(TotalSell + " TND" );
  }

  setChartBuy(TotalBuy,TotalChange,ValueInterval,EndValue){
    this.chartChange =  this.AmCharts.makeChart( "chartdiv", {
      "type": "gauge",
      "theme": "light",
      "axes": [ {
        "axisThickness": 1,
        "axisAlpha": 0.2,
        "tickAlpha": 0.2,
        "valueInterval": ValueInterval,
        "bands": [ {
          "color": "#84b761",
          "endValue":  EndValue,
          "startValue":  0
        }, 
        {
          "color": "#cc4748",
          "endValue": TotalChange,
          "innerRadius": "95%",
          "startValue": EndValue
        } ],
        "bottomText": "0 TND",
        "bottomTextYOffset": -20,
        "endValue": TotalChange
      } ],
      "arrows": [ {} ],
      "export": {
        "enabled": true
      }
    });
    this.chartChange.arrows[ 0 ].setValue(TotalBuy);
    this.chartChange.axes[ 0 ].setBottomText(TotalBuy + " TND" );
  }
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
        this.spinnerService.hide();
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
  }

 
  //-- END METHODES
}
