import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-panel-header',
    templateUrl: 'header.component.html',
    styleUrls:['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private _nav: Router) { }

    ngOnInit() { 

    }
    logout(){
        localStorage.removeItem("xxx-yyy");
        this._nav.navigate(["/admin"]);
    }

}