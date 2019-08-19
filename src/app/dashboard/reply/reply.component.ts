import { Component, OnInit } from '@angular/core';
// import { CustomerService } from './dashboard/';
// import { FormGroup } from '@angular/forms';
import {
  FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { CustomerService} from '../customer-support/customer-service';
import { from } from 'rxjs';
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  replyid;
  show;
  form : FormGroup ;
  model = {};
  des;
  constructor(private support : CustomerService, private fb : FormBuilder) { }

  ngOnInit() {
    this.form= this.fb.group({
      des : new FormControl("", Validators.required )
    });
    window.scroll(0,0);
    this.replyid =localStorage.getItem('queryidget');
    // alert(this.replyid);
    this.showrecord();
  
  }
  subjests;
  showrecord(){
    this.support.eachview(this.replyid).subscribe(data => {
     
this.show = data.reply_ticket;
this.subjests = data;
// alert(this.show);
console.log(this.subjests);
    })
  }
descriptionpost(){
  this.support.postdesc(this.form.value['des'], this.replyid).subscribe(data => {
console.log(this.form.value['des']);
this.showrecord();

  })
  this.form.reset();
 
}
}
