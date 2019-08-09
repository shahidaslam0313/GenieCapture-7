import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
import { SharedData } from '../../shared-service';
import { ActivatedRoute } from '@angular/router';
@Injectable()
export class ForgetPasswordService {

    constructor(private _http5: HttpService, public error:SharedData,private route: ActivatedRoute) { }

    loaded: boolean = false;
    pass1
    pass2;

    ngOnInit() {

      }
     
    change_password(pass1, pass2,code) {
        const headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this._http5.post(`https://apis.geniecapture.com/user/reset_password/${code}/`, JSON.stringify(
            {
                "pass1": pass1,
                "pass2": pass2,

            }), { headers: headers }).catch(this.error.errorHandler)
            .map((res: Response) => res.json())
    }
    verifyPassword(code) {
        const headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this._http5.get(`https://apis.geniecapture.com/user/verify_reset_password/${code}/`, { headers: headers }).catch(this.error.errorHandler)
            .map((res: Response) => res.json())
    }
}