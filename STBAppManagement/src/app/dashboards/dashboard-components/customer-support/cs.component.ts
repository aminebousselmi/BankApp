import { Component} from '@angular/core';
@Component({
    selector: 'cs',
	templateUrl: './cs.component.html'
})
export class CustomerSupportComponent{ 
		
	constructor() {
		
	}

	recentcomments: Object[] = [{
      	image: 'assets/images/users/1.jpg',
      	name: 'James Anderson',
      	comment: 'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',    
      	date: 'April 14, 2016',
      	status: 'Pending',
      	labelcolor: 'label-light-info'  
    }, {
      	image: 'assets/images/users/2.jpg',
      	name: 'Michael Jorden',
      	comment: 'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',    
      	date: 'April 14, 2016',
      	status: 'Approved',
      	labelcolor: 'label-light-success'  
    }, {
      	image: 'assets/images/users/4.jpg',
      	name: 'Johnathan Doeting',
      	comment: 'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',    
      	date: 'April 14, 2016',
      	status: 'Rejected',
      	labelcolor: 'label-light-danger'  
    }];

}