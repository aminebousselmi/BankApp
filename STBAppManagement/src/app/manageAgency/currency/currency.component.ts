import { Component, ChangeDetectionStrategy, Inject, ViewChild, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyService} from '../../services/currency.service';
import {AuthenticateService} from '../../services/authenticate.service';

import { Subject } from 'rxjs/Subject';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-fullcalendar',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {

  view = 'month';
  Employe : {codePersonne : null,agence: {codeAgence:0}};
  viewDate: Date = new Date();
  currencyOperations = [];
  statOp = {};
  closeResult: string;
  constructor(private modal: NgbModal, 
              @Inject(DOCUMENT) doc: any,
              private currService : CurrencyService,
              private authService:AuthenticateService,
              private modalService: NgbModal
            ) {}

  //-- INITIALIZING EMPLOYE DATA
  ngOnInit() {
    this.authService.getUsernameInfo$().subscribe(
        res => {
          this.authService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;
                  this.getDataCurr();
                  this.getData(this.view,this.viewDate);
              }
          );
        });
  }
  //-- END INITIALIZING EMPLOYE DATA
  open2(content) { 
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  getData(view,viewDate){
    let date = new Date(viewDate);
  
    this.currService.GetSecureDataCurrencyByAgency(this.Employe.agence.codeAgence,date.getDate(),(date.getMonth().valueOf()+1),date.getUTCFullYear(),view,this.getWeekNumber(date)).subscribe(
      
      res => {
        this.currencyOperations = res;
    });
  }

  private getWeekNumber(d: Date): number {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
}

getDataCurr(){
  this.currService.GetStatisticalCurrency(this.Employe.agence.codeAgence).subscribe(
    res => {
      this.statOp = res;
  });
  }

}
