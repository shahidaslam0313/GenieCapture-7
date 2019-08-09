import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard-services/dashboard.service';
import {
    MatDialog,
    MatDialogConfig
  } from '@angular/material';
import { HelpDeskDialogComponent } from './help-dialog/help.dialog.component';
import { SearchQueryDialogComponent } from './search-query-dialog/search.query.dialog.component';
import { SharedService } from '../../dashboard-services/shared.services';
@Component({
    selector: 'helpdesk',
    templateUrl: 'helpdesk.component.html',
    styleUrls:['./helpdesk.component.scss']
})
export class HelpDeskComponent implements OnInit {
  length: any;
  customers: any;
  queries:any;
  email;

    constructor(private sharedService:SharedService,public dialog: MatDialog,private registeredUsers:DashboardService) { }
    ngOnInit() { 
    this.email={
        username:atob(localStorage.getItem("iii-yyyy"))
      }
        this.tickets(this.email);
    }
  
    tickets(email){
      this.registeredUsers.tickets(email).subscribe(res=>
        { 
       this.queries=res
       for (var i in this.queries) {
        if (this.queries[i].message.length > 20) {
        
          this.queries[i].message =  this.queries[i].message.substring(0,15)+"...";
                     
        }
         
      }
      this.queries=this.queries
       this.queries.reverse()
        this.length=this.queries.length}
        )
    }
    replyDialog(i): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          data: i
        };
        this.dialog.open(HelpDeskDialogComponent, dialogConfig.data)
      }
      searchDialog(): void {
        const dialogRef = this.dialog.open(SearchQueryDialogComponent);
          dialogRef.afterClosed().subscribe(result => {
            this.length=result["length"]
            this.queries=result["data"];
            for (var i in this.queries) {
              if (this.queries[i].message.length > 20) {
              
                this.queries[i].message =  this.queries[i].message.substring(0,15)+"...";
                           
              }
               
            }
            this.queries=this.queries
          });
        }
        refresh(){
          this.tickets(this.email);
        }
}