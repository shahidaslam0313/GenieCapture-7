import { Component, OnInit } from '@angular/core';
import {
    MatDialog,
    MatDialogConfig
  } from '@angular/material';
import { DashboardService } from '../dashboard-services/dashboard.service';
import { SiteDeskDialogComponent } from './help-dialog/help.dialog.component';
import { SearchSiteQueryDialog } from './search-site-query-dialog/search.query.dialog.component';
@Component({
    selector: 'site-helpdesk',
    templateUrl: 'site-helpdesk.component.html',
    styleUrls:['./site-helpdesk.component.scss']
})

export class SiteHelpDeskComponent implements OnInit {
  length: any;
  customers: any;
  queries:any;
  email;

    constructor(public dialog: MatDialog,private siteUsers:DashboardService) { }
    ngOnInit() { 
    this.email={
        username:atob(localStorage.getItem("iii-yyyy"))
      }
      this.tickets(this.email)
    }
  
    tickets(email){
      this.siteUsers.siteTickets(email).subscribe(res=>
        {  
          this.queries=res
          this.length=this.queries.length
          for (var i in this.queries) {
            if (this.queries[i].message.length > 20) {
            
              this.queries[i].message =  this.queries[i].message.substring(0,15)+"...";
                         
            }
             
          }
          this.queries=this.queries
          this.queries.reverse()
          console.log(this.queries)
       })
    }
    replyDialog(i): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          data: i
        };
        this.dialog.open(SiteDeskDialogComponent, dialogConfig.data)
      }
      searchDialog(): void {
        const dialogRef = this.dialog.open(SearchSiteQueryDialog);
          dialogRef.afterClosed().subscribe(result => {
           if(result!=undefined)
           {
            this.length=result["length"]
            this.queries=result["data"];
            for (var i in this.queries) {
              if (this.queries[i].message.length > 20) {
              
                this.queries[i].message =  this.queries[i].message.substring(0,15)+"...";
                           
              }
               
            }
            this.queries=this.queries
           }
          });
        }
        refresh()
        {
          this.tickets(this.email)
        }
       }
     
       
    