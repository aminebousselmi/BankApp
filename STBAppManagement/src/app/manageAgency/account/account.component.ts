import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {AccountService} from '../../services/account.service';
import {AuthenticateService} from '../../services/authenticate.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'data-table',
  templateUrl: './account.component.html'  
    
})
export class AccountComponent implements OnInit{  
  
  source: LocalDataSource;
  Employe : {codePersonne : null,agence: {codeAgence:0}};
  AccountList = [];
  constructor(private accountService : AccountService,
              private authService:AuthenticateService,
              private vcr: ViewContainerRef,
            public toastr: ToastsManager
            ) {
                this.toastr.setRootViewContainerRef(vcr);
  };

  
  //-- INITIALIZING EMPLOYE DATA
  ngOnInit() {
    this.authService.getUsernameInfo$().subscribe(
        res => {
          this.authService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;
                  this.GetListAccount();
              }
          );
        });
  }
  //-- END INITIALIZING EMPLOYE DATA

  GetListAccount() {
    this.accountService.GetListAdminAccount(this.Employe.agence.codeAgence).subscribe(
      res => {
          this.AccountList = res;
          this.source = new LocalDataSource(this.AccountList); // create the source 
      });
  }
  
 settings = {
    columns: {
        codeCompte: {
        title: 'Account Number',
        editable: false,
        filter: false,
        },
        dateCreation: {
        title: 'Date of creation',
        filter: true,
        editable: false,
        addable: false
        },
        decouvert: {
        title: 'Discovery',
        filter: false,
        },
        solde: {
        title: 'Balance',
        filter: false,
        },
        taux: {
        title: 'Rate',
        filter: false,
        },
        convertedType : {
            title: 'Type',
            filter: false,
        },
        nomClient: {
            title: "Customer",
            filter : false,
            editable: false
        }
    },
    add: {
        confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
      saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
      cancelButtonContent: '<i class="ti-close text-danger"></i>',
      confirmSave: true,
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
      saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
      cancelButtonContent: '<i class="ti-close text-danger"></i>',
    },
};

onCreateConfirm(event) {
    var compteE =  {CodeCompte:null,Solde:0,Decouvert:0,Taux:0,Type:null,IdChefAgence:0,IdAgence:0,NomClient:null};
   
    if (window.confirm('Are you sure you want to create?')) {
        compteE.CodeCompte = event.newData.codeCompte;
        compteE.Decouvert = event.newData.decouvert;
        compteE.Solde = event.newData.solde;
        compteE.Taux = event.newData.taux;
        compteE.Type = event.newData.convertedType;
        compteE.IdChefAgence = this.Employe.codePersonne;
        compteE.IdAgence = this.Employe.agence.codeAgence;
        compteE.NomClient = event.newData.nomClient
        this.accountService.AccountAdd(compteE).subscribe(
        resp => {
            console.log(resp);
            if(resp.codeCompte == null){
                this.showError(resp.resultMessage);
            }else{
                this.showInfo(resp.resultMessage);
                this.GetListAccount();
            }

        }
    );
    } else {
      event.confirm.reject();
    }
}

onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve();
        this.accountService.DeleteAccount(event.data.codeCompte).subscribe(
            resp => {
                this.showInfo("Account Deleted Successfully");
            }
        );
      } else {
        console.log("error delted");
        event.confirm.reject();
      }
}

onSaveConfirm(event) {
    var compteE =  {CodeCompte:null,AncienCodeCompte:null,DateCreation:null,Solde:null,Decouvert:null,Taux:null,Type:0};
    if (window.confirm('Are you sure you want to save?')) {
        compteE.AncienCodeCompte = event.data.codeCompte;
        compteE.CodeCompte = event.newData.codeCompte;
        compteE.DateCreation = event.data.dateCreation;
        compteE.Decouvert = event.newData.decouvert;
        compteE.Solde = event.newData.solde;
        compteE.Taux = event.newData.taux;
        compteE.Type = event.newData.convertedType;
        
        this.accountService.AccountEdit(compteE).subscribe(
            resp => {
                console.log(resp);
            if(resp.codeCompte == null){
                this.showError(resp.messageResult);
            }else{
                event.newData['name'] += ' + added in code';
                event.confirm.resolve(event.newData);
                this.showInfo(resp.messageResult);
                this.GetListAccount();
            }
            }
        );
      } else {
        console.log("not edited");
        event.confirm.reject();
      }
}
showInfo(msg) {
    this.toastr.info(msg);
}
showError(msg) {
    this.toastr.error(msg,'Information !');
}
}
