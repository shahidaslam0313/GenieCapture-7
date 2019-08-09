import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  RegisterService
} from '../registered/register.service';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
// import swal from 'sweetalert2';
import {
  SharedData
} from '../shared-service';
import swal from 'sweetalert2';
import { RecapchaService } from '../recapcha/recapcha.service';

@Component({
  selector: 'app-verifycode2',
  templateUrl: './verifycode2.component.html',
  styleUrls: ['./verifycode2.component.scss']
})
export class VerifyCodeComponent2 implements OnInit {
  wrfp;
  data;
  data2;
  tester;
  code: any;
  msg;
  route;
  test;
  verifyform: FormGroup;
  checker2: boolean;
  checker3: boolean;
  css: string;
  redata;
  Foremail;
  digitsOnly = '^[0-9,-]+$';
  emailonly = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  isequal: boolean;
  constructor(private captcha: RecapchaService,private _nav: Router, private serv: RegisterService, private service: SharedData, private fb: FormBuilder) {}

  ngOnInit() {
    this.verifyform = this.fb.group({
      vcode: [""],
      email2: ["", [Validators.required, Validators.pattern(this.emailonly)]]
    });
  }


  Resend() {

    if (this.verifyform.controls.email2.valid) {
      let obj2 = {
        email: this.verifyform.controls.email2.value
      };
  
      this.serv.resend_code(obj2).subscribe(res => {
      
          if (res._body == '"Verification link has been sent on your email."') {
            this.verifyform.reset();
            swal({
              type: 'success',
              title: 'Verification link has been resent on your email',
              showConfirmButton: true,
            })
         
          }
        },
        error => {
          swal({
            type: 'error',
            title: error
          });
        }
      );
    }
  }
     
status;
valid;
  recoverPassword() {
    this.valid=true
    let status = this.captcha.check()
    if(status == true){
      this.isequal=true;
    let email = {
      email: this.verifyform.controls.email2.value
    };
    this.serv.recoverpass(email).subscribe(
      res => {
        this.status=res["status"]
        if (res["status"] == "True") {
          this.service.AlertBox("success", res["message"])
          this.valid=false;
          this.verifyform.reset()
        } else {
          this.service.AlertBox("warning", "Sorry, email does not exist")
          this.valid=false;
        }
      }
    ),err=>{
      this.service.AlertBox("warning", "Sorry, email does not exist")
      this.valid=false;
    }}
    else{
      this.captcha.resetImg();
      this.isequal=false;
      this.valid=false

    } 
  }
}