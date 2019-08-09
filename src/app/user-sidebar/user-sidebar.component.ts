import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from './sidebar.service';
import {SharedData } from './../shared-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { FormControl, NgForm, Validators } from '@angular/forms'
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit,OnDestroy {
  cat: any = [];
  state: any = [];
  agency: any=[];

    statsearch;
    catsearch;
    agensearch;

  enterdate;
  duedate;
  agencies;
  states;
  cates;
  status;
  foods = [
  { value: 'active', viewValue: 'Active' },
  { value: 'expire', viewValue: 'Expire' },
  { value: 'all', viewValue: 'All' }
  ];
  local;
  uname;
  endRequest;
    constructor(private datePipe: DatePipe,public _shareData: SharedData,private _nav: Router, private _serv: SidebarService) {
    }

    onSubmit(F: NgForm) {
      console.log(F)
        if (F.valid == true) {
            let searchUrl = 'advanced-search';
            console.log(this.datePipe.transform(this.enterdate, "yyyy-MM-dd"))
            this._nav.navigate([searchUrl], {
                queryParams: {
                    status: this.status,
                    enterdate: this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a "),
                    duedate: this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a "),
                    state: this.states,
                    agency: this.agencies,
                    cat: this.cates
                }
            });
        }
    }
    
  catRfp(item) {
    console.log("junaid",item);
    this._shareData.categoryInfo(item);         
    let sth = 'category';
    // sth=sth.replace(/&/g,'and').replace(/\s+/g, '-').toLowerCase();
    this._nav.navigate([sth], { queryParams: { cat: item } });
  }
  
  rfpState(state) {
    console.log("sssssssssssssss", state);
    this._shareData.stateInfo(state);             
    let sth = 'state';
    // sth=sth.replace(/&/g,'and').replace(/\s+/g, '-').toLowerCase();
    this._nav.navigate([sth], { queryParams: { state: state, } });
  }
  
  ngOnInit() {

  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username

      return true
    }
    else {
      return false
    }

  }
  ngOnDestroy(){
    this.endRequest.unsubscribe();
  }
}
