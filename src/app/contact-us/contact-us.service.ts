import { Injectable } from '@angular/core';
import { Http, Headers,  Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import { SharedData } from '../shared-service';
@Injectable()
export class ContactUsService {

  constructor(private http: Http, private _nav: Router,public error:SharedData) { }
  contact(obj){
    let headers=new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});

    return this.http.post('https://apis.geniecapture.com/user/contactus/',obj).catch(this.error.errorHandler)
    .map((res: Response) => res.json())

  }
}