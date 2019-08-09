import {
    Component,

}

from '@angular/core';

import {
    PurchaseHistoryService
}

from './purchase-history-service';

import {
    SharedData
}

from '../../shared-service';

@Component({
        selector: 'app-purchase-history',
        templateUrl: './purchase-history.component.html',
        styleUrls: ['./purchase-history.component.scss']
    }

) export class PurchaseHistoryComponent {

    constructor(private history: PurchaseHistoryService, private alert: SharedData) {}

    email;
    personal;
    noMethodSaved;
    pagenumber;
    pages;
    show;
    next = false;
    previous = true;
    pagenum = 1;

    ngOnInit() {
        let user = JSON.parse(localStorage.getItem("currentUser"));
        this.email = user.username;
        let obj = {
            email: this.email,
        }
        this.history.getPurchaseHistory(obj).subscribe(res => {
                if (res[0] != "okay") {
                    this.pages = res["Totalpage"];

                    if (res["Totalpage"] > 1) {
                        this.show = true
                    }
                }
                this.Response(res)
            }
            , error => {
                this.alert.AlertBox('error', error)
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
            email: this.email,
            page: this.pagenumber
        }
        this.history.getPurchaseHistory(obj).subscribe(res => {
                this.Response(res)
            }
            ,
            error => {
                this.alert.AlertBox('error', error)
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
