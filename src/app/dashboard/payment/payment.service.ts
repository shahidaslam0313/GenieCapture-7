

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
import { SharedData } from '../../shared-service';

@Injectable()
export class PaymentService {
    currentUser;
    checker;
constructor(private _http5: HttpService,private _http1: Http ,public error:SharedData) {
   
        this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
      
}
AddPaymentMethod(obj)
{
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
        return this._http5.post("https://apis.geniecapture.com/user/SavedPayment/",obj).catch(this.error.errorHandler)
 .map((res: Response) =>(res.json()))

}
SavedMethods(obj)
{
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
        return this._http5.post("https://apis.geniecapture.com/user/savedcardinfo/",obj).catch(this.error.errorHandler)
 .map((res: Response) =>(res.json()))

}
DeleteMethod(obj)
{
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
        return this._http5.post("https://apis.geniecapture.com/user/deletesavedcard/",obj).catch(this.error.errorHandler)
 .map((res: Response) =>(res.json()))

}
EditMethod(obj)
{
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
        return this._http5.put("https://apis.geniecapture.com/user/editcardinfo/",obj).catch(this.error.errorHandler)
 .map((res: Response) =>(res.json()))

}
zipcode(zip) {
   
    return this._http5.get('https://apis.rfpgurus.com/zipcode/' + zip + '/').map((response: Response) => response.json());
  }
}