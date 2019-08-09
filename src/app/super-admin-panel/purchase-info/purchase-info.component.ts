import {
    Component,
}
from '@angular/core';
import { DashboardService } from '../dashboard-services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../dashboard-services/shared.services';

@Component({
        selector: 'purchase-info',
        templateUrl: './purchase-info.component.html',
        styleUrls: ['./purchase-info.component.scss']
    }

) 
export class PurchaseInfoComponent {
    personal
    noMethodSaved;
    email;
    code
    spent;
    pagenumber;
    pages;
    show;
    next = false;
    previous = true;
    pagenum = 1;
    constructor(private sharedService:SharedService,private purchaseInfo: DashboardService,private route:ActivatedRoute) {}
    ngOnInit() {
        this.route.params.subscribe(res => {
            this.code=res.code
        }) 
       
        let obj={
           email: atob(this.code)
        }
        this.purchaseInfo.purchaseInfo(obj).subscribe(res=>{
            this.spent=res["TotalAmount"]
            if (res[0] != "okay") {
                this.pages = res["Totalpage"];

                if (res["Totalpage"] > 1) {
                    this.show = true
                }
            }
            this.Response(res)
        }
        , error => {
            this.sharedService.AlertBox('error',"Sorry", error)
        }
    )
    }
    nextPage() {
        this.previous = false;
        this.pagenum = this.pagenum + 1;
         this.PurchaseHistory(this.pagenum);
          if (this.pagenum == this.pages) {
            this.next = true;
        }
    }
    previousPage() {
        this.pagenum = this.pagenum - 1;
         this.PurchaseHistory(this.pagenum) 
         if (this.pagenum == 1) {

            this.previous = true;
            this.next = false;
        }
    }

    PurchaseHistory(x) {
        this.pagenumber = x
        let obj = {
            email: atob(this.code),
            page: this.pagenumber
        }
        this.purchaseInfo.purchaseInfo(obj).subscribe(res => {
                this.Response(res)
            }
            ,
            error => {
                this.sharedService.AlertBox('error','Sorry', error)
            }
        )
    }
    firstPage() {
        this.PurchaseHistory(1);
        this.pagenum = 1;
        this.previous = true;
        this.next = false;
    }
    LastPage() {
        this.PurchaseHistory(this.pages);
        this.pagenum = this.pages;
        this.previous = false;
        this.next = true;
    }
    Response(res) {
        this.personal = res["data"];

        if (res[0] == "okay") {
            this.noMethodSaved = true
        } else {
            this.noMethodSaved = false
            for (var i = 0; i <= res["data"].length - 1; i++)
                if (this.personal[i].package == 1) {
                    this.personal[i].package = "Monthly"
                }

            else if (this.personal[i].package == 12) {
                this.personal[i].package = "Yearly"
            } else if (this.personal[i].package == 0) {
                this.personal[i].package = "Trial"
            }

            for (var i = 0; i < res["data"].length; i++) {
                if (this.personal[i].activepayment == true) {
                    this.personal[i].activepayment = "Active"
                } else if (this.personal[i].activepayment == false) {
                    this.personal[i].activepayment = "Expired";
                }
            }
        }


    }
}
