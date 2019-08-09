import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import Swal from "sweetalert2";

@Component({
    selector: 'app-license-details',
    templateUrl: './license-details.component.html',
    styleUrls: ['./license-details.component.scss']
})
export class LicenseDetailsComponent implements OnInit{
  constructor(public _serv:ProfileService) {
  }

  local;
  checker;
  personal;
  pkg;
  load:boolean=false;
  status;
  noMethodSaved;
  labels:boolean=false;
  ngOnInit() {
 
    this.local = localStorage.getItem("currentUser");
    let pars = JSON.parse(this.local);
     this._serv.get_license(pars.username)
      .subscribe(
        data => {
          this.personal = data;
          if(data["message"]=="null")
          {
            this.noMethodSaved=true
            
          }
          else{
            this.noMethodSaved=false
            this.labels=true;
          }
          if (this.personal.package == "1") {
            this.pkg = "Monthly";
          } else if (this.personal.package == "12") {
            this.pkg = "Yearly";
          } else if (this.personal.package == "0"){
            this.pkg = "Trial";
           }
           else{
             this.pkg='-';
           }
           if(this.personal.licence_status==true)
           {
          this.status="Active"
           }
           else  if(this.personal.licence_status==false){
             this.status="Expired"
           }
           else  if(this.personal.licence_status=='-')
           {
            this.status="-"
           }
          },
        
      );
  
}
}
