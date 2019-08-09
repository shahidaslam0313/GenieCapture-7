import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  SharedData
} from '../../../shared-service';
import {
  PaymentService
} from '../payment.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'selector',
  templateUrl: 'payment.dialog.html',
  styleUrls: ['../../payment/payment-dialog/payment.dialog.scss']
})
export class PaymentDialogComponent implements OnInit {

  constructor(private _nav:Router, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef < PaymentDialogComponent > , private fb: FormBuilder, private paymentService: PaymentService, private alert: SharedData) {

  }
local
email
checked:boolean;
cardexpiration1;
valid;
  form: FormGroup
  keypress(){}
  ngOnInit() {
    this.local = localStorage.getItem("currentUser");
    let pars = JSON.parse(this.local);
    this.email = pars.username
    this.form = this.fb.group({
      nick_name: new FormControl('', [Validators.minLength(3),
        Validators.maxLength(50),
        Validators.required,
        Validators.pattern('^[a-zA-Z _.]+$')
      ]),
      zip_code: new FormControl('', [
        Validators.maxLength(5),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      str_add: new FormControl('', [
        Validators.required
      ]),
      state: new FormControl('', [
        Validators.required,
      ]),
      city: new FormControl('', [
        Validators.required,
      ]),
      country: new FormControl('', [
        Validators.required,
      ]),
      cardexpiration1: new FormControl('', [
        Validators.required,
        Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')
      ]),
    })
    this.form.controls['nick_name'].setValue(this.data['nick_name']);
    this.form.controls['zip_code'].setValue(this.data['zip_code']);
    this.form.controls['str_add'].setValue(this.data['str_add']);
    this.form.controls['city'].setValue(this.data['city']);
    this.form.controls['country'].setValue(this.data['country']);
    this.form.controls['state'].setValue(this.data['state']);
    this.form.controls['cardexpiration1'].setValue(this.data['cardexpiration1']);
    this.checked=this.data['defalt'];
  }
  cardexpirationMonth
  verifyDate: boolean;
  date;
  VerifyDate(val){
   
    this.date = new Date();
    var year = this.date.getFullYear().toString().slice(2);
    var month = (this.date.getMonth() < 10 ? '0' : '') + (this.date.getMonth() + 1);
    this.cardexpiration1 = val.toString().slice(3, 5);
    this.cardexpirationMonth = val.toString().slice(0, 2)
    if (this.cardexpiration1 == year && this.cardexpirationMonth >= month) {
      return this.verifyDate = false
    }
    else if (this.cardexpiration1 > year) {
      return this.verifyDate = false  
    }
     else {
      return this.verifyDate = true
    }
  }

  chek(val) {
    this.cardexpiration1 = val.toString().slice(3, 5);
  }
  public mask = function (rawValue) {
    if (rawValue && rawValue.length > 0) {
      if (rawValue[0] == '0' || rawValue[5] == '1') {
        return [/[01]/, /[1-9]/, '/', /[0-9]/, /[0123456789]/];
      } else {
        return [/[01]/, /[0-2]/, '/', /[0-9]/, /[0123456789]/];
      }
    }
    return [/[01]/, /[0-9]/, '/', /[0-9]/, /[0123456789]/];

  }

  setAsDefault(defalt){
    if(defalt==true){
      this.checked=false;
    }
    else if(defalt==false) {
   this.checked=true;
    }
  }
  EditSavedAccount(id) {
   this.valid=false;
   var date1=this.form.value["cardexpiration1"];
   var formattedDate = date1.slice(0, 2) + date1.slice(3,5); 
   
    let obj = {
      id: id,
      email:this.email,
      cardexpiration1:this.form.value["cardexpiration1"]= formattedDate,
      state: this.form.value["state"],
      city:this.form.value["city"],
      zip_code:this.form.value["zip_code"], 
      nick_name:this.form.value["nick_name"],
      country:this.form.value["country"],
      str_add:this.form.value["str_add"],
      key:this.checked
    }
    
    this.paymentService.EditMethod(obj).subscribe(res =>

      { this.valid=true;
       
        if (res.message == "Data edited Successfully") {
          this.alert.AlertBox("success", res.message)  
          this.dialogRef.close();   
        } 
        else {
          this.alert.AlertBox("error", res)
        }
        this._nav.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this._nav.navigate(["/payment"])); 
      })
   
  }
  endRequest;
  invalid;
  model : any = {};
     zipcodeCheck(zipcode1) {
       if (zipcode1.length > 4) {
         this.endRequest = this.paymentService.zipcode(zipcode1).subscribe(
           data => {
             this.model.city = data['city'];
             this.model.state = data['state'];
             this.model.country = data['country'];
           },
             error => {
               error.status== 400
               this.invalid=error.status;
               delete this.model.city;
               delete this.model.state;
               delete this.model.country;
         });
       }
     }
}