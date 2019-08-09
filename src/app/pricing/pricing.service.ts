import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';
import { SharedData } from '../shared-service';

@Injectable()
export class PricingService {
currentUser
constructor(private _http5: HttpService , public error:SharedData) {
    
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));    
}
loaded:boolean =false;
package_free(obj)
{
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
        return this._http5.post("https://apis.geniecapture.com/user/postcr/",obj).catch(this.error.errorHandler)
 .map((res: Response) =>(res.json()))

}
gettimer(){
  return this._http5.get('https://apis.rfpgurus.com/super/timer_for_sale/')
}
zipcode(zip) {
   
    return this._http5.get('https://apis.rfpgurus.com/zipcode/' + zip + '/').map((response: Response) => response.json());
  }
SavedMethods(obj)
{
    let headers = new Headers({'Authorization': 'JWT ' + localStorage.getItem("access_token")});
    headers.append('Content-Type', 'application/json');
        return this._http5.post("https://apis.geniecapture.com/user/savedcardInplaceorder/",obj).catch(this.error.errorHandler)
 .map((res: Response) =>(res.json()))

}
payByDefault(obj)
{let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
headers.append('Content-Type', 'application/json');
  return  this._http5.post('https://apis.geniecapture.com/user/placeorder/',obj).catch(this.error.errorHandler)
    .map((res: Response) =>(res.json()))
   
}
}