import { Component,ViewContainerRef, OnInit,AfterViewInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import {AuthenticateService} from '../service/authenticate.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit{

  //-- ATTRIBUTS
  Employe : {codePersonne : null,agence: {codeAgence:0}};
  imageURL : string = "/assets/img/amine.png";
  fileToUpload : File = null;
  //-- END ATTRIBUTS

  //-- CONSTRUCTOR
  constructor(
    private profileService: ProfileService,
    private authService : AuthenticateService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private modal: Modal,
    //private spinnerService: Ng4LoadingSpinnerService
    
  ) {
    
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
                  
              }
          );
        });  
}
handleFileInput(file : FileList){
    this.fileToUpload = file.item(0);

    // Show Image Peview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageURL = event.target.result;
      this.profileService.UploadImage({"IdEmplye":this.Employe.codePersonne,"ByteImage":event.target.result}).subscribe(
        resp => {
            console.log(resp);
        }
      );
    }
    reader.readAsDataURL(this.fileToUpload);
}
/*private loadScript(scriptUrl: string) {
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement('script')
    scriptElement.src = scriptUrl
    scriptElement.onload = resolve
    document.body.appendChild(scriptElement)
  })
}
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
    await this.loadScript("../../../assets/js/plugins/dropzone/dropzone.min.js");
    await this.loadScript("../../../assets/js/plugins/fileinput/fileinput.min.js");
    await this.loadScript("../../../assets/js/plugins/filetree/jqueryFileTree.js");
    await this.loadScript("../../../assets/js/plugins.js");
    await this.loadScript("../../../assets/js/actions.js");
    await this.loadScript("../../../assets/js/demo_dashboard.js");
    

  }*/

}