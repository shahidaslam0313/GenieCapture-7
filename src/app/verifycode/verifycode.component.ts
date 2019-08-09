import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RegisterService } from '../registered/register.service';
import { FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { SharedData } from '../shared-service';

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.scss']
})
export class VerifyCodeComponent implements OnInit {
  wrfp;
  message;
  data;
  data2;
  tester;
  code:any;
  msg;
  route;
  test;
  checker2: boolean;
  checker3: boolean;
  // checker4 = true;
  css:string;
  redata;
  Foremail;
  digitsOnly = '^[0-9,-]+$';
  emailonly = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(private _nav: Router, private serv: RegisterService, private service: SharedData) { }

  ngOnInit() {

    //sign-up button
    this.serv.dataa1.subscribe(res => {
      this.data = res;
      console.log(this.data);
    })

    //forgot pass
    this.service.dataa3.subscribe(res=> {
      if(res != null || res!= undefined){
      this.data = res;
      this.Foremail = this.data;
      console.log(this.data);
      console.log(this.Foremail)
      }
    })

    this.service.dataa4.subscribe(res=> {
      console.log(res);
      this.checker3 = res;
      console.log(this.checker3);
    })

    }



    vcode = new FormControl("",[Validators.required,Validators.pattern(this.digitsOnly)]);
    // email2 = new FormControl("",[Validators.required, Validators.pattern(this.emailonly)]);

    onCodeSubmit(){

      console.log(this.data)

      if(this.vcode.valid){
     
      let obj = {
        email: this.data,
        code: this.vcode.value
      };
      console.log(obj);
      this.serv.verify_code(obj).subscribe(res => {
        console.log(res);
       if(res._body == '"Your Account has been verified."'){
        swal({
          type: 'success',
          title: 'Your Account is Verified',
          showConfirmButton: true,
      });
      this._nav.navigate(['/login'])
       }
       else if (res._body == '"User does not exist."'){
        swal({
          type: 'error',
          title: 'User Does Not Exist',
          showConfirmButton: true,
      });
       }
       else if (res._body == '"You are already registered."'){
        if(this.checker3 == true){
          this.service.changeDataa5(this.Foremail)
          this._nav.navigate(['/forgetpassword'])
        }
        else{
        swal({
          type: 'warning',
          title: 'User Has Been Registered Already',
          showConfirmButton: true,
      });
    }
    }
    else if (res._body == '"You have entered an incorrect code."'){
      swal({
        type: 'error',
        title: 'Incorrect Code',
        showConfirmButton: true,
    });
  }

  else if (res._body == '"Account with this email does not exist"'){
    swal({
      type: 'error',
      title: 'There is no account registered on this email',
      showConfirmButton: true,
  });
}

      },
      error => {
        swal({
            type:'error',
            title:error
        });
          })
    }
  }

    verifySubmit(){
      // if(this.email2.valid){
      console.log(this.data)
      // if(this.checker2 == true){
      //   this.data = this.email2.value;
      //   console.log(this.data)
      // }
      // if(this.data == null){
      //   this.data = this.email2.value;
      // }
      let obj2 = {
        email: this.data
      };
      console.log(obj2);
      this.serv.resend_code(obj2).subscribe(res => {
        console.log(res);
        if(res._body == '"Verification code has been sent to your email."'){
          swal({
            type: 'success',
            title: 'Verification Code has been resent on your email',
            showConfirmButton: true,
        });
         }
         else if (res._body == '"Already you have verified your account."'){
          swal({
            type: 'error',
            title: 'Already Verified, You do not need the code',
            showConfirmButton: true,
        });
      }
      else if (res._body == '"User does not exist."'){
        swal({
          type: 'error',
          title: 'User does not exist',
          showConfirmButton: true,
      });
    }
      },
      error => {
        swal({
            type:'error',
            title:error
        });
          }
    );
    }
}

