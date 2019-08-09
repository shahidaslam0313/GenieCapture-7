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
  Validators
} from '@angular/forms';
import { DashboardService } from '../../dashboard-services/dashboard.service';
import { SharedService } from '../../dashboard-services/shared.services';

@Component({
  selector: 'help',
  templateUrl: 'help.dialog.html',
  styleUrls: ['../../site-help-desk/help-dialog/help.dialog.scss']
})
export class SiteDeskDialogComponent implements OnInit {

  constructor(private sharedService:SharedService,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef < SiteDeskDialogComponent > , private fb: FormBuilder, private replyService: DashboardService) {

  }
  form: FormGroup
  query
  ngOnInit() {
    this.query=this.data["message"]
    this.form = this.fb.group({
      message: new FormControl('',Validators.required),
      email:new FormControl({value: this.data['email'], disabled:true})
    })
    }
  reply(){
    let obj={
      id:this.data["id"],
      question:this.query,
      email:this.data['email'],
      ...this.form.value      
    }
      this.replyService.replySiteCustomer(obj).subscribe(res=>
        {if(res["status"]==true){
          this.sharedService.AlertBox("success","Sent",res["message"])
          this.dialogRef.close()
        } else{
          this.sharedService.AlertBox("error","Sorry",res["message"])
        }
      })    
  }
  
}