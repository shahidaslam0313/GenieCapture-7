import { Component} from '@angular/core';
import { FooterService } from './footer.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import swal from 'sweetalert2';


@Component({
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html',
    styleUrls: ['./footer.component.css']
})

export class FooterComponent {
    test: Date = new Date();

      constructor(private _serv: FooterService) { }
    form;
    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl("", Validators.compose([
                Validators.required,
                Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
            ]))
        });
    }
    check_login() {
  
        if (localStorage.getItem('access_token')!=null) {
         
        
          return true;
        } 
        else {
          
          return false;
        }
    
      }
      personal;
      valid;
    onSubmit(email) {
        this.valid=true
        this._serv.subcribe(email).subscribe(
            data => {
                
               this.personal=JSON.parse(data["_body"])               
                if(this.personal.message=="Subscription Succesfull")
               { swal({
                    type: 'success',
                    title: 'Successfully subscribed!',
                });
                this.valid=false;
                this.form.reset();
            }
               else   if(this.personal.message=="You have already subscribed Newsletter")
                { swal({
                     type: 'warning',
                     title: "You have already subscribed newsletter",    
                 });
                 this.valid=false;
                }
            },
            error => {
                swal({
                    type: 'error',
                    title: error ,        
                })
                this.valid=false;
            })
    }
}
