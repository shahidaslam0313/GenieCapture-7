import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Injectable } from "@angular/core";
import { Headers, Response } from "@angular/http";
import { JwtHelper } from "angular2-jwt";
import "rxjs/add/operator/map";
import { HttpService } from "./../serv/http-service";
import { SharedData } from "../shared-service";

@Injectable()
export class LoginService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _http5: HttpService, public error:SharedData) {}

  loaded: boolean = false;
  myvar
  url="https://apis.geniecapture.com/";
  url2="https://apis.geniecapture.com/user/jwttoken/"

  login(username: string, password: string) {
  const headers = new Headers();
    headers.append("Content-Type", "application/json");
return this._http5
      .post("https://apis.geniecapture.com/user/jwttoken/",
        JSON.stringify({ username: username, password: password }),
        { headers: headers }
      ).catch(this.error.errorHandler)
      .map((response: Response) => {
        let user = {
          userid: this.jwtHelper.decodeToken(response.json().token).user_id,
          username: this.jwtHelper.decodeToken(response.json().token).username,
          token: response.json().token,
        };
        
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("xxccmdmdmmdmd",btoa(user.username));
       return response.json();
     
      });
  }

  login_authenticate(email) {
return this._http5
      .post("https://apis.geniecapture.com/user/verifysignupemail/", {
        email: email
      })
      .map((res: Response) => res.json());
  }
  post_service(obj) {
   return this._http5
      .post("https://apis.geniecapture.com/user/signup/", {
        obj: obj
      })
      .map((res: Response) => res.json());
  }
 forget_password(email) {
     return this._http5
      .post("https://apis.geniecapture.com/user/resetdesktop/", {
        email: email
      })
      .map((res: Response) => res.json());
  }

  saveData(value){
 this.myvar = value;
  }
}
