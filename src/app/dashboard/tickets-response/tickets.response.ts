import {
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {
    TicketService
} from './tickets-service';
import { SharedData } from '../../shared-service';
@Component({
    selector: 'tickets',
    templateUrl: 'tickets.response.html',
    styleUrls: ['./tickets.response.scss']
})
export class QueryResponseComponent implements OnInit {
    data: any;
    errorMsg;
    errorHeading;
    err=true;
    constructor(private shared:SharedData,private ticketService: TicketService, private route: ActivatedRoute, private nav: Router) {}

    ngOnInit() {
        this.route.params.subscribe(res => {
            this.track(res.code)
            localStorage.setItem("exdocse", btoa(res.code))
        })
        if (localStorage.getItem('access_token') != null) {
            this.track(atob(localStorage.getItem("exdocse")))
        } else {
            this.nav.navigate(["./login/ticket/", "12CYVyw3"])
        }
    }
    track(code) {
        this.ticketService.track(code).subscribe(res => {
            if (res["status"] == "True") {
                this.err=false;
                this.data = res["data"];
                for (var i in this.data) {
                    if (this.data[i].message.length > 20) {
                    
                      this.data[i].message =  this.data[i].message.substring(0,15)+"...";
                                 
                    }
                     
                  }
                  this.data=this.data
               } else {
                this.err = true
              this.errorMsg = res["message"]
                this.errorHeading = res["heading"]
            }
        },err=>{
            this.errorHeading="Something went wrong"
           this.shared.AlertBox("error",err)
        })
    }
}