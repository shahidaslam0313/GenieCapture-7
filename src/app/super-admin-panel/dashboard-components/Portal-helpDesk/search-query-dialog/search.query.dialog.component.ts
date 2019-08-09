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
import { DashboardService } from '../../../dashboard-services/dashboard.service';

@Component({
  selector: 'search-query',
  templateUrl: 'search.query.dialog.html',
  styleUrls: ['../../Portal-helpDesk/search-query-dialog/search.query.dialog.scss']
})
export class SearchQueryDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef < SearchQueryDialogComponent> , private fb: FormBuilder, private searchService: DashboardService) {

  }
  form: FormGroup
  status=[{value:true,viewValue:"Resolved"},
  {value:false,viewValue:"Not Resolved"}]
  ngOnInit() {
    this.form = this.fb.group({
      category: new FormControl(''),
      email:new FormControl(''),
      query:new FormControl(''),
      status:new FormControl('')
    })

    }
  search(){
    let obj={
      ...this.form.value      
     }
       this.searchService.searchQuery(obj).subscribe(res=>
         { 
           this.dialogRef.close(res);
         })  
   
}
}