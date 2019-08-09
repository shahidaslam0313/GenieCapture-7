

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { SharedData } from '../shared-service';
import {Http,Response} from '@angular/http';

@Injectable()
export class PartnerShipService {

    constructor(private http: Http,private error:SharedData) {
       
        
    }
    partnership(obj){

    return this.http.post('https://apis.geniecapture.com/user/patnerships/',obj).catch(this.error.errorHandler).map((response: Response) => response.json());
    }
}

 