import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { Http} from '@angular/http';
import swal from 'sweetalert2';
import { ForgetPasswordService } from './forget-password.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedData } from '../../shared-service';

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

  // firstname?: string;
}
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit,OnDestroy {
  public typeValidation: User;
  register: FormGroup;
  login: FormGroup;
  type: FormGroup;
  endRequest;
  model: any = {};
  param;
  code;
  email;
  c_password;
  confirmpasshide=true
  newpasshide=true
  hide=true;
  constructor(private formBuilder: FormBuilder, private _serv: ForgetPasswordService,
    private route: ActivatedRoute,
    private service: SharedData,
    private router: Router,
    private http5: Http) { }


  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
  codes;
 status=true;
 message;
  ngOnInit() {
    this.route.params.subscribe(res => {
      this.codes=res['code'] 
     })
   
     this._serv.verifyPassword(this.codes).subscribe(res=>
      {
        console.log(res.status)
        if(res.status==false){
          this.status=false
         
          this.message=res.message
        }
      })
       this.register = this.formBuilder.group({
        password: ['', Validators.compose([Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])],
        confirmPassword: ['', Validators.compose([Validators.required])],
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }
  onForget() {
    if (this.register.valid) {
     this.c_password = this.register.value.confirmPassword;

    this.endRequest=  this._serv.change_password(this.register.value.password, this.register.value.confirmPassword,this.codes).subscribe(
        data => {
          if(data.message=="Password Reset Successfully")
          {
          swal({
            type: 'success',
            title: data.message,
           
          })
          
        }
        else{
          swal({
            type: 'error',
            title: data.message,
         
          })
        }
        let url = 'login';
          this.router.navigate([url]);
      }
       
        );
    } else {
      this.validateAllFormFields(this.register);
    }
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

  ngOnDestroy(){
    // this.endRequest.unsubscribe();
}
}