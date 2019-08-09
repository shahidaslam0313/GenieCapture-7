import {
    Injectable
} from "@angular/core";
import {
    HttpClient
} from '@angular/common/http';


@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {

    }
    loginService(email) {
        return this.http.post("https://apis.geniecapture.com/user/adminlogin/", email)
    }
}