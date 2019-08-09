import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class FooterService {

    constructor(private http: Http, private _nav: Router) { }

    subcribe(email) {
        return this.http.post('https://apis.geniecapture.com/user/subscriptionemail/',
            {
                'email': email
            })
    }
}