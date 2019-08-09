import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {
    Injectable
} from '@angular/core';
import {
    Http,
    Headers,
    Response
} from '@angular/http';
import 'rxjs/add/operator/map';
import {
    HttpService
} from './http-service';
import {
    SharedData
} from '../shared-service';

@Injectable()
export class DownloadService {
    currentUser;
    checker;
    constructor(private _http5: HttpService, private _http1: Http, public error: SharedData) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }
    Download(obj) {

        return this._http5.post("https://apis.geniecapture.com/user/checksubscription/", obj).catch(this.error.errorHandler)
            .map((res: Response) => (res.json()))

    }
}