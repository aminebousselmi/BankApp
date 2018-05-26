import { Component} from '@angular/core';
@Component({
    selector: 'te',
	templateUrl: './te.component.html'
})
export class TotalEarningComponent{ 
		
	constructor() {
		
	}

	totalearnings: Object[] = [{
      	image: 'assets/images/users/1.jpg',
      	name: 'Andrew Simon',
      	labelcolor: 'label-light-info',
        amount: '$2600'  
    }, {
        image: 'assets/images/users/2.jpg',
        name: 'Daniel Kristeen',
        labelcolor: 'label-light-success',
        amount: '$2300'  
    }, {
        image: 'assets/images/users/3.jpg',
        name: 'Dany John',
        labelcolor: 'label-light-primary',
        amount: '$1200'  
    }, {
        image: 'assets/images/users/4.jpg',
        name: 'Chris gyle',
        labelcolor: 'label-light-warning',
        amount: '$4400'  
    }, {
        image: 'assets/images/users/5.jpg',
        name: 'Jane Doe',
        labelcolor: 'label-light-danger',
        amount: '$2500'  
    }, {
        image: 'assets/images/users/6.jpg',
        name: 'Jon doe',
        labelcolor: 'label-light-megna',
        amount: '$3300'  
    }];

}