import { Component } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import Swal from "sweetalert2";

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {
    constructor(public _serv:ProfileService) {
    }
  
    local;
    userEmail;
    endRequest;
    checker;
    personal;
    pkg;
    msg;
    show:boolean=false;
    show2:boolean=false;
    noMethodSaved
    symbol
    ngOnInit() { 
      this.local = localStorage.getItem("currentUser");
      let pars = JSON.parse(this.local);
      this.endRequest = this._serv
        .get_subscribe(pars.username)
        .subscribe(
          data => {
             this.personal = data;
             if(data["message"]=="null")
      {
        this.noMethodSaved=true
         
      }
      else{
        this.noMethodSaved=false
        this.symbol=true 
      }
            if (this.personal.package == "1") {
              this.pkg = "Monthly";
            } else if (this.personal.package == "12") {
              this.pkg = "Yearly";
            }else if (this.personal.package == "0") {
              this.pkg = "Trial";
            } else {
              this.pkg = "-";
               }
            if(this.personal.paymentreceive == true){
                this.msg = "Active"
                this.show = true;
                }
            else if(this.personal.paymentreceive == false){
                this.msg = "Inactive"
                this.show2 = true;
         }
         },
          error => {
            Swal("Sorry the Server is Down");
         }
        );
    }
}
