import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { userService } from '../viewuser/viewuser.service';
// import { PagerService } from '../servicefile/paginator.service';
import {
  DashboardService
} from '../dashboard-services/dashboard.service';
@Component({
  selector: 'app-dashboarddetail',
  templateUrl: './dashboarddetail.component.html',
  styleUrls: ['./dashboarddetail.component.scss']
})
export class DashboardDetailComponent  implements OnInit {
  // public personal;
  personal: any= []; 
  personals: any= []; 
  constructor(private _nav: Router , private _serv : DashboardService ) { }

  ngOnInit() {
    this.viewuser()
    // this.hamzasaeed()
  }
  viewuser(){
   
    // alert(page)
    this._serv.get_user_status().subscribe(
      data => {
          this.personal = data;
          console.log(this.personal);
          alert(this.personal);
   
          // console.log(this.personal['Total_Yearly_Subscriber'])
          // this.pager = this.pagerService.getPager(data['totalItems'], page, 20);
      });
  }
 

  

}
