import {
    Component,
    OnInit
} from '@angular/core';
import {
    SharedData
}
from '../shared-service';

import {
    HttpClient
} from '@angular/common/http';

import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'unsubscribe',
    templateUrl: 'unsubscribe.html',
    styleUrls: ['./unsubscribe.css']
})
export class UnsubscribeComponent implements OnInit {
  data
  show
  interestFormGroup : FormGroup
  interests:any;
  selected: any;
    constructor(private alert: SharedData,private fb: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.interestFormGroup = this.fb.group({
          interests: this.fb.array([])
        });
        setTimeout((res) => {
          this.interests = [ 
                "I am not comfortable with GenieCapture services",
                "I receive too many email from GenieCapture",
                "I am having difficulty in receiving emails from GenieCapture",
                "I do not think the \content is relevent"];
        });
      }  
      onChange(event) {
        const interests = <FormArray>this.interestFormGroup.get('interests') as FormArray;
        if(event.checked) {
          interests.push(new FormControl(event.source.value))
        } else {
          const i = interests.controls.findIndex(x => x.value === event.source.value);
          interests.removeAt(i);
        }
      }
      submit() {
          let email;
        this.route.params.subscribe(res => {
          email=res.email
        })
           let param=this.interestFormGroup.value;
            this.http.get(`https://apis.geniecapture.com/user/unsubscriptionemail/${email}/`,param).subscribe(res => {
            if(res["status"]=="True") 
         {   this.alert.AlertBox("success",res["message"])}
         else{
            this.alert.AlertBox("warning","You are not subscribe on GenieCapture")
         }
            })
        }
}