import {
  Component,
  OnInit
} from '@angular/core';
import {
  SharedData
} from '../../shared-service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import {
  PaymentService
} from './payment.service';
import {
  PaymentDialogComponent
} from './payment-dialog/payment.dialog.component';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import {
  Router
} from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
  public form: FormGroup
  var_type_atm = new FormControl('');
  cardtype;
  public show: boolean = false;
  check_value: boolean = false;
  ccv1: boolean = false;
  card_opeation = [{
      value: 'Visa',
      viewValue: 'Visa Card'
    },
    {
      value: 'Mastercard',
      viewValue: 'Master Card'
    },
    {
      value: 'American Express',
      viewValue: 'American Express'
    },
    {
      value: 'Discover',
      viewValue: 'Discover'
    }
  ];


  public buttonName: any = 'Show';
  public show2: boolean = false
  endRequest;
  addPayment = false;

  cardexist: boolean = false;

  private productsSource;
  currentProducts;

  var_box_check: boolean = false;
  destroy_value;

  vin_Data = {
    "city": "",
    "state": "",
    "country" : ""
  };
  public cardmask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  min;
  max;
  cardcodelentgh(cardType) {
    if (cardType == "American Express") {
      this.min = 4;
      this.max = 4
    } else {
      this.min = 3;
      this.max = 3
    }
  }
  flipclass = 'credit-card-box';
  constructor(private _nav: Router, private fb: FormBuilder, private paymentService: PaymentService, private alert: SharedData, public dialog: MatDialog) {}

  ShowButton(var_type_atm) {
    this.cardtype = var_type_atm;
    if (var_type_atm == "American Express") {
      this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
      this.cardcodelentgh(var_type_atm);
      this.form.controls.cardnumber.reset();
      this.form.controls.cardcode.reset();
    } else if (var_type_atm == "Visa") {
      this.cardmask = [/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardcodelentgh(var_type_atm);
      this.form.controls.cardnumber.reset();
      this.form.controls.cardcode.reset();
    } else if (var_type_atm == "Mastercard") {
      this.cardmask = [/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardcodelentgh(var_type_atm);
      this.form.controls.cardnumber.reset();
      this.form.controls.cardcode.reset();
    } else {
      this.cardmask = [/[6]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardcodelentgh(var_type_atm);
      this.form.controls.cardnumber.reset();
      this.form.controls.cardcode.reset();
    }
    if (var_type_atm != null) {
      this.form.controls.cardnumber.enable();
      this.form.controls.cardcode.enable();
      this.form.controls.cardexpiration.enable();
      this.form.controls.nick_name.enable();
      this.form.controls.zip_code.enable();
      this.form.controls.city.enable();
      this.form.controls.state.enable();
      this.form.controls.str_add.enable();
      this.form.controls.country.enable();
      this.form.controls.card_holder.enable();
    }

  }
  ngOnInit() {
    this.agent="true"
    this.local = localStorage.getItem("currentUser");
    let pars = JSON.parse(this.local);
    this.uname = pars.username
    this.SavedPaymentMethods();
    this.form = this.fb.group({
      cardnumber: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required,
      ]),
      cardcode: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$')
      ]),
      cardexpiration: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required,
        Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')
      ]),
      nick_name: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$')
      ]),

      zip_code: new FormControl({
        value: '',
        disabled: true
      }, 
      
      [
        Validators.maxLength(5),
        Validators.minLength(4),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      str_add: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required
      ]),
      state: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required,
      ]),
      city: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required,
      ]),
      country: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required,
      ]),
      card_holder: new FormControl({
        value: '',
        disabled: true
      }, [Validators.minLength(3),
        Validators.required,
        Validators.pattern('^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$')
      ])

    });

  }
  
  cardid = "";
  card;
  default: boolean = true;
  updefault;
  name;
  cardnumber;
  cardcode;
  cardexpiration;
  str_add;
  zip_code;
  city;
  state;
  country;
  id;
  res;
  message;
  setautopay: boolean = false;
  autopay;
  pkg;
  local;
  session;
  uname;
  checker: boolean = true;
  date;
  public removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }
  cardexpirationMonth
  verifyDate: boolean;
  VerifyDate(val){
   
    this.date = new Date();
    var year = this.date.getFullYear().toString().slice(2);
    var month = (this.date.getMonth() < 10 ? '0' : '') + (this.date.getMonth() + 1);
    this.cardexpiration = val.toString().slice(3, 5);
    this.cardexpirationMonth = val.toString().slice(0, 2)
    if (this.cardexpiration == year && this.cardexpirationMonth >= month) {
      return this.verifyDate = false
    }
    else if (this.cardexpiration > year) {
      return this.verifyDate = false  
    }
     else {
      return this.verifyDate = true
    }
  }
  chek(val) {
   this.cardexpiration = val.toString().slice(3, 5);
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
  valid = false;
  proceed() {
    this.valid = true;
    let obj = {
      email: this.uname,
      card_type: this.var_type_atm["_value"],
      key: this.default,
      ...this.form.value
    }
    this.paymentService.AddPaymentMethod(obj).subscribe(res => {
      if (res.message == "Payment method is listed.") {
        this.alert.AlertBox("success", res.message)
        this._nav.navigateByUrl('/', {
          skipLocationChange: true
        }).then(() =>
          this._nav.navigate(["/payment"]));
        this.valid = false;
      } else if (res.message == "Failed,Please try with valid card information") {
        this.alert.AlertBox("error", res.message);
        this.valid = false;
      } else if (res.message == "You cannot add more than five cards, Remove any saved card to add new payment method.") {
        this.alert.AlertBox("warning", res.message)
        this.valid = false;
      } else {
        this.alert.AlertBox("warning", res)
        this.addPayment = false;
        this.var_type_atm.reset();
        this.form.reset()
        this.valid = false;
      }
    }, error => {
      this.alert.AlertBox("error", error);
      this.valid = false;
    })
  }
  savedMethods

  noMethodSaved
  SavedPaymentMethods() {

    let obj = {
      email: this.uname,
    }
    this.paymentService.SavedMethods(obj).subscribe(res => {
      this.savedMethods = res

      if (res.length == 0) {
        this.noMethodSaved = true

      } else {
        this.noMethodSaved = false
      }

      for (var i = 0; i < res.length; i++) {
        var date1 = res[i].cardexpiration1;
        var formattedDate = date1.slice(0, 2) + "/" + date1.slice(2);
        res[i].cardexpiration1 = formattedDate
      }
    })
  }
  AddNewMethod() {

    if (this.addPayment == true) {
      this.addPayment = false
    } else if (this.addPayment == false) {
      this.addPayment = true
    }
  }

  DeleteSavedAccount(id) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to do transactions by this payment method!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then((willDelete) => {
        if (willDelete) {
          let obj = {
            id: id
          }
          this.paymentService.DeleteMethod(obj).subscribe(res => {
            if (res.message == "Card detail has removed from save list.") {
              this.alert.AlertBox("success", res.message)
            } else {
              this.alert.AlertBox("error", res)
            }
            this.ngOnInit();
          })
        }
      }).catch(swal.noop)
  }

  editDialog(i): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: i
    };
    this.dialog.open(PaymentDialogComponent, dialogConfig.data)
  }
  agent
    setValue(agent, e){
      if(e.checked){
        this.default = true;
        this.default
      }else{
        this.default = false;
        this.default
      }
    }
    nickNameErrMsg(){
      return this.form.controls['nick_name'].hasError('required') ? ' Nick Name cannot be empty.' :
      this.form.controls['nick_name'].hasError('pattern') ? 'Nick Name must be only in alphabets.' :   
      this.form.controls['nick_name'].hasError('minlength') ? 'Nick Name must be atleast 3 characters long.' :
      this.form.controls['nick_name'].hasError('maxlength') ? 'Nick Name must be atmost 15 characters long.' :
  ''; 
    }
    cardHolderErrMsg(){
      return this.form.controls['card_holder'].hasError('required') ? ' Cardholder Name cannot be empty.' :
      this.form.controls['card_holder'].hasError('pattern') ?   'Cardholder Name must be only in alphabets.' :   
      this.form.controls['card_holder'].hasError('minlength') ? 'Cardholder Name must be atleast 3 characters long.' :
  ''; 
    }
    zipCodeErrMsg(){
      return this.form.controls['zip_code'].hasError('required') ? 'Zip Code cannot be empty' :
      this.form.controls['zip_code'].hasError('pattern') ? 'Zip Code must be only in digits.' :  
      this.form.controls['zip_code'].hasError('minlength') ? ' Zip Code must be 5 digits long.' :
      '';
    }
    expDateErrMsg(){
      return this.form.controls['cardexpiration'].hasError('required') ? ' Expiry date cannot be empty' :
      this.form.controls['cardexpiration'].hasError('pattern') ? ' Expiry date must be in MM/YY format.' :        
      ''; 
    }
    cvvErrMsg(){
      return this.form.controls['cardcode'].hasError('required') ? ' CVV cannot be empty' :
          this.form.controls['cardcode'].hasError('pattern') ? 'CVV must be only in digits.' :   
          this.form.controls['cardcode'].hasError('minlength') ? ' CVV must be atleast 3 digits long.' :
          this.form.controls['cardcode'].hasError('maxlength') ? 'CVV must be at atmost 4 digits long.' :
          '';
    }
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