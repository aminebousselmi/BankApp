import { Component, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['not-found.component.css']
})
export class NotFoundComponent implements AfterViewInit { 

	ngAfterViewInit() {

        $(function () {
            $(".preloader").fadeOut();
        });
    }

}
