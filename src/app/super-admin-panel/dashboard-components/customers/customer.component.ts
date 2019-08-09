import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard-services/dashboard.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SearchComponent } from './search-dialog/search.dialog.component';
import { SharedService } from '../../dashboard-services/shared.services';
@Component({
    selector: 'customer',
    templateUrl: 'customer.component.html',
    styleUrls:['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

    constructor(private sharedService:SharedService,public dialog: MatDialog,private registeredUsers:DashboardService,private _nav:Router) { }
    customers:any;
    length:any;
    email;
    ngOnInit() { 
        atob(localStorage.getItem("iii-yyyy"))
    this.email={
        username:atob(localStorage.getItem("iii-yyyy"))}
        this.customer(this.email)
    }
    customer(email){
        this.registeredUsers.registeredCutomers(email).subscribe(res=>
            {this.customers=res
             this.length=this.customers.length})
    }
purchase(i)
{
    this._nav.navigate(['/admin/dashboard/purchases/',btoa(i.email)])
}

searchDialog(): void {
    const dialogRef = this.dialog.open(SearchComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.length=result["length"]
        this.customers=result["data"];
      });
    
  }
  verifyLink(i){
      let obj={
          email:i.email
      }
      this.registeredUsers.verifyLink(obj).subscribe(res=>{
       if(res=="Already you have verified your account."){
        this.sharedService.AlertBox("","","Your account is already verified.")
       }
       else
{        this.sharedService.AlertBox("","",res)}
      })
  }
  refresh(){
      this.customer(this.email);
  }
}
