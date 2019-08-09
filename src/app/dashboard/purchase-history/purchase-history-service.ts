import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { SharedData } from '../../shared-service';
import {Http, Headers , Response} from '@angular/http';
@Injectable()
export class PurchaseHistoryService {
    currentUser;
    constructor(private http: Http,private error:SharedData) {
       
            this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    }
    getPurchaseHistory(email){
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        headers.append('Content-Type', 'application/json');
return this.http.post('https://apis.geniecapture.com/user/PurchaseHistory/',email,{headers: headers}).catch(this.error.errorHandler).map((response: Response) => response.json());
    }
}