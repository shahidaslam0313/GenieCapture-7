import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import {SharedData } from './../shared-service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SalePopUpComponent } from './popup-dialog/pop-up.dialog.component';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})

export class HomeComponent implements OnInit{
  @ViewChild('openModal') openModal: ElementRef;
  text:any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "Weeks",
    Days: "Days",
    Hours: "Hrs",
    Minutes: "Mins",
    Seconds: "Secs",
    MilliSeconds: "MilliSeconds"
  };
  endRequest;
  loaded = false;
  CategoryCheck=false;
  public query: any;
  public Rfp: any;
  public selected: any;
  state: any = [];
  cat: any = [];
  category;
  item;
  posted = '';
  enter;
  record: any = [];
  local;
  uname;
  subscribe;
  search: boolean = false;
  enterdate;
  duedate;
  states;
  cates;
  status;
  session;

  public items:object[] = [];
  constructor(public _shareData: SharedData,public dialog: MatDialog) {
    this.items = [
      {
        title: 'Give e-Learning Wings',
        back: "url(https://cloud.geniecapture.com/sliders/banner_1.gif)",
        para: 'GenieCapture propels your organization to the next level with Creation & Consumption of Highly Interactive e-Learning Content for your Training Audience.',
        button: 'Download',
        routes:'/pricing'
      },
      {
        title: 'Unbeatable Price - One Platform',
        back: "url(https://cloud.geniecapture.com/sliders/banner_2.gif)",
        para: 'GenieCapture accelerates your business and students by sharing knowledge and adopt software the Smart Way!',
        button: 'Subscribe',
        routes:'/pricing'
      },
      {
        title: 'Super-Fast, Super-Easy',
        back: "url(https://cloud.geniecapture.com/sliders/banner_3.gif)",
        para: 'GenieCapture makes e-Learning and Software Adoption a breeze with Highly Interactive Software & Video Simulation Training Content!',
        button: 'Free 7-Day Trial',
        routes:'/pricing'
      }
    ]
      }

  public carouselOne: NgxCarousel

  ngOnInit() { 
    setTimeout(() => {
      this.openModal.nativeElement.click();
    }, 200);

   this.showPopUp(1563009720000);
   this.timers();
  }
  showPopUp(oldtime)
  {
//    var dialogConfig = new MatDialogConfig();
//    dialogConfig.position = {
//     top: '0',
//     left: '0'
// };
    let now = new Date().getTime()
    let olddate = new Date(oldtime).getTime()
    var distance = olddate - now;
      if(distance > 0)
      {  
        this.dialog.open(SalePopUpComponent, {
        });
      }
  }
  
check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser')
      let pars = JSON.parse(this.local)
      this.uname = pars.username
      return true
    }
    else if (sessionStorage.getItem('currentUser')) {
      this.session = sessionStorage.getItem('currentUser')
      let pars = JSON.parse(this.session)
      this.uname = pars.username
      return true
    }
    else {
      return false
    }
  }
  totaltime;
  timers(){
    this._shareData.gettimer().subscribe( data => {
 
      this.totaltime = data.json();
      // alert(this.totaltime);
      console.log(this.totaltime);
   
    })
  }
  check_login2() {
    if (localStorage.getItem('iii-yyyy')) {
      this.local = localStorage.getItem('iii-yyyy');
      let pars = JSON.parse(this.local);
      this.uname = pars.username;
      return true;
    } else {
      return false;
    }  
   
  }
  ngAfterContentInit() {
    this.carouselOne = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 3,
      point: { visible: false },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner',
      easing: 'ease'
    }
  }

}

