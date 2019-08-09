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
  selector: 'search-payment',
  templateUrl: 'search.payment.dialog.html',
  styleUrls: ['../../payment-details/payment-search-dialog/search.payment.dialog.scss']
})
export class SearchPaymentDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef < SearchPaymentDialogComponent> , private fb: FormBuilder, private searchService: DashboardService) {

  }
  form: FormGroup
  status=[{value:true,viewValue:"Active"},
  {value:false,viewValue:"Expired"}]
  package=[{value:0,viewValue:"Free Trial"},
  {value:1,viewValue:"Monthly"},
  {value:12,viewValue:"Yearly"}]
  cards=[{
    value: 'Visa',
    viewValue: 'Visa Card'
  },
  {
    value: 'Mastercard',
    viewValue: 'Master Card'
  },
  {
    value: 'American Express',
    viewValue: 'American Express'
  },
  {
    value: 'Discover',
    viewValue: 'Discover'
  }

]
  ngOnInit() {
    this.form = this.fb.group({
      cardholder: new FormControl(''),
      nickname:new FormControl(''),
      card_type:new FormControl(''),
      status:new FormControl(''),
      package:new FormControl(''),
      email:new FormControl('')
    })

    }
  search(){
    let obj={
      ...this.form.value      
     }
       this.searchService.searchPayment(obj).subscribe(res=>
         { if(res!="No data found") 
           {
             this.dialogRef.close(res);
           }
           else{
            this.dialogRef.close();
           }
         })  
   
}
}