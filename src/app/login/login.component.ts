import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";
import {
  LoginService
} from "./login.service";
import {
  Router
} from "@angular/router";
import {
  isPlatformBrowser
} from "@angular/common";
import {
  AuthService
} from "angular4-social-login";
import {
  JwtHelper
} from "angular2-jwt";
import {
  Http
} from "@angular/http";
import {
  ActivatedRoute
} from "@angular/router";
import {
  SharedData
} from "../shared-service";
import {
  RecapchaService
} from "../recapcha/recapcha.service";

declare interface ValidatorFn {
  (c: AbstractControl): {
    [key: string]: any;
  };
}
declare interface User {
  username ? : string; // required, must be 5-8 characters
  email ? : string; // required, must be valid email format
  password ? : string; // required, value must be equal to confirm password.
  confirmPassword ? : string; // required, value must be equal to password.
  number ? : number; // required, value must be equal to password.
  url ? : string;
  idSource ? : string;
  idDestination ? : string;
  optionsCheckboxes ? : boolean;
  status ? : boolean;
  localVar;
}
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  endRequest;
  public typeValidation: User;
  register: FormGroup;
  login: FormGroup;
  type: FormGroup;
  isequal;
  status;
  jwtHelper: JwtHelper = new JwtHelper();
  private loggedIn: boolean;
  user: any;
  public logedin: any = 0;
  returnUrl: string;
  checker2: boolean = true;
  localVar: void;
  localCheck;
  data: any;
  hide = true;
  emailonly = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _nav: Router,
    private _serv: LoginService,
    private formBuilder: FormBuilder,
    private captcha: RecapchaService,
    private service: SharedData,
    private route:ActivatedRoute
  ) {}

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      "has-error": this.isFieldValid(form, field),
      "has-feedback": this.isFieldValid(form, field)
    };
  }
  local;
  email;
  ticket;
  resolved(captchaResponse: string) {}
  onLogin() {
    let status = this.captcha.check()
    if (this.login.valid && status == true) {
      this.isequal = true;
      let email=this.login.value.username.toLowerCase();
      this._serv
        .login(email, this.login.value.password)
        .subscribe(
          data => {
            if(this.agent=='true')
            {
              this.email = localStorage.getItem("xxccmdmdmmdmd");
              localStorage.setItem('xccffkspd',this.email)
              localStorage.setItem('glodces',btoa(this.login.value.password))
            }
          
          localStorage.setItem('access_token',data["token"])
          let user = {
            userid: this.jwtHelper.decodeToken(data["token"]).user_id,
            username: this.jwtHelper.decodeToken(data["token"]).username,
            token: data["token"],
          };
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("xxccmdmdmmdmd",btoa(user.username));
            this.service.AlertBox("success","Successfully Logged in");
            if(this.code=="buyProduct"){
              this._nav.navigate(['/pricing']);   
            }
           else if(this.code=="12CYVyw3"){
            this.ticket= atob(localStorage.getItem("exdocse"))
              this._nav.navigate(['/trackyourticket/',this.ticket]);   
            }
            else
            {
          this._nav.navigate(['/pricing']);
            }
          },
          err => {
            if (err == '400 (OK)'|| err == '400 (Bad Request)') {
              this.service.AlertBox("error","Wrong Credentials");
            }
            else if (err == '500 (OK)'|| err == '502'){
              this.service.AlertBox("error","Server is down")
            }
            this.captcha.resetImg();
          }
        );
    } else {
      this.validateAllFormFields(this.login);
      this.isequal = false;
    }
  }

  forgetPassword(email) {
    this._serv.forget_password(email).subscribe(
      res => {
        if (res == 'Please check your email to enter verification code.') {
          this.service.AlertBox("success","Please check your email to enter verification code");
          this.service.changeDataa3(email, this.checker2);
          this._nav.navigate(["/verify"]);
        } else if (res == 'User does not exist.') {
          this.service.AlertBox("error","User Does Not Exist");
        }
      },
      error => {
        this.service.AlertBox("error",error);
      }
    );
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  code
  ngOnInit() {
    this.route.params.subscribe(res => {
      this.code=res.code
  }) 
    this.agent="true"
    if (isPlatformBrowser(this.platformId)) {
      this.logedin = localStorage.getItem("loged_in");
    }

    if (this.logedin == 1) {
      this._nav.navigate(["/"]);
    }
    this.login = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required, Validators.pattern(this.emailonly)])],
      password: ["", Validators.compose([Validators.required])]
    });
    if(localStorage.getItem('xccffkspd')!=null && localStorage.getItem('glodces')!=null)
    {
      this.login.controls['username'].setValue(atob(localStorage.getItem("xccffkspd")))
      this.login.controls['password'].setValue(atob(localStorage.getItem("glodces")))
    }
  }

  agent;
  
  setValue(agent, e){
    if(e.checked){
      this.agent = 'true'
      this.login.controls['username'].setValue(this.login.value.username)
      this.login.controls['password'].setValue(this.login.value.password)
    }else{
      this.agent= 'false'
      localStorage.removeItem('xccffkspd')
      localStorage.removeItem('glodces')
    }
  }
}