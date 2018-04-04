import { Component,ViewContainerRef,OnInit,AfterViewInit } from '@angular/core';
import {ChangeService} from '../service/change.service';
import {AuthenticateService} from '../service/authenticate.service';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {AngularFireDatabase} from 'angularfire2/database';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Component({
  moduleId: module.id,
  selector: 'change',
  templateUrl: 'change.component.html'
})
export class  ChangeComponent implements OnInit,AfterViewInit {
    //--ATTRBIUTS
    Employe : {codePersonne : null,agence: {codeAgence:0}};
    From = 'TND';
    To = 'EUR';
    Amount = 1;
    AmountConverted = 0;
    dataCurrency = [
        {code:'AED', name:'United Arab Emirates Dirham'},
        {code : 'AFN', name: 'Afghan Afghani'},
        {code : 'ALL', name: 'Albanian Lek'},
        {code : 'AMD' , name : 'Armenian Dram' },
        {code : 'ANG' , name : 'Netherlands Antillean Guilder'},
        {code : 'AOA' , name: 'Angolan Kwanza'},
        {code : 'ARS', name : 'Argentine Peso'},
        {code : 'AUD', name : 'Australian Dollar'},
        {code : 'AWG', name : 'Aruban Florin'},
        {code : 'AZN', name : 'Azerbaijani Manat'},
        {code : 'BAM', name : 'Bosnia-Herzegovina Convertible Mark'},
        {code : 'BBD', name : 'Barbadian Dollar'},
        {code : 'BDT', name : 'Bangladeshi Taka'},
        {code : 'BGN', name : 'Bulgarian Lev'},
        {code : 'BHD', name : 'Bahraini Dinar'},
        {code : 'BIF', name : 'Burundian Franc'},
        {code : 'BITGOLD', name : 'BitGOLD'},
        {code : 'BMD', name : 'Bermudan Dollar'},
        {code : 'BND', name : 'Brunei Dollar'},
        {code : 'BOB', name : 'Bolivian Boliviano'},
        {code : 'BRL', name : 'Brazilian Real'},
        {code : 'BSD', name : 'Bahamian Dollar'},
        {code : 'BTN', name : 'Bhutanese Ngultrum'},
        {code : 'BWP', name : 'Botswanan Pula'},
        {code : 'BYR', name : 'Belarusian Ruble (pre-2016)'},
        {code : 'BZD', name : 'Belize Dollar'},
        {code : 'CAD', name : 'Canadian Dollar'},
        {code : 'CDF', name : 'Congolese Franc'},
        {code : 'CHF', name : 'Swiss Franc'},
        {code : 'CLF', name : 'Chilean Unit of Account (UF)'},
        {code : 'CLP', name : 'Chilean Peso'},
        {code : 'CNY', name : 'Chinese Yuan'},
        {code : 'COP', name : 'Colombian Peso'},
        {code : 'CRC', name : 'Costa Rican Colon'},
        {code : 'CUP', name : 'Cuban Peso'},
        {code : 'CVE', name : 'Cape Verdean Escudo'},
        {code : 'CZK', name : 'Czech Republic Koruna'},
        {code : 'DJF', name : 'Djiboutian Franc'},
        {code : 'DKK', name : 'Danish Krone'},
        {code : 'DOP', name : 'Dominican Peso'},
        {code : 'DZD', name : 'Algerian Dinar'},
        {code : 'EEK', name : 'Estonian Kroon'},
        {code : 'EGP', name : 'Egyptian Pound'},
        {code : 'ERN', name : 'Eritrean Nakfa'},
        {code : 'ETB', name : 'Ethiopian Birr'},
        {code : 'EUR', name : 'Euro'},
        {code : 'FJD', name : 'Fijian Dollar'},
        {code : 'FKP', name : 'Falkland Islands Pound'},
        {code : 'GBP', name : 'British Pound Sterling'},
        {code : 'GEL', name : 'Georgian Lari'},
        {code : 'GHS', name : 'Ghanaian Cedi'},
        {code : 'GIP', name : 'Gibraltar Pound'},
        {code : 'GMD', name : 'Gambian Dalasi'},
        {code : 'GNF', name : 'Guinean Franc'},
        {code : 'GTQ', name : 'Guatemalan Quetzal'},
        {code : 'GYD', name : 'Guyanaese Dollar'},
        {code : 'HKD', name : 'Hong Kong Dollar'},
        {code : 'HNL', name : 'Honduran Lempira'},
        {code : 'HRK', name : 'Croatian Kuna'},
        {code : 'HTG', name : 'Haitian Gourde'},
        {code : 'HUF', name : 'Hungarian Forint'},
        {code : 'IDR', name : 'Indonesian Rupiah'},
        {code : 'ILS', name : 'Israeli New Sheqel'},
        {code : 'INR', name : 'Indian Rupee'},
        {code : 'IQD', name : 'Iraqi Dinar'},
        {code : 'IRR', name : 'Iranian Rial'},
        {code : 'ISK', name : 'Icelandic Krona'},
        {code : 'JEP', name : 'Jersey Pound'},
        {code : 'JMD', name : 'Jamaican Dollar'},
        {code : 'JOD', name : 'Jordanian Dinar'},
        {code : 'JPY', name : 'Japanese Yen'},
        {code : 'KES', name : 'Kenyan Shilling'},
        {code : 'KGS', name : 'Kyrgystani Som'},
        {code : 'KHR', name : 'Cambodian Riel'},
        {code : 'KMF', name : 'Comorian Franc'},
        {code : 'KPW', name : 'North Korean Won'},
        {code : 'KRW', name : 'South Korean Won'},
        {code : 'KWD', name : 'Kuwaiti Dinar'},
        {code : 'KYD', name : 'Cayman Islands Dollar'},
        {code : 'KZT', name : 'Kazakhstani Tenge'},
        {code : 'LAK', name : 'Laotian Kip'},
        {code : 'LBP', name : 'Lebanese Pound'},
        {code : 'LKR', name : 'Sri Lankan Rupee'},
        {code : 'LRD', name : 'Liberian Dollar'},
        {code : 'LSL', name : 'Lesotho Loti'},
        {code : 'LTL', name : 'Lithuanian Litas'},
        {code : 'LVL', name : 'Latvian Lats'},
        {code : 'LYD', name : 'Libyan Dinar'},
        {code : 'MAD', name : 'Moroccan Dirham'},
        {code : 'MDL', name : 'Moldovan Leu'},
        {code : 'MGA', name : 'Malagasy Ariary'},
        {code : 'MKD', name : 'Macedonian Denar'},
        {code : 'MMK', name : 'Myanma Kyat'},
        {code : 'MNT', name : 'Mongolian Tugrik'},
        {code : 'MOP', name : 'Macanese Pataca'},
        {code : 'MRO', name : 'Mauritanian Ouguiya'},
        {code : 'MTL', name : 'Maltese Lira'},
        {code : 'MUR', name : 'Mauritian Rupee'},
        {code : 'MVR', name : 'Maldivian Rufiyaa'},
        {code : 'MWK', name : 'Malawian Kwacha'},
        {code : 'MXN', name : 'Mexican Peso'},
        {code : 'MZN', name : 'Mozambican Metical'},
        {code : 'NAD', name : 'Namibian Dollar'},
        {code : 'NGN', name : 'Nigerian Naira'},
        {code : 'NIO', name : 'Nicaraguan Cordoba'},
        {code : 'NOK', name : 'Norwegian Krone'},
        {code : 'NPR', name : 'Nepalese Rupee'},
        {code : 'NZD', name : 'New Zealand Dollar'},
        {code : 'OMR', name : 'Omani Rial'},
        {code : 'PAB', name : 'Panamanian Balboa'},
        {code : 'PEN', name : 'Peruvian Nuevo Sol'},
        {code : 'PGK', name : 'Papua New Guinean Kina'},
        {code : 'PHP', name : 'Philippine Peso'},
        {code : 'PKR', name : 'Pakistani Rupee'},
        {code : 'PLN', name : 'Polish Zloty'},
        {code : 'PYG', name : 'Paraguayan Guarani'},
        {code : 'QAR', name : 'Qatari Rial'},
        {code : 'RON', name : 'Romanian Leu'},
        {code : 'RSD', name : 'Serbian Dinar'},
        {code : 'RUB', name : 'Russian Ruble'},
        {code : 'RUR', name : 'Old Russian Ruble'},
        {code : 'RWF', name : 'Rwandan Franc'},
        {code : 'SAR', name : 'Saudi Riyal'},
        {code : 'SBDf', name : 'Solomon Islands Dollar'},
        {code : 'SCR', name : 'Seychellois Rupee'},
        {code : 'SDG', name : 'Sudanese Pound'},
        {code : 'SEK', name : 'Swedish Krona'},
        {code : 'SGD', name : 'Singapore Dollar'},
        {code : 'SHP', name : 'Saint Helena Pound'},
        {code : 'SLL', name : 'Sierra Leonean Leone'},
        {code : 'SOS', name : 'Somali Shilling'},
        {code : 'SRD', name : 'Surinamese Dollar'},
        {code : 'STD', name : 'Sao Tome and Principe Dobra'},
        {code : 'SVC', name : 'Salvadoran Colon'},
        {code : 'SYP', name : 'Syrian Pound'},
        {code : 'SZL', name : 'Swazi Lilangeni'},
        {code : 'THB', name : 'Thai Baht'},
        {code : 'TJS', name : 'Tajikistani Somoni'},
        {code : 'TMT', name : 'Turkmenistani Manat'},
        {code : 'TND', name : 'Tunisian Dinar'},
        {code : 'TOP', name : "Tongan Tongan Pa'anga"},
        {code : 'TRY', name : 'Turkish Lira'},
        {code : 'TTD', name : 'Trinidad and Tobago Dollar'},
        {code : 'TWD', name : 'New Taiwan Dollar'},
        {code : 'TZS', name : 'Tanzanian Shilling'},
        {code : 'UAH', name : 'Ukrainian Hryvnia'},
        {code : 'UGX', name : 'Ugandan Shilling'},
        {code : 'USD', name : 'United States Dollar'},
        {code : 'USDE', name : 'USDe'},
        {code : 'UYU', name : 'Uruguayan Peso'},
        {code : 'UZS', name : 'Uzbekistan Som'},
        {code : 'VEF', name : 'Venezuelan Bolivar Fuerte'},
        {code : 'VND', name : 'Vietnamese Dong'},
        {code : 'VUV', name : 'Vanuatu Vatu'},
        {code : 'WST', name : 'Samoan Tala'},
        {code : 'XAF', name : 'CFA Franc BEAC'},
        {code : 'XAG', name : 'Silver Ounce'},
        {code : 'XAU', name : 'Gold Ounce'},
        {code : 'XCD', name : 'East Caribbean Dollar'},
        {code : 'XDR', name : 'Special Drawing Rights'},
        {code : 'XOF', name : 'CFA Franc BCEAO'},
        {code : 'XPF', name : 'CFP Franc'},
        {code : 'YER', name : 'Yemeni Rial'},
        {code : 'ZAR', name : 'South African Rand'},
        {code : 'ZMK', name : 'Zambian Kwacha (pre-2013)'},
        {code : 'ZMW', name : 'Zambian Kwacha'},
        {code : 'ZWL', name : 'Zimbabwean Dollar'}
    ]        
    From_Currency_Code = null;
    From_Currency_Name = null;
    To_Currency_Code = null;
    To_Currency_Name = null;
    Exchange_Rate = null;
    SelectedTypeChange = 0;
    SelectedCodeChange = null;
    Change = {
              Identif:null,
              Montant:0,
              AdresseP:null,
              Destination:null,
              NomP:null,
              PrenomP:null,
              FromCurrencyCode :null,
              FromCurrencyName :null,
              ToCurrencyCode:null,
              ToCurrencyName:null,
              ExchangeRate :0,
              MontantConverted:0,
              ChangeType :0,
              CodeEmploye:0
            };
       
        ChangeTable = [];
        chartChangeD : AmChart;
    //-- END ATTRIBUTS

  //-- CONSTRUCTOR
  constructor( 
      private chService: ChangeService,
      private authService: AuthenticateService,
      private modal: Modal,
      private firebase:AngularFireDatabase,
      private toastr: ToastsManager,
      private spinnerService: Ng4LoadingSpinnerService,
      private vcr: ViewContainerRef,
      private AmCh: AmChartsService
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
    this.spinnerService.show();
  }
  //-- END CONSTRUCTOR

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
  
      //-- INITIALIZING EMPLOYE DATA
      ngOnInit() {
        this.authService.getUsernameInfo$().subscribe(
            res => {
              this.authService.getUserInfo$(res.data.userName).subscribe(
                  resp => {
                      this.Employe = resp;
                      this.GetListChange();    
                      this.getCurrencyGraph();  
                  }
              );
        });
      }
    //-- END INITIALIZING EMPLOYE DATA

    //-- NG CHANGE CHECKBOX
    SelectedTypeChangeFunction(){
      if(this.SelectedTypeChange == 0){
        this.SelectedTypeChange = 1
      }else{
        this.SelectedTypeChange = 0
      }
    }
    //-- END NG CHANGE CHECKBOX

    //-- ADD CHANGE OPERATION
    AddDeviseOperation(){
      const dialogRef = this.modal.confirm()
      .size('sm')
      .cancelBtn("No")
      .okBtn("Yes")
      .isBlocking(true)
      .title('Confirmation Alert')
      .body(`
        <p>Are you sure you want to confirm this Currency Operation ?</p>
      `)
      .open().result.then((dialog: any) => 
      {
          this.Change.CodeEmploye = this.Employe.codePersonne;
          this.chService.AddDeviseOperation(this.Change).subscribe(
              data => {
                  if(data.idChange == 0){
                    this.showError(data.messageResult);
                  }else{
                    this.showValid(data.messageResult);
                    this.GetListChange();
                  }
              }
          )
      })
      .catch((err: any) => {
          this.showError("Transaction Canceled");
      });
    }
    //-- END ADD CHANGE OPERATION
    GetAmountConverted(MontantC){
      if(MontantC == null || MontantC <= 0 || this.SelectedCodeChange == null){
          this.showError("Make sure all Fields are not empty !");
      }else{
      if(this.SelectedTypeChange == 1){
        this.chService.ConvertisseurDevise("TND",this.SelectedCodeChange).subscribe(
          res => {
              this.Change.ChangeType = 1;
              this.Change.FromCurrencyCode = res["Realtime Currency Exchange Rate"]["1. From_Currency Code"];;
              this.Change.FromCurrencyName = res["Realtime Currency Exchange Rate"]["2. From_Currency Name"];
              this.Change.ToCurrencyCode = res["Realtime Currency Exchange Rate"]["3. To_Currency Code"];
              this.Change.ToCurrencyName = res["Realtime Currency Exchange Rate"]["4. To_Currency Name"];
              this.Change.ExchangeRate = res["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
              this.Change.MontantConverted = parseFloat(res["Realtime Currency Exchange Rate"]["5. Exchange Rate"])*MontantC;
              
          }
        )
      }else{
        this.chService.ConvertisseurDevise(this.SelectedCodeChange,"TND").subscribe(
          res => {
              this.Change.ChangeType = 0;
              this.Change.FromCurrencyCode = res["Realtime Currency Exchange Rate"]["1. From_Currency Code"];;
              this.Change.FromCurrencyName = res["Realtime Currency Exchange Rate"]["2. From_Currency Name"];
              this.Change.ToCurrencyCode = res["Realtime Currency Exchange Rate"]["3. To_Currency Code"];
              this.Change.ToCurrencyName = res["Realtime Currency Exchange Rate"]["4. To_Currency Name"];
              this.Change.ExchangeRate = res["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
              this.Change.MontantConverted = parseFloat(res["Realtime Currency Exchange Rate"]["5. Exchange Rate"])*MontantC;
              this.Change.AdresseP = null;
              this.Change.Destination = null;
              
          }
        )
      }
    }
    }
   
    handleAddressChange(address) {
      this.Change.Destination = address.formatted_address;
    }
    //-- CONVERTING CURRENCY
    ConvertDevise(){
      if(this.Amount <= 0 || this.Amount == null){
        this.showError("Empty Amount !");
      }else{
        this.chService.ConvertisseurDevise(this.From,this.To).subscribe(
            res => {
                this.From_Currency_Code = res["Realtime Currency Exchange Rate"]["1. From_Currency Code"];
                this.From_Currency_Name = res["Realtime Currency Exchange Rate"]["2. From_Currency Name"];
                this.To_Currency_Code = res["Realtime Currency Exchange Rate"]["3. To_Currency Code"];
                this.To_Currency_Name = res["Realtime Currency Exchange Rate"]["4. To_Currency Name"];
                this.Exchange_Rate = res["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
                this.AmountConverted = parseFloat(res["Realtime Currency Exchange Rate"]["5. Exchange Rate"])*this.Amount;
               

                const dialogRef = this.modal.alert()
                .size('sm')
                .okBtn("Close")
                .isBlocking(true)
                .title('Realtime Currency Exchange Rate')
                .body(`
                <!-- LIST GROUP WITH BADGES -->
                <div class="panel panel-default">
                    <div class="panel-body">
                        <ul class="list-group border-bottom">
                            <li class="list-group-item">From  Code<span class="badge badge-info">`+this.From_Currency_Code+`</span></li>
                            <li class="list-group-item">From  Name<span class="badge badge-danger">`+this.From_Currency_Name+`</span></li>
                            <li class="list-group-item">To  Code<span class="badge badge-info">`+this.To_Currency_Code+`</span></li>
                            <li class="list-group-item">To  Name<span class="badge badge-danger">`+this.To_Currency_Name+`</span></li>
                            <li class="list-group-item">Exchange Rate<span class="badge badge-danger">`+this.Exchange_Rate+`</span></li>
                            <li class="list-group-item">Amount <span class="badge badge-danger">`+this.AmountConverted+`</span></li>
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
        });

      }
    }
    //-- END CONVERTING CURRENCY

    _keyPress(event: any) {
      const pattern = /[a-z\A-Z\ \é\è]/;
      let inputChar = String.fromCharCode(event.charCode);
  
      if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
      }
    }

   
  //-- PUSHING DATA INTO FIREBASE
  SetDataCurrencyF(rateD,dateD){
      this.firebase.database.ref('currency').push(
                                                      {rate:rateD,
                                                       date: dateD
                                                      }
                                                  );
  }
  //-- END PUSHING DATA INTO FIREBASE
    //-- Currency Statistical Graph
    getCurrencyGraph(){
      //var returnArrDate = [];
      //var returnArrRate = [];
      var chartData = [];
        this.chService.ConvertisseurDevise("TND","EUR").subscribe(
            res => {
                this.SetDataCurrencyF(res["Realtime Currency Exchange Rate"]["5. Exchange Rate"],res["Realtime Currency Exchange Rate"]["6. Last Refreshed"]);
                  
                this.firebase.database.ref("currency").once('value').then(function(snapshot){
                  snapshot.forEach(function(childSnapshot) {
                      var item = childSnapshot.val();
                      item.key = childSnapshot.key;

                      chartData.push( {
                        "date": item.date,
                        "value": item.rate,
                        "volume": item.rate
                      });
                      
                    });
                    localStorage.setItem("chartData",JSON.stringify(chartData));
                  });
                    this.chartChangeD = this.AmCh.makeChart( "chartdivD", {
                      "type": "stock",
                      "theme": "light",
                      "categoryAxesSettings": {
                        "minPeriod": "mm"
                      },
                    
                      "dataSets": [ {
                        "color": "#b0de09",
                        "fieldMappings": [ {
                          "fromField": "value",
                          "toField": "value"
                        }, {
                          "fromField": "volume",
                          "toField": "volume"
                        } ],
                    
                        "dataProvider": JSON.parse(localStorage.getItem("chartData")),
                        "categoryField": "date"
                      } ],
                    
                      "panels": [ {
                        "showCategoryAxis": false,
                        "title": "Value",
                        "percentHeight": 70,
                    
                        "stockGraphs": [ {
                          "id": "g1",
                          "valueField": "value",
                          "type": "smoothedLine",
                          "lineThickness": 2,
                          "bullet": "round"
                        } ],
                    
                    
                        "stockLegend": {
                          "valueTextRegular": " ",
                          "markerType": "none"
                        }
                      }, {
                        "title": "Volume",
                        "percentHeight": 30,
                        "stockGraphs": [ {
                          "valueField": "volume",
                          "type": "column",
                          "cornerRadiusTop": 2,
                          "fillAlphas": 1
                        } ],
                    
                        "stockLegend": {
                          "valueTextRegular": " ",
                          "markerType": "none"
                        }
                      } ],
                    
                      "chartScrollbarSettings": {
                        "graph": "g1",
                        "usePeriod": "10mm",
                        "position": "top"
                      },
                    
                      "chartCursorSettings": {
                        "valueBalloonsEnabled": true
                      },
                    
                      "periodSelector": {
                        "position": "top",
                        "dateFormat": "YYYY-MM-DD JJ:NN",
                        "inputFieldWidth": 150,
                        "periods": [ {
                          "period": "hh",
                          "count": 1,
                          "label": "1 hour"
                        }, {
                          "period": "hh",
                          "count": 2,
                          "label": "2 hours"
                        }, {
                          "period": "hh",
                          "count": 5,
                          "selected": true,
                          "label": "5 hour"
                        }, {
                          "period": "hh",
                          "count": 12,
                          "label": "12 hours"
                        }, {
                          "period": "MAX",
                          "label": "MAX"
                        } ]
                      },
                    
                      "panelsSettings": {
                        "usePrefixes": true
                      },
                    
                      "export": {
                        "enabled": true,
                        "position": "bottom-right"
                      }
                    } );
            }   
        );
        this.spinnerService.hide();
    }
    //-- END CURRENCY Statistical Graph

    //-- Get List Change
    GetListChange(){
      this.chService.GetListChanges(this.Employe.codePersonne).subscribe(
          res => {
              this.ChangeTable = res;
          }
      );
    }
    //-- END GET LIST CHANGE
    
    //-- CONTROLLING
    showError(msg) {
      this.toastr.error(msg, "Error Message");
    }

    showValid(msg) {
      this.toastr.success(msg, 'Confirming message!');
    }
  //-- END CONTROLLING
}