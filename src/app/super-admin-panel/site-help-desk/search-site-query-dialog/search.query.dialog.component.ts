import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { DashboardService } from '../../dashboard-services/dashboard.service';
import { SharedService } from '../../dashboard-services/shared.services';

@Component({
  selector: 'search-site-query',
  templateUrl: 'search.query.dialog.html',
  styleUrls: ['../../site-help-desk/search-site-query-dialog/search.query.dialog.scss']
})
export class SearchSiteQueryDialog implements OnInit {

  constructor(private sharedService:SharedService,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef <SearchSiteQueryDialog> , private fb: FormBuilder, private searchService: DashboardService) {

  }
  form: FormGroup
  status=[{value:true,viewValue:"Resolved"},
  {value:false,viewValue:"Not Resolved"}]
  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl(''),
      email:new FormControl(''),
      contact:new FormControl(''),
      status:new FormControl('')
    })

    }
  search(){
    let obj={
      ...this.form.value      
     }
       this.searchService.searchSiteQuery(obj).subscribe(res=>
         { 
           this.dialogRef.close(res);
         })  
   
}
}