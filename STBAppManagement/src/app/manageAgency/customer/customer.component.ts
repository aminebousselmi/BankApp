import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {CustomerService} from '../../services/customer.service';
import {AuthenticateService} from '../../services/authenticate.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'customer-management',
  templateUrl: './customer.component.html'
})
export class CustomerComponent {
  
  source: LocalDataSource;
  Employe : {codePersonne : null,agence: {codeAgence:0}};
  customerList = [];
  constructor(private customerService : CustomerService,
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
                  this. GetListAdminCustomer();
              }
          );
        });
  }
  //-- END INITIALIZING EMPLOYE DATA

  GetListAdminCustomer(){
    this.customerService.GetListAdminCustomer(this.Employe.agence.codeAgence).subscribe(
      resp => {
          this.customerList = resp;
          this.source = new LocalDataSource(this.customerList); // create the source 
          console.log(this.customerList);
      }
  );
  } 

 settings = {
    columns: {
        codeClient : {
        title: 'Customer Number',
        editable: false,
        addable: false,
        filter: false
        },
        nomClient: {
        title: 'Name',
        filter: false,
       
        },
        nomAgence: {
        title: 'Agency Name',
        filter: false,
        editable: false,
        addable: false,
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
  var customerE =  {CodeAgency:0,NomClient:null};
   
  if (window.confirm('Are you sure you want to create?')) {
    event.confirm.resolve(event.newData);
      console.log(event);
      customerE.CodeAgency = this.Employe.agence.codeAgence;
      customerE.NomClient = event.newData.nomClient;
      this.customerService.CustomerAdd(customerE).subscribe(
      resp => {
          this.showInfo("Customer created Successfully");
          this.GetListAdminCustomer();
      }
      );
  } else {
    event.confirm.reject();
  }
}

onDeleteConfirm(event) {
  if (window.confirm('Are you sure you want to delete?')) {
    event.confirm.resolve();
    this.customerService.DeleteCustomer(event.data.codeClient).subscribe(
        resp => {
            this.showInfo("Customer Deleted Successfully")
        }
    );
  } else {
    console.log("error delted");
    event.confirm.reject();
  }
}

onSaveConfirm(event) {
  if (window.confirm('Are you sure you want to save?')) {
      event.confirm.resolve(event.newData);
      console.log(event.newData)
      
     
      this.customerService.CustomerEdit(event.newData).subscribe(
          resp => {
              this.showInfo("Edited Successfully");
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
