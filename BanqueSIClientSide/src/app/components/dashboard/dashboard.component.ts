import { Component,OnInit,AfterViewInit } from '@angular/core';
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
export class DashboardComponent implements OnInit,AfterViewInit{

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

  async ngAfterViewInit() {
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
  }

  //-- Create Detailed Chart Change
  CreateDetailedChartChange(){
    this.dashService.GetDetailedStatisticalChartByIdEmploye(this.Employe.codePersonne).subscribe(
      res => {
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
      }
    );
  }
  //-- END Create Detailed Chart Change

  //-- Create Chart Change
  CreateChartChange(){
    this.dashService.GetTotalBuyDeviseByEmploye(this.Employe.codePersonne).subscribe(
        res => {
          
          this.chartChangeSell =  this.AmCharts.makeChart( "chartdivSell", {
            "type": "gauge",
            "theme": "light",
            "axes": [ {
              "axisThickness": 1,
              "axisAlpha": 0.2,
              "tickAlpha": 0.2,
              "valueInterval":  Math.ceil(res.totalBuyAndSell/11),
              "bands": [ {
                "color": "#84b761",
                "endValue":  Math.ceil(res.totalBuyAndSell/2),
                "startValue":  0
              }, 
              {
                "color": "#cc4748",
                "endValue": Math.ceil(res.totalBuyAndSell),
                "innerRadius": "95%",
                "startValue": Math.ceil(res.totalBuyAndSell/2)
              } ],
              "bottomText": "0 TND",
              "bottomTextYOffset": -20,
              "endValue": Math.ceil(res.totalBuyAndSell)
            } ],
            "arrows": [ {} ],
            "export": {
              "enabled": true
            }
          });
          this.chartChangeSell.arrows[ 0 ].setValue(Math.ceil(res.totalSell));
          this.chartChangeSell.axes[ 0 ].setBottomText(Math.ceil(res.totalSell) + " TND" );
          
          this.chartChange =  this.AmCharts.makeChart( "chartdiv", {
            "type": "gauge",
            "theme": "light",
            "axes": [ {
              "axisThickness": 1,
              "axisAlpha": 0.2,
              "tickAlpha": 0.2,
              "valueInterval": Math.ceil(res.totalBuyAndSell/11),
              "bands": [ {
                "color": "#84b761",
                "endValue":  Math.ceil(res.totalBuyAndSell/2),
                "startValue":  0
              }, 
              {
                "color": "#cc4748",
                "endValue": Math.ceil(res.totalBuyAndSell),
                "innerRadius": "95%",
                "startValue": Math.ceil(res.totalBuyAndSell/2)
              } ],
              "bottomText": "0 TND",
              "bottomTextYOffset": -20,
              "endValue": Math.ceil(res.totalBuyAndSell)
            } ],
            "arrows": [ {} ],
            "export": {
              "enabled": true
            }
          });
          this.chartChange.arrows[ 0 ].setValue(Math.ceil(res.totalBuy));
          this.chartChange.axes[ 0 ].setBottomText(Math.ceil(res.totalBuy) + " TND" );
        }
    )
  }
  //-- END Create Chart Change

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
  
  //-- GET CLIENT STATISTICAL BY AGENCY
  GeClientStatisByAgence(){
    this.dashService.GetCountCustomerByAgency(this.Employe.agence.codeAgence).subscribe(
      data => 
      {
        this.CountCustomer = data;
      }
    );
  }
  //-- END GET CLIENT STATISTICAL BY AGENCY
  //-- END METHODES
}
