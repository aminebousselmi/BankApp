import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {EmployeService} from '../../services/employe.service';
import {AuthenticateService} from '../../services/authenticate.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'employe-management',
  templateUrl: './employe.component.html'
})
export class EmployeComponent {
  
  source: LocalDataSource;
  Employe : {codePersonne : null,agence: {codeAgence:0}};
  employeList = [];
  constructor(private employeService : EmployeService,
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
                  this. GetListAdminEmploye();
              }
          );
        });
  }
  //-- END INITIALIZING EMPLOYE DATA

  GetListAdminEmploye(){
    this.employeService.GetListAdminEmploye(this.Employe.agence.codeAgence).subscribe(
      resp => {
          this.employeList = resp;
          this.source = new LocalDataSource(this.employeList); // create the source 
          console.log(this.employeList);
      }
  );
  }

 settings = {
    columns: {
        codePersonne: {
        title: 'Employe Number',
        filter: false,
        editable: false,
        addable: false
        },
        email: {
        title: 'Email',
        filter: false
        },
        nomPersonne: {
        title: 'Name',
        filter: false,
        },
        username: {
        title: 'Username',
        filter: false,
        editable: false,
        },
        password: {
        title: 'Password',
        filter: false,
        },
        nomAgence : {
            title: 'Agency',
            filter: false,
            editable: false,
            addable: false
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
    var EmpSave = {UserName:null,Password:null,Email:null,NomEmploye:null,IdAgence:0}
    if (window.confirm('Are you sure you want to create?')) {
      EmpSave.IdAgence = this.Employe.agence.codeAgence;
      EmpSave.UserName = event.newData.username;
      EmpSave.Password = event.newData.password;
      EmpSave.NomEmploye = event.newData.nomPersonne;
      EmpSave.Email = event.newData.email;

      this.employeService.EmployeAdd(EmpSave).subscribe(
        resp => {
            if(resp.userName == null){
                this.showError(resp.messageResult);
            }else{
                event.confirm.resolve(event.newData);
                this.showInfo(resp.messageResult);
                this.GetListAdminEmploye();
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
        this.employeService.DeleteEmploye(event.data.codePersonne).subscribe(
          resp => {
              this.showInfo("Deleted Successfully");
          }
      );
      } else {
        event.confirm.reject();
      }
}

onSaveConfirm(event) { 
    var EmpEdit = {CodePersonne:0,Email:null,NomPersonne :null,Username:null,CodeAgence:0,Password :null}
    if (window.confirm('Are you sure you want to save?')) {
        EmpEdit.CodePersonne = event.newData.codePersonne;
        EmpEdit.Email = event.newData.email;
        EmpEdit.NomPersonne = event.newData.nomPersonne;
        EmpEdit.Password = event.newData.password;
        EmpEdit.CodeAgence = this.Employe.agence.codeAgence;
        EmpEdit.Username = event.data.username;
        this.employeService.EmployeEdit(EmpEdit).subscribe(
          resp => {
            if(resp.idEmploye == 0){
                this.showError(resp.messageResult);
            }else{
                event.confirm.resolve(event.newData);
                this.showInfo(resp.messageResult);
                this.GetListAdminEmploye();
            }
            
          }
        );

      } else {
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
