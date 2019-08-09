import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import {
  PartnerShipService
} from './partnership.service';
import {
  SharedData
} from "../shared-service";
@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.css']
})
export class PartnershipComponent implements OnInit {

  constructor(private service: PartnerShipService, private fb: FormBuilder, private alert: SharedData) {}
  form: FormGroup
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      name: ['', Validators.required],
      help: ['',Validators.required],
      companyname: ['', Validators.required]
    })

  }

  Partnership() {
    this.service.partnership(this.form.value).subscribe(res => {
      this.alert.AlertBox("success", res)
      this.form.reset()
    }, error => {
      this.alert.AlertBox("error", 'Something unhappened Please try again.')
      this.form.reset()
    })
  }

}
