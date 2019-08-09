import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Http,
} from '@angular/http';
import {
  PricingService
} from './pricing.service';

import swal from 'sweetalert2';
import {
  Router
} from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  SharedData
} from '../shared-service';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricingsteps.component.scss'],
})
export class PricingComponent implements OnInit {
  flipclass = 'credit-card-box';
  flip() {
    this.flipclass = 'credit-card-box hover';
  }
  flipagain() {
    this.flipclass = 'credit-card-box';
  }
  valuee1
  pkgsub = false;
  pkg_detail = {};
  valuee;
  res;
  disable;
  status;
  cardexpiration;
  ccv;
  ccv2;
  usernameOnly = '[a-zA-Z]+';
  CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
  ExpiryDate = '([0-9]{2}[/]?){2}'
  var_get_status;
  var_get_id;
  isright: boolean = false;
  loading = false;
  local
  uname;
  date;
  session;
  text:any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "Weeks",
    Days: "Days",
    Hours: "Hrs",
    Minutes: "Mins",
    Seconds: "Secs",
    MilliSeconds: "MilliSeconds"
  };

  default: boolean = false;
  endRequest;
  obj
  setautopay: boolean = false;
  card: string;
  card1: string;
  card2: string;
  var_type_atm = new FormControl('');
  public show: boolean = false;
  check_value: boolean = false;
  ccv1: boolean = false;
  cardnumber2;
  public cardmask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  min;
  max;
  cardcodelentgh(card_type) {
    if (card_type == "American Express") {
      this.min = 4;
      this.max = 4
    } else {
      this.min = 3;
      this.max = 3
    }
  }
  public form: FormGroup
  public defaultCards: FormGroup
  constructor(private alert: SharedData, private _nav: Router, private _serv: PricingService, private http: Http, private fb: FormBuilder) {  }
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
  cardexpirationMonth
  verifyDate: boolean;
  VerifyDate(val) {

    this.date = new Date();
    var year = this.date.getFullYear().toString().slice(2);
    var month = (this.date.getMonth() < 10 ? '0' : '') + (this.date.getMonth() + 1);
    this.cardexpiration = val.toString().slice(3, 5);
    this.cardexpirationMonth = val.toString().slice(0, 2)
    if (this.cardexpiration == year && this.cardexpirationMonth >= month) {
      return this.verifyDate = false
    } else if (this.cardexpiration > year) {
      return this.verifyDate = false
    } else {
      return this.verifyDate = true
    }
  }
  cardType;
  toSelect
  showLoader;
  ngOnInit() {
    window.scrollTo(0, 0)
    this.Timer(1563009720000); 
    this.timers();
    this.agent = "true";
    this.defaultCards = this.fb.group({
      selectedCard: [null, Validators.required]
    })
    let token = localStorage.getItem('currentUser')
    if (token != null) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      let obj = {
        email: this.uname,
      }
      this._serv.SavedMethods(obj).subscribe(res => {
        this.cardType = res
        this.toSelect = this.cardType.find(c => c.defalt == true);
        if (this.toSelect == undefined) {
          this.defaultCards.get('selectedCard').setValue('');
        }
        else {
          this.defaultCards.get('selectedCard').setValue(this.toSelect.nick_name);
        }
      })
    }

    this.form = this.fb.group({
      cardnumber: new FormControl('', [
        Validators.required,
      ]),
      cardcode: new FormControl('',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$')
        ]),
      cardexpiration: new FormControl('', [
        Validators.required,
        Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')
      ]),
      nick_name: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.required,
        Validators.pattern('^[a-zA-Z _.]+$')
      ]),

      zip_code: new FormControl('', [
        Validators.maxLength(5),
        Validators.minLength(4),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      str_add: new FormControl('',
        [Validators.required]),
      state: new FormControl('', [
        Validators.required,
      ]),
      city: new FormControl('', [
        Validators.required,
      ]),
      country: new FormControl('', [
        Validators.required,
      ]),
      card_holder: new FormControl('',
        [Validators.minLength(3),
        Validators.required,
        Validators.pattern('^[a-zA-Z _.]+$')
        ])

    });
  }

  cardid = "";
  updefault;
  name;
  cardnumber;
  address;
  zip;
  city;
  state;
  country;
  id;
  message;
  autopay;
  pkg;
  crg
  checker: boolean = true;
  maxvalue;
  maxvalue2;
  cardtype;
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
  totaltime;
  timers(){
    this.alert.gettimer().subscribe( data => {
 
      this.totaltime = data.json();
      // alert(this.totaltime);
      console.log(this.totaltime);
   
    })
  }
plan
  selected(event: any) {
    this.valuee1 = event.value
    this.plan=event.value
    if (event.value == "0") {
      this.isTrial = true;
    }
    else {
      this.isTrial = false;
    }
    if (event.value == "1") {
      this.prv_stepdetail("49.99", "Monthly")

    } else if (event.value == "12") {
      this.prv_stepdetail("599.99", "Yearly")
    } else if (event.value == "0") {
      this.prv_stepdetail("0", "Free")
    }
  }
  isTrial;
  transactionTypes = [{
    value: '1',
    viewValue: 'Monthly'
  },
  {
    value: '12',
    viewValue: 'Yearly'
  },
  {
    value: '0',
    viewValue: 'Free 7-Day Trial'
  }
  ]
  card_name

  firststep(value) {
    this.valuee = value;
    this.plan=value
    if (value == "0") {
      this.isTrial = true;
    }
    else {
      this.isTrial = false;
    }
    if (value == "1") {
      this.prv_stepdetail("49.99", "Monthly")

    } else if (value == "12") {
      this.prv_stepdetail("599.99", "Yearly")
    } else if (value == "0") {
      this.prv_stepdetail("0", "Free")
    }
  }
  prv_stepdetail(type, dur) {
    if(this.SaleOff==true)
    {
     if(dur=="Monthly")
     {
      this.pkg_detail['type'] = "34.99"
     }else if(dur=="Yearly")
     {
      this.pkg_detail['type'] = "299.99"
     }
    }
    else{
    this.pkg_detail['type'] = type
    this.pkg_detail['dur'] = dur
    }
    this.pkgsub = true;
  }
  proceedstep1() {
    this.loading = true;
  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username;
      return true;
    } else {
      localStorage.setItem("gnifp", "gol")
      return false;
    }
  }
  redirectToPricing() {

  }
  changed(val) {
    this.setautopay = val.checked
  }
  card_nickname;
  valid = false;
  proceed() {
    this.valid = true;
    let obj = {
      email: this.uname,
      package: this.valuee,
      card_type: this.var_type_atm["_value"],
      amount: this.pkg_detail['type'],
      recure: this.recure,
      ...this.form.value
    }
    this._serv.package_free(obj).subscribe(
      data => {
        if (data.message == 'Trial version has been activated, Please check your account to get license information.' || data.message == 'Paid subscription has been activated, Please check your account to get license information.') {
          this.alert.AlertBox("success", data.message)
          this._nav.navigate(['/']);
          this.valid = false;
        } else if (data.message == "Transaction Failed,Please try with valid card information" || data.message == "Something went wrong, please try again.") {
          this.alert.AlertBox("error", data.message)
          this.valid = false;
        } else if (data.message == "You have already used Trial package." || data.message == "Trial package is not available any more for you.") {
          this.alert.AlertBox("warning", data.message)
          this.valid = false;
        } else {
          this.alert.AlertBox("warning", data)
          this.valid = false;
        }
      },
      error => {
        swal({
          type: 'error',
          title: error
        })
        this.valid = false;
      }
    );
    if (this.recure == "recurring") {
      this._serv.SavedMethods(obj).subscribe(res => { console.log(res) })
    }
  }
  info;
  cardSelected(event) {
    this.info = event.value
    var date1 = this.info['cardexpiration1'];
    var formattedDate = date1.slice(0, 2) + "/" + date1.slice(2);
    this.info['cardexpiration1'] = formattedDate

  }
  placeOrder() {
    this.valid = true;
    if (this.info == undefined) {
      this.info = this.toSelect
    }
    let obj = {
      ...this.info,
      email: this.uname,
      package: this.valuee,
      amount: this.pkg_detail['type']
    }
    this._serv.payByDefault(obj).subscribe(data => {
      if (data.message == 'Trial version has been activated, Please check your account to get license information.' || data.message == 'Paid subscription has been activated, Please check your account to get license information.') {
        this.alert.AlertBox("success", data.message)
        this._nav.navigate(['/']);
      } else if (data.message == "Transaction Failed,Please try with valid card information" || data.message == "Something went wrong, please try again.") {
        this.alert.AlertBox("error", data.message)
        this.valid = false;
      } else if (data.message == "You have already used Trial package." || data.message == "Trial package is not available any more for you.") {
        this.alert.AlertBox("warning", data.message)
        this.valid = false;
      }
    })

  }
  agent
  recure = "recurring"
  setValue(agent, e) {
    if (e.checked) {
      this.recure = "recurring"
    } else {
      this.recure = "purchase"

    }
  }
  cvvErrMsg() {
    return this.form.controls['cardcode'].hasError('required') ? ' CVV cannot be empty' :
      this.form.controls['cardcode'].hasError('pattern') ? 'CVV must be only in digits.' :
        this.form.controls['cardcode'].hasError('minlength') ? ' CVV must be atleast 3 digits long.' :
          this.form.controls['cardcode'].hasError('maxlength') ? 'CVV must be at atmost 4 digits long.' :
            '';
  }
  expDateErrMsg() {
    return this.form.controls['cardexpiration'].hasError('required') ? ' Expiry date cannot be empty' :
      this.form.controls['cardexpiration'].hasError('pattern') ? ' Expiry date must be in MM/YY format.' :
        '';
  }
  zipCodeErrMsg() {
    return this.form.controls['zip_code'].hasError('required') ? 'Zip Code cannot be empty' :
      this.form.controls['zip_code'].hasError('pattern') ? 'Zip Code must be only in digits.' :
        this.form.controls['zip_code'].hasError('minlength') ? ' Zip Code must be atleast 4 digits long.' :
          '';
  }
  nickNameErrMsg() {
    return this.form.controls['nick_name'].hasError('required') ? ' Nick Name cannot be empty.' :
      this.form.controls['nick_name'].hasError('pattern') ? 'Nick Name must be only in alphabets.' :
        this.form.controls['nick_name'].hasError('minlength') ? 'Nick Name must be atleast 3 characters long.' :
          this.form.controls['nick_name'].hasError('maxlength') ? 'Nick Name must be atmost 15 characters long.' :
            '';
  }
  cardHolderErrMsg() {
    return this.form.controls['card_holder'].hasError('required') ? ' Cardholder Name cannot be empty.' :
      this.form.controls['card_holder'].hasError('pattern') ? 'Cardholder Name must be only in alphabets.' :
        this.form.controls['card_holder'].hasError('minlength') ? 'Cardholder Name must be atleast 3 characters long.' :
          '';
  }
  Dayss = 0; Hourss = 0; Minutess = 0; Secondss = 0;SaleOff;
  Timer(oldtime) {
    var x = setInterval(() => {
      this.SaleOff=true;
      let now = new Date().getTime()
      let olddate = new Date(oldtime).getTime()

      var distance = olddate - now;
      this.Dayss = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.Hourss = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.Minutess = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.Secondss = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        this.SaleOff=false;
        this.Dayss = 0;
        this.Hourss = 0;
        this.Minutess =0;
        this.Secondss =0;
        clearInterval(x);
       
      }
    }, 1000);
  }
  invalid;
  model : any = {};
  zipcodeCheck(zipcode1) {
    if (zipcode1.length > 4) {
      this.endRequest = this._serv.zipcode(zipcode1).subscribe(
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