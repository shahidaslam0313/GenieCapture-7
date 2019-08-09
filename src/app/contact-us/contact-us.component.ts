import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ContactUsService } from './contact-us.service';
import swal from 'sweetalert2';
import { RecapchaService } from '../recapcha/recapcha.service';
const EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const NAME_REGEX = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
const normalPattern = /^[a-zA-Z0-9_.-]+?/;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit,OnDestroy {
  mask: any[] = ['+', '1','-', /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  form;
  endRequest;
  isequal: boolean;
  valid;
  constructor(private _serv: ContactUsService,private captcha: RecapchaService) { }
  resolved(captchaResponse: string) {
  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(NAME_REGEX),
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ])),
      phone: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      message: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(normalPattern),
      ])),
    });
  }
  info;
  @ViewChild('f') myNgForm;

reset() {
  this.myNgForm.resetForm();
}
  onSubmit() {
    this.valid=false;
    let status = this.captcha.check()
    if(status == true){
      this.valid=true;
      this.isequal=true;
      let obj={
        name:this.form.controls.name.value,
        email:this.form.controls.email.value,
        phone:this.form.controls.phone.value,
        message:this.form.controls.message.value
      }
    this.endRequest= this._serv.contact(obj).subscribe(
      data => {
        this.captcha.resetImg();
        swal(
          '',
          'Your message has been sent successfully!',
          'success'
      )
       this.reset();
       },
      error=>{ 
        this.captcha.resetImg();
          swal(
        '',
        error,
        'error'
    )})  
    }   
    else{
      this.captcha.resetImg();
      this.isequal=false;
    } 
  }
  ngOnDestroy(){
    // this.endRequest.unsubscribe();
}
}