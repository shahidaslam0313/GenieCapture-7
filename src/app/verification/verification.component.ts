import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  data
  ngOnInit() {
    this.route.params.subscribe(res => {
      this.verify(res.code)
    })
  }

  verify(code) {
    this.http.get(`https://apis.geniecapture.com/user/verifysignuplink/${code}/`).subscribe(res => {
      this.data=res
    
       })
  }
}