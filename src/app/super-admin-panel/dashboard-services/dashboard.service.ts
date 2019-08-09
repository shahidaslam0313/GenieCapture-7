import {
    Injectable
} from "@angular/core";
import {
    HttpClient
} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {
    private url:any="https://apis.geniecapture.com/user/"
    constructor(private http: HttpClient) {

    }
    tickets(email) {
        return this.http.post(this.url+"helpinformation/", email)
    }
    registeredCutomers(email) {
        return this.http.post(this.url+"userinformation/", email)
    }
    replyCustomer(email) {
        return this.http.post(this.url+"reply/", email)
    }
    purchaseInfo(email){
        return  this.http.post(this.url+'PurchaseHistory/',email)
    }
    
    searchInfo(obj){
        return  this.http.post(this.url+'searchuser/',obj)
    }
    searchQuery(obj){
        return  this.http.post(this.url+'searchquery/',obj)
    }
    verifyLink(email){
        return  this.http.post(this.url+'resendcode/',email)
    }
    siteTickets(email) {
        return this.http.post(this.url+"contactusinformation/", email)
    }
    replySiteCustomer(email) {
        return this.http.post(this.url+"contactusreply/", email)
    }
    searchSiteQuery(obj){
        return this.http.post(this.url+"contactussearchquery/", obj)   
    }
    searchPayment(obj){
        return this.http.post(this.url+"searchadminpurchasehistory/", obj)   
    }
    paymentDetails(email){
        return this.http.post(this.url+"adminpurchasehistory/",email)
    }
    get_user_status() {

        return this.http.get('https://apis.geniecapture.com/user/maindashboard/', );
    }
   
}