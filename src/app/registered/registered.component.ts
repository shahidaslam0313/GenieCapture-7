import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import swal from 'sweetalert2';
import { ErrorStateMatcher } from '@angular/material';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PreloaderService } from '../serv/preloader-service';
import { RecapchaService } from '../recapcha/recapcha.service';


export class errorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    
        return (invalidCtrl || invalidParent);
      }
}
declare interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}
declare interface User {
    text?: string; // required, must be 5-8 characters
    email?: string; // required, must be valid email format
    password?: string; // required, value must be equal to confirm password.
    // confirmPassword?: string; // required, value must be equal to password.
    number?: number; // required, value must be equal to password.
    url?: string;
    idSource?: string;
    idDestination?: string;
    optionsCheckboxes?: boolean;
    // firstname?: string;
}

@Component({
    selector: 'app-registered',
    templateUrl: './registered.component.html',
    styleUrls: ['./registered.component.css']
})

export class RegisteredComponent implements OnInit, OnDestroy {
    endRequest;
    public typeValidation: User;
    register: FormGroup;
    emailVerify: FormGroup;
    login: FormGroup;
    type: FormGroup;
    minlength=8;
    digitsOnly = '^[0-9,-]+$';
    mask: any[] = ['+', '1','-', /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    emailonly = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    usernameOnly = '[a-zA-Z0-9_.]+';
    textonly = '^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$'
    emailexist: boolean;
    emailcheck: boolean = false;
    usernameexist: boolean = false;
    isequal;
    checker = true;
    routing = null;
    hide = true;
    route;
    errorMsg:string;
    passer;
    myget;
    setter:boolean;
    showker;
     matcher = new errorMatcher();
    public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public logedin: any = 0;

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private _serv: RegisterService, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private load:PreloaderService, private captcha: RecapchaService) { }
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }
    resolved(captchaResponse: string) {
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }

      emailCheck(email1) {
          let email=email1.toLowerCase();
           this.endRequest= this._serv.email_exist(email).subscribe(
                res => {
                    this.emailexist = res;
                },
                error => {
              console.log("This is onchange api error",error)
                }
            );
        }

       

    getter(myvalue){
       myvalue
    }
       

    onRegister() {
        if(this.myget < 8){
            
            this.setter = true;
        }
        else {
            this.setter = false;
        }
        let status = this.captcha.check()
        
      
        if(this.register.valid && status == true && this.setter==false){
        let para = this.register.value
        this.isequal=true;
      
      
            this._serv.post_service(para).subscribe(
                data => {
                    if(data._body == '"Registered Successfully! Please check your email for verification."'){
                        swal({
                            type: 'success',
                            title: 'Registered Successfully Please check your email for verification',
                            showConfirmButton: true,
                        });
                        this.register.reset();
                        this.router.navigate(['/login'])
                    }
                    else if (data._body == '"Sorry! You are already registered."')
                    swal({
                        type: 'error',
                        title: 'User already registered',
                       
                    });
                },
                error => {
                    swal({
                        type:'error',
                        title:error
                    });
                      }
    
            )
    
       
    }
    else{
        this.validateAllFormFields(this.register);
        this.captcha.resetImg();
        this.isequal=false;
    }
}
    send_link(email) {
        this.endRequest = this._serv.activation_service(email).subscribe(
            data => {
                data;
                
            },
            error => {
                swal({
                    type:'error',
                    title:error
                });
                  }
                )
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

    myFunc(){
        this._serv.changeDataa1(this.register.controls.email.value);
    }
    myFunc2(){
        this._serv.changeDataa2(this.checker);
        this.router.navigate(['/verify-my-account'])
    }

    checkPasswords(register: FormGroup) { // here we have the 'passwords' group
    let pass = register.controls.password.value;
    let confirmPass = register.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
    
    ngOnInit() {
        
        if (isPlatformBrowser(this.platformId)) {
            this.logedin = localStorage.getItem('loged_in');
        }
        if (this.logedin == 1) {
            this.router.navigate(['/']);
        }
        this.emailVerify = this.formBuilder.group({
            code: ['', Validators.required]
        });
        this.register = this.formBuilder.group({
            firstname: ['', Validators.compose([Validators.required, Validators.pattern(this.textonly),Validators.minLength(3)])],
            lastname: ['', Validators.compose([Validators.required, Validators.pattern(this.textonly),Validators.minLength(3)])],
            organization: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9]+(([a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$')])],
            contact: [''],
            email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailonly)])],
            password: ['', Validators.compose([Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])],
            confirmPassword: ['',Validators.compose([Validators.required])],
           }, { validator: PasswordValidation.MatchPassword}
    );
    }
    agent
    setValue(agent, e){
        if(e.checked){ 
                 this.passer=e.checked
        }else{
            this.passer=e.checked
        }}
    ngOnDestroy() {
        // this.endRequest.unsubscribe();
    }
    firstNameErrMsg() {
        return this.register.controls['firstname'].hasError('required') ? 'Please Provide First Name' :
            this.register.controls['firstname'].hasError('pattern') ? 'Invalid first name' :
            this.register.controls['firstname'].hasError('minlength') ? 'Required length is at least 3 characters' :
             '';
      }
      lastNameErrMsg() {
        return this.register.controls['lastname'].hasError('required') ? 'Please Provide Last Name' :
            this.register.controls['lastname'].hasError('pattern') ? 'Invalid last name' :
            this.register.controls['lastname'].hasError('minlength') ? 'Required length is at least 3 characters' :
            '';
      }
      orgErrMsg(){
        return this.register.controls['organization'].hasError('required') ? 'Please Provide Organiztion' :
        this.register.controls['organization'].hasError('pattern') ? 'Invalid organization name' :   
        '';
      }
      emailErrMsg()
      {return this.register.controls['email'].hasError('required') ? 'Please Provide Email' :
        this.register.controls['email'].hasError('pattern') ? 'Invalid email' :    
      '';
      }
      passErrMsg()
      {return this.register.controls['password'].hasError('required') ? 'Please Provide Password' :
        this.register.controls['password'].hasError('pattern') ? 'At least one uppercase letter, one number & one special character' :   
      '';
      }
}
