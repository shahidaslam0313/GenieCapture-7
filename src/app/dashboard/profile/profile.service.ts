import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
import { SharedData } from '../../shared-service';

@Injectable()
export class ProfileService {
    currentUser;
    checker;
constructor(private _http5: HttpService,private _http1: Http ,public error:SharedData) {
  
        this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
        
       
}
loaded:boolean =false;
get_profile(email) {
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    return this._http5.post('https://apis.geniecapture.com/user/fetchprofile/',JSON.stringify(
        {
            "email": email
        }), 
    {headers: headers}).catch(this.error.errorHandler)
    .map((response: Response) => response.json());

}
get_license(email) {
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    return this._http5.post('https://apis.geniecapture.com/user/licensedetail/',JSON.stringify(
        {
            "email": email
        }), 
    {headers: headers}).catch(this.error.errorHandler)
    .map((response: Response) => response.json());

}
get_subscribe(email) {
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    return this._http5.post('https://apis.geniecapture.com/user/subscription/',JSON.stringify(
        {
            "email": email
        }), 
    {headers: headers}).catch(this.error.errorHandler)
    .map((response: Response) => JSON.parse(response["_body"]));

}

checkPayment(email) {
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    return this._http5.post('https://apis.geniecapture.com/user/boolPayment/',JSON.stringify(
        {
            "email": email
        }), 
    {headers: headers}).catch(this.error.errorHandler)
    .map((response: Response) => response.json());

}

cancelPayment(email) {

    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    return this._http5.post('https://apis.geniecapture.com/user/canclerecurringpayment/',JSON.stringify(
        {
            "email": email
        }), 
    {headers: headers}).catch(this.error.errorHandler)
    .map((response: Response) => response.json());

}

updateProfile(obj)
{
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
        return this._http5.post("https://apis.geniecapture.com/user/updatecustomerprofile/",obj).catch(this.error.errorHandler)
        .map((res: Response) => res.json())

}


}