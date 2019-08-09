import { Injectable } from "@angular/core";
import {
    HttpClient
} from '@angular/common/http';
import { SharedData } from '../../shared-service';

@Injectable()
export class CustomerService{
    currentUser;
    constructor(private http:HttpClient,private error:SharedData){
        this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    }
    support(email){     
return this.http.post("https://apis.geniecapture.com/user/help/",email).catch(this.error.errorHandler)
    }
    supporttiket(){    
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        headers.append('Content-Type', 'application/json'); 
        return this.http.post("http://192.168.29.234:8000/super/testimages/",   {headers: headers}).catch(this.error.errorHandler)
            }
}