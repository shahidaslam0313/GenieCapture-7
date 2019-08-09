import {
    Component,
    OnInit
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from "@angular/forms";
import {
    Router
} from "@angular/router";
import {
    LoginService
} from './login.service';
@Component({
    selector: 'admin-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup
    emailonly = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService) {}

    ngOnInit() {
        this.form = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.pattern(this.emailonly)]),
            password: new FormControl('', Validators.required)
        })
    }
    onLogin() {
        let obj = {
            ...this.form.value
        }
        this.loginService.loginService(obj).subscribe(res => {
            if (res["status"] == true) {
                localStorage.setItem("iii-yyyy",btoa(res["email"]))
                localStorage.setItem("xxx-yyy",btoa("wertysnsnndnndndmmmfmfmmfmmf8484994"))
                this.router.navigate(['/admin/dashboard/dashboarddetail']);     
            }
        })
    }
   
}