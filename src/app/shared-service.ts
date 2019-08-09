import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Http, ResponseContentType } from '@angular/http';
import swal from "sweetalert2";


@Injectable()
export class SharedData {
  currentProducts;
  errorMsg;
  url="https://cloud.geniecapture.com/Installer/GenieCapture.exe";
  categorySubject = new BehaviorSubject<any>("");
  stateSubject = new BehaviorSubject<any>("");
  agencySubject = new BehaviorSubject<any>("");
  searchSubject = new BehaviorSubject<any>("");
  watchSubject = new BehaviorSubject<any>("");
  watchtotalSubject = new BehaviorSubject<any>("");
  currentMessage = this.watchSubject.asObservable();
  currentMessagetotal = this.watchtotalSubject.asObservable();
  constructor(private http2: Http, private http: HttpClient) {}
  watchtotal(message) {
    this.watchtotalSubject.next(message);
  }
  watchInfo(message) {
    this.watchSubject.next(message);
  }
  returnCategory() {
    return this.categorySubject;
  }

  categoryInfo(data) {
    this.categorySubject.next(data);
  }
  gettimer(){
    return this.http2.get('https://apis.rfpgurus.com/super/timer_for_sale/')
  }
  returnCat() {
    return this.categorySubject;
  }

  catInfo(data) {
    this.categorySubject.next(data);
  }
  //   returnwatch(){
  //     return this.watchSubject;
  // }

  // watchInfo(data){
  //     this.watchSubject.next(data);
  // }
  returnState() {
    return this.stateSubject;
  }

  stateInfo(path) {
    this.stateSubject.next(path);
  }

  returnSearch() {
    return this.searchSubject;
  }
  searchInfo(data) {
    this.searchSubject.next(data);
  }

  agencyInfo(path) {
    this.agencySubject.next(path);
  }
  returnagency() {
    return this.agencySubject;
  }

  private datass3 = new BehaviorSubject<any>(null);
  private datass4 = new BehaviorSubject<any>(null);
  dataa3 = this.datass3.asObservable();
  dataa4 = this.datass4.asObservable();
  changeDataa3(dataa3: any, dataa4: any) {
    this.datass3.next(dataa3);
    this.datass4.next(dataa4);
  }

  private datass5 = new BehaviorSubject<any>(null);
  dataa5 = this.datass5.asObservable();
  changeDataa5(dataa5: any) {
    this.datass5.next(dataa5);
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.status != null && error.statusText != null) {
      if (error.status == 0) {
        this.errorMsg = "Can't Connect to Server, Please Try Again!";
      }
      else
        this.errorMsg = error.status + " (" + error.statusText + ")";
    }
    else if (error.message != null) {
      this.errorMsg = error.message;
    }
    else {
      this.errorMsg = "Server Error";
    }
    return Observable.throw(this.errorMsg);
}

downloadExe(){
return this.http2
      .get(this.url,{
        responseType: ResponseContentType.Blob,  
        
      })
      .map(res => {
        console.log(res)
        return {
          filename: 'GenieCapture.exe',
          data: res.blob(),
        };
      })
}

checkDownload(email){
  return this.http.post("https://apis.geniecapture.com/user/download/",{
    'email':email
})
}
AlertBox(type,title){
  swal({type,title});
} 
}
