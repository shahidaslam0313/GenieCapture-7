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
  selector: 'search',
  templateUrl: 'search.dialog.html',
  styleUrls: ['../../customers/search-dialog/search.dialog.scss']
})
export class SearchComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef < SearchComponent > , private fb: FormBuilder, private searchService: DashboardService) {

  }
  form: FormGroup
  status=[{value:true,viewValue:"Active"},
  {value:false,viewValue:"Inactive"}]
  ngOnInit() {
    this.form = this.fb.group({
      fname: new FormControl(''),
      email:new FormControl(''),
      lname:new FormControl(''),
      active:new FormControl('')
    })

    }
  search(){
    let obj={
      ...this.form.value      
     }
       this.searchService.searchInfo(obj).subscribe(res=>
         { 
           this.dialogRef.close(res);
         })  
   
}
}