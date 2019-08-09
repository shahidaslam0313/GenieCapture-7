 import { Injectable } from '@angular/core';
import { Http, Headers,  Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import { SharedData } from '../../shared-service';
@Injectable()
export class TicketService {

  constructor(private http: Http, private _nav: Router,public error:SharedData) { }
  track(code) {
  return  this.http.get(`https://apis.geniecapture.com/user/trackyourticket/${code}/`).catch(this.error.errorHandler)
    .map((res: Response) => res.json())
  }

}