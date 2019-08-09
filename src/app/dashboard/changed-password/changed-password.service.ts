import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
import { SharedData } from '../../shared-service';


@Injectable()
export class ChangedPasswordService {
    currentUser;
    
constructor( private _http5: HttpService , public error:SharedData) {
    
        this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
      
}

loaded:boolean =false;
user_change_password(obj){
    let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
      headers.append('Content-Type', 'application/json');
      return this._http5.post('https://apis.geniecapture.com/user/updatedpassword/',
      JSON.stringify(obj), 
      {headers: headers}).catch(this.error.errorHandler)
      .map((data: Response) => data.json()); 
}




}