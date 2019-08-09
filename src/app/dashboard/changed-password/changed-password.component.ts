import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { ChangedPasswordService } from './changed-password.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import { AuthService } from "angular4-social-login";
declare const $ :any;
declare interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}

@Component({
    selector: 'app-changed-password',
    templateUrl: './changed-password.component.html',
    styleUrls: ['./changed-password.component.css']
})
export class ChangedPasswordComponent{
    local;
    uname;
   
    register: FormGroup;
    
    options: FormGroup;
    endRequest;
    passhide=true;
    newpasshide=true;
    confirmpasshide=true; 
    constructor(private authService: AuthService,private _nav:Router,private router: Router, private _serv: ChangedPasswordService, private formBuilder: FormBuilder) {
       
        this.options = formBuilder.group({
            bottom: 0,
            fixed: false,
            top: 0
        });

    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }
    valid
    changedPassword() {
        this.valid=true
       let obj={
        email:atob(localStorage.getItem("xxccmdmdmmdmd")),
        currentPassword:this.register.controls.old.value,
        newPassword:this.register.controls.password.value, 
        newPassword2:this.register.controls.confirmPassword.value,
       }
         this.endRequest= this._serv.user_change_password(obj).subscribe(
                data => {
                   if(data.message=="Password is updated.")
                   {this.valid=false
                   swal({
                       type:"success",
                       title:data.message
                   })
                   let url = 'profile';
                    this.router.navigate([url]);
                   }
                    else if(data.message =="Current Password is wrong."){
                        this.valid=false
                        swal({
                            type:"error",
                            title:data.message
                        })
                    }
                    else if(data.message =="New and Old password could not be same."){
                        this.valid=false
                        swal({
                            type:"warning",
                            title:data.message
                        })
                    }
                    else{
                        data
                    }
                    
                },
               );
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

    ngOnInit() {

        this.register = this.formBuilder.group({
            old: ['', Validators.required],
            password: ['', Validators.compose([Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])],
            confirmPassword: ['', Validators.compose([Validators.required])],
        }, {
            validator: PasswordValidation.MatchPassword 
                });

        $('#click_advance').click(function() {
            $("i", this).toggleClass("fa-arrow-left fa-arrow-right");
        });

    }
    


}