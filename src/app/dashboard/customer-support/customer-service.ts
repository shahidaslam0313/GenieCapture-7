import { Injectable } from "@angular/core";
import {
    HttpClient
} from '@angular/common/http';
import { SharedData } from '../../shared-service';
import { Http , Headers, Response} from "@angular/http";


@Injectable()
export class CustomerService{
    currentUser;
    constructor(private http:HttpClient,private error:SharedData , private https : Http){
        this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    }
    support(email){     
return this.http.post("https://apis.geniecapture.com/user/help/",email).catch(this.error.errorHandler)
    }
    supporttiket(){    
        // alert(this.currentUser.token);
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        headers.append('Content-Type', 'application/json'); 
        return this.https.get("http://192.168.29.171:9000/user/all_user_tickets/",   {headers: headers}).map((res : Response) => res.json())
            }
            
            eachview(id){
                let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
                headers.append('Content-Type', 'application/json');    
                return this.https.get('http://192.168.29.171:9000/user/reply_ticket_User/' + id + '/', {headers: headers}).map((response: Response) => response.json());
 
           }

           postdesc( des, id){  
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');     
            headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);   
    return this.https.post("http://192.168.29.171:9000/user/reply_ticket_User/" + id + '/',    
     JSON.stringify({
        
    "description": des,
    }), { headers: headers })
        }

}