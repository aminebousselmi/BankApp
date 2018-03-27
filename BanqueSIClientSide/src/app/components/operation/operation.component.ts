import { Component,ViewContainerRef } from '@angular/core';
import { CompteService } from '../service/compte.service';
import { OperationService } from '../service/operation.service';
import { URLSearchParams } from '@angular/http';
import {AuthenticateService} from '../service/authenticate.service';
import {DataTable} from 'angular2-datatable';
import {DataFilterPipe} from '../filter/data-filter-pipe';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  moduleId: module.id,
  selector: 'operation',
  templateUrl: 'operation.component.html'
})
export class OperationComponent {

  //-- ATTRIBUTS
  compte = null;
  operations = [];
  countOperations = null;
  countTransfer = null;
  LatestTransfer = null;
  ActiveAccount = null;
  Employe : {codePersonne : null};
  amountV = 0;
  amountR = 0;
  amountVI = 0;
  dialogResult = null;

  //-- END ATTRIBUTS

  //-- CONSTRUCTOR
  constructor(
    private compteService: CompteService,
    private operationService: OperationService,
    private authService : AuthenticateService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private modal: Modal,
    private spinnerService: Ng4LoadingSpinnerService
    
  ) {
    this.spinnerService.show();
    this.toastr.setRootViewContainerRef(vcr);
  }
  //-- END CONSTRUCTOR

  //-- METHODES

  ngOnInit() {
    this.authService.getUsernameInfo$().subscribe(
        res => {
          this.authService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;
                  this.GetCountOperationsByEmp();
                  this.GetCountTransferByEmp();
                  this.GetLatestTransferByEmp();
              }
          );
        });   
        this.GetActiveAcc(); 
}

  //-- GET COMPTE BY ACCOUNT NUMBER
  loadCompteByNumber(numberACC) {
    this.compteService.getCompteByNumber(numberACC).subscribe(data => 
      {
        this.compte = data;
        console.log(data);
        if(this.compte.codeCompte == null){
          this.showError(this.compte.resultMessage);
        }else{
            this.showValid(this.compte.resultMessage);
        }
        
      });  
  }
  //-- END GET COMPTE BY ACCOUNT NUMBER

  //-- ADD OPERATION


  AddOperationV(amount) {
    const dialogRef = this.modal.confirm()
    .size('sm')
    .cancelBtn("No")
    .okBtn("Yes")
    .isBlocking(true)
    .title('Confirmation Alert')
    .body(`
      <p>Are you sure you want to confirm this transaction ?</p>
    `)
    .open().result.then((dialog: any) => 
    { 
      this.operationService.Versement(this.compte.codeCompte,amount,this.Employe.codePersonne).subscribe(
        data =>{
          if(data.numeroOperation == 0){
              this.showErrorO(data.messageResult);
          }else{
            this.loadCompteByNumber(this.compte.codeCompte);
            this.GetCountOperationsByEmp();
            this.GetActiveAcc();
            this.showValidO(data.messageResult);
          }
          
        }
      );
    })
    .catch((err: any) => {
        this.showError("Transaction Annulée");
    });
  }

  AddOperationR(amount) {
    const dialogRef = this.modal.confirm()
    .size('sm')
    .cancelBtn("No")
    .okBtn("Yes")
    .isBlocking(true)
    .title('Confirmation Alert')
    .body(`
      <p>Are you sure you want to confirm this transaction ?</p>
    `)
    .open().result.then((dialog: any) => 
    { 
      this.operationService.Retrait(this.compte.codeCompte,amount,this.Employe.codePersonne).subscribe(
        data =>{
          if(data.numeroOperation == 0){
            this.showErrorO(data.messageResult);
          }else{
          this.loadCompteByNumber(this.compte.codeCompte);
          this.GetCountOperationsByEmp();
          this.GetActiveAcc();
          this.showValidO(data.messageResult);
          }
        }
      );
    })
    .catch((err: any) => {
        this.showError("Transaction Annulée");
    });
  }

  AddOperationVI(compte2,amount) {
    const dialogRef = this.modal.confirm()
    .size('sm')
    .cancelBtn("No")
    .okBtn("Yes")
    .isBlocking(true)
    .title('Confirmation Alert')
    .body(`
      <p>Are you sure you want to confirm this transaction ?</p>
    `)
    .open().result.then((dialog: any) => 
    { 
      this.operationService.Virement(this.compte.codeCompte,compte2,amount,this.Employe.codePersonne).subscribe(
        data =>{
          if(data.numeroOperation == 0 || compte2 == null){
            this.showErrorO(data.messageResult);
          }else{
            this.loadCompteByNumber(this.compte.codeCompte);
            this.GetCountOperationsByEmp();
            this.GetActiveAcc();
            this.GetCountTransferByEmp();
            this.GetLatestTransferByEmp();
            this.showValidO(data.messageResult);
          }
        }
      );
    })
    .catch((err: any) => {
        this.showError("Transaction Annulée");
    });
  }

  GetCountOperationsByEmp(){
    this.operationService.GetCountOperationsByEmploye(this.Employe.codePersonne).subscribe(
        data => 
        {
          this.countOperations = data;
        }
    );
  }

  GetCountTransferByEmp(){
    this.operationService.GetCountTransferByEmploye(this.Employe.codePersonne).subscribe(
        data => 
        {
          this.countTransfer = data;
        }
    );
  }

  GetLatestTransferByEmp(){
    this.operationService.GetLatestTransferByEmploye(this.Employe.codePersonne).subscribe(
        data => 
        {
          this.LatestTransfer = data;
          this.spinnerService.hide();
        }
    );
  }

  GetActiveAcc() {
    this.operationService.GetActiveAccount().subscribe(
      data => 
      {
        this.ActiveAccount = data;
      }
  );
  }
  //-- END OPERATION

  //-- CONTROLLING
  showError(msg) {
    this.toastr.error(msg, "Error Message");
  }

  showValid(msg) {
    this.toastr.success(msg, 'Confirming message!');
  }

  showErrorO(msg) {
    this.toastr.error(msg, "Error Message");
  }

  showValidO(msg) {
    this.toastr.success(msg, 'Confirming message!');
  }
  
  //-- END CONTROLLING
  

  //-- END METODES
}
