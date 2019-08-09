import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard-services/dashboard.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SharedService } from '../../dashboard-services/shared.services';
import { SearchPaymentDialogComponent } from './payment-search-dialog/search.payment.dialog.component';
@Component({
    selector: 'payment',
    templateUrl: 'payment.component.html',
    styleUrls:['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

    constructor(private sharedService:SharedService,public dialog: MatDialog,private paymentDetails:DashboardService,private _nav:Router) { }
    payments:any;
    length:any;
    email;
    ngOnInit() { 
        atob(localStorage.getItem("iii-yyyy"))
    this.email={
        email:atob(localStorage.getItem("iii-yyyy"))}
        this.payment(this.email)
    }
    payment(email){
        this.paymentDetails.paymentDetails(email).subscribe(res=>
            {this.payments=res
             this.length=this.payments.length})
    }

err=false;
searchDialog(): void {
    const dialogRef = this.dialog.open(SearchPaymentDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
         
        {if(result==undefined){
 this.length=0;
 this.err=true;
        }
            else
            { 
                this.length=result.length
        this.payments=result;}}
      });
    
  }
  
  refresh(){
      this.payment(this.email);
  }
}
