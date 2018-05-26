import { Component} from '@angular/core';
@Component({
  selector: 'recent-message',
	templateUrl: './recent-message.component.html'
})
export class RecentmessageComponent{ 
		
	constructor() {
		
	}

	recentmessages: Object[] = [{
      	image: 'assets/images/users/1.jpg',
      	name: 'James Anderson',
      	message: 'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',    
      	time: '9:45 AM',
      	status: 'online'  
    }, {
        image: 'assets/images/users/2.jpg',
        name: 'Jon Doe',
        message: 'Simply dummy text of the printing and typesetting industry.',    
        time: '9:30 AM',
        status: 'busy'  
    }, {
        image: 'assets/images/users/4.jpg',
        name: 'Jane Doe',
        message: 'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',    
        time: '9:10 AM',
        status: 'away'  
    }, {
        image: 'assets/images/users/5.jpg',
        name: 'Marriah Carry',
        message: 'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',    
        time: '9:08 AM',
        status: 'offline'  
    }, {
        image: 'assets/images/users/6.jpg',
        name: 'Steave Rogers',
        message: 'Simply dummy text of the printing and typesetting industry.',    
        time: '9:02 AM',
        status: 'online'  
    }, {
        image: 'assets/images/users/5.jpg',
        name: 'Jared White',
        message: 'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',    
        time: '9:00 AM',
        status: 'away'  
    }];

}