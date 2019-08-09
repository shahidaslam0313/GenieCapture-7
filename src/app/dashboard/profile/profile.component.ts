import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { ProfileService } from "./profile.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { AuthService } from "angular4-social-login";
import Swal from "sweetalert2";
import { Http, ResponseContentType } from '@angular/http';

declare const $: any;
declare interface ValidatorFn {
  (c: AbstractControl): {
    [key: string]: any;
  };
}
declare interface User {
  text?: string; // required, must be 5-8 characters
  email?: string; // required, must be valid email format
  password?: string; // required, value must be equal to confirm password.
  confirmPassword?: string; // required, value must be equal to password.
  number?: number; // required, value must be equal to password.
  url?: string;
  idSource?: string;
  idDestination?: string;
  optionsCheckboxes?: boolean;
}
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  endRequest;
  today: number = Date.now();
  UserPreference: any = [];
  tempUserPreference: any = [];
  record = [];
  result: boolean = false;
  public typeValidation: User;
  emailVerify: FormGroup;
  login: FormGroup;
  type: FormGroup;
  pkgsub = false;
  profile: any = [];
  personal: any = [];
  local;
  options: FormGroup;
  cat;
  uname;
  pkg;
  show: boolean = true;
  usernameexist;
  vin_Data = { city: "", state: "" };
  emailexist;
  checker: boolean = null;
  digitsOnly = "^[0-9,-]+$";
  mask: any[] = ['+', '1','-', /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public phoneMask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,

  ];
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );
  constructor(
    private authService: AuthService,
    private _nav: Router,
    private _serv: ProfileService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private http: Http
  ) { }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      "has-error": this.isFieldValid(form, field),
      "has-feedback": this.isFieldValid(form, field)
    };
  }
  valid
  onRegister() {
    this.valid=true
    let obj = {
      email: this.uname,
      firstname: this.register.controls.firstname.value,
      lastname: this.register.controls.lastname.value,
      organization: this.register.controls.companyname.value,
      contact: this.register.controls.phone.value
    };
   if (this.register.untouched) {
      Swal(
        {type:"warning",
        title:"Please update the fields first",}
      );
      this.valid=false;
    }
    else if (this.register.valid && this.register.touched) {
      this.endRequest = this._serv.updateProfile(obj).subscribe(
        data => {
          Swal({
            type: "success",
            title: "Updated Your Profile",
            showConfirmButton: false,
            timer: 1500
          });
          this.valid=false;
          let url = "/profile";
          this._nav.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this._nav.navigate([url]));
        },
        error => {
          this.valid=false;
          Swal({type:"error",
          title:"Something went wrong",});
        }
      );
    }
  }

  cancelPay() {
    Swal({
      title: "Are you sure?",
      text: "You want to cancel your recurring payment? ",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
     if (result) {
        this.endRequest = this._serv
          .cancelPayment(this.uname)
          .subscribe(res => {
            if (res == "True") {
              this.checker = true;
              Swal("Success", "Payment Has Stopped For Next Use", "success");
             } else {
              Swal("Oops, Something Went Wrong, Try Again?");
            }
          });
      } else {
        Swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }


  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  register = new FormGroup({
    firstname: new FormControl("", [Validators.required,Validators.pattern('^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$')]),
    lastname: new FormControl("", [Validators.required,Validators.pattern('^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$')]),
    companyname: new FormControl("", [Validators.required,Validators.pattern('^[a-zA-Z0-9]+(([a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$')]),
    package: new FormControl(""),
    startDate: new FormControl(""),
    endDate: new FormControl(""),
    phone: new FormControl("", [Validators.required]),
    email: new FormControl("")
  });

  ngOnInit() {
      this.local = localStorage.getItem("currentUser");
      let pars = JSON.parse(this.local);
      this.uname = pars.username;
      this.endRequest = this._serv
        .get_profile(this.uname)
        .subscribe(
          data => {
             if (data.status == "True") {
                this.personal = data;
                localStorage.setItem("xxxn",btoa(this.personal.firstname))
                if (this.personal.package == "1") {
                  this.pkg = "Monthly";
                } else if (this.personal.package == "12") {
                  this.pkg = "Yearly";
                }  else if (this.personal.package == "0") {
                  this.pkg = "Trial";
                }
                else{
                  this.pkg = "-"
                }
                this.register.patchValue({
                  firstname: this.personal.firstname,
                  lastname: this.personal.lastname,
                  companyname: this.personal.organization,
                  email: this.personal.email,
                  phone: this.personal.contact,
                  package: this.pkg,
                  startDate: this.personal.paymentdatetime,
                  endDate: this.personal.enddate
                });
                this.register.controls.email.disable();
                this.register.controls.package.disable();
                this.register.controls.startDate.disable();
                this.register.controls.endDate.disable();
              } 
          },
           error => {
            Swal("Sorry the Server is Down");
          }
        );
    
    $("#click_advance").click(function () {
      $("i", this).toggleClass("fa-arrow-left fa-arrow-right");
    });
  }

  valueSelected(preference, status) {
    if (status.currentTarget.checked) {
      this.tempUserPreference.push(preference);
    } else {
      this.tempUserPreference.pop(preference);

    }
  }
 
  ngOnDestroy() {
    // this.endRequest.unsubscribe();
  }
}
