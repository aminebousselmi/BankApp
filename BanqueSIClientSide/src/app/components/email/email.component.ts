import { Component } from '@angular/core';
import {AuthenticateService} from '../service/authenticate.service';
import {DashboardService} from '../service/dashboard.service';
import {DataFilterPipe} from '../filter/data-filter-pipe';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  moduleId: module.id,
  selector: 'email',
  templateUrl: 'email.component.html'
})
export class EmailComponent{

    //-- CONSTRUCTOR && INJECTING SERVICES 
    constructor(
        private authService: AuthenticateService,
        private dashService : DashboardService,
        private spinnerService: Ng4LoadingSpinnerService
    ){
    //this.spinnerService.show();
  }
  //-- END CONSTRUCTOR && INJECTING SERVICES 

  //-- METHODES
  //-- END METHODES
}