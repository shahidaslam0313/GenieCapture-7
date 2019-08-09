import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';

import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RegisterService {

constructor(private _http5: HttpService,private _http1: Http ) {}

loaded:boolean =false;
errorMsg: string;
login(username: string, password: string) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return this._http5.post('https://apis.geniecapture.com/user/jwttoken/',
    JSON.stringify({username: username, password: password }), {headers: headers})
    .map((response: Response) => {
      let user =  { username: username, token: response.json().token};

      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.getItem('currentUser')
      }
    });
}

email_exist(email){
    return this._http1.post('https://apis.geniecapture.com/user/emailexist/',{
        'email':email
    }).map((res: Response) => res.json() ).catch(this.errorHandler)
}

login_authenticate(username){
    return this._http5.post('https://apis.geniecapture.com/user/jwttoken/',{
        'username':username
    }).map((res: Response) => res.json() ) 
}
post_service(para) :  Observable<any> 
{ 
return this._http5.post("https://apis.geniecapture.com/user/signup/",para).catch(this.errorHandler) 
      }


activation_service(email){
    return this._http5.post("https://apis.geniecapture.com/user/verifysignupemail/",{
        'email':email
    }).map((res: Response) => res.json() ) 
}

authenticate_service(uid) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://apis.rfpgurus.com/activate/'+uid,
    {headers: headers}).map((response: Response) => response.json());

}

verify_code(obj): Observable<any> {
    return this._http5.post('https://apis.geniecapture.com/user/verifysignupemail/',obj).catch(this.errorHandler)
    }
    verify_fcode(obj3): Observable<any> {
      return this._http5.post('https://apis.geniecapture.com/user/resetdesktop/',obj3).catch(this.errorHandler)
      }
    resend_code(obj2): Observable<any> {
        return this._http5.post('https://apis.geniecapture.com/user/resendcode/',obj2).catch(this.errorHandler) 
        }
    
private datass1 = new BehaviorSubject<any>(null);
  dataa1 = this.datass1.asObservable();
  changeDataa1(dataa1: any) {
    this.datass1.next(dataa1);
  }

private datass2 = new BehaviorSubject<any>(null);
  dataa2 = this.datass2.asObservable();
  changeDataa2(dataa2: any) {
    this.datass2.next(dataa2);
  }
recoverpass(email):Observable<any>
{
  return this._http1.post('https://apis.geniecapture.com/user/resetdesktop/',email).catch(this.errorHandler).map((res: Response) => res.json())
}

  errorHandler(error: HttpErrorResponse) {
    if (error.status != null && error.statusText != null) {
      if (error.status == 0) {
        this.errorMsg = "Can't Connect to Server, Please Try Again!";
      }
      else
        this.errorMsg = error.status + " (" + error.statusText + ")";
    }
    else if (error.message != null) {
      this.errorMsg = error.message;
    }
    else {
      this.errorMsg = "Server Error";
    }
    return Observable.throw(this.errorMsg);
}
}