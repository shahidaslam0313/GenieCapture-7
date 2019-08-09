import {
  Component,
  OnInit,
  AfterContentInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  HeaderService
} from './header.service';
import swal from 'sweetalert2';
import {
  SharedData
} from '../shared-service';
import {
  AuthService,
  SocialUser
} from "angular4-social-login";
import {
  Meta
} from '@angular/platform-browser';
import {
  SpeechRecognitionService
} from './speechservice';


import {
  DownloadService
} from '../serv/download.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent implements OnInit {
  // @ViewChild('openModal') openModal: ElementRef;

  public blink = false;
  @Output() spokenText = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();
  @Input() showInput = true;
  text;
  onError(event) {
    console.log(event, "error")
  }
  response(event) {
    console.log(event, 'text')
    this.query = event;
  }

  uname;
  session;
  local;
  name;
  id;
  title;
  show: boolean = false;
  state: any = [];
  cat: any = [];
  loaded = false;
  public query: any;
  public Rfp: any;
  public selected: any;
  category;
  wrfp;
  mainSearch = 0;
  closeSearch() {
    if (this.mainSearch == 1) {
      this.mainSearch = 0;
      this.query = '';
      this.Rfp = '';
    }
  }
  focusInput() {
    if (this.mainSearch == 1) {
      let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('.search-holder input')[0];
      inputField.focus();
    }
  }
  openSearch(): void {
    this.mainSearch = 1;
    // setTimeout(this.focusInput(), 5000);
  }

  constructor(private speech: SpeechRecognitionService, private authService: AuthService, private _nav: Router, public _shareData: SharedData, private _serv: HeaderService, private download: DownloadService) { }
  logout() {
    // this.authService.signOut().then(success => {
    //   console.log("true", success)
    // }, error => {
    //   console.log("error", error)
    // });
    window.location.reload()
    localStorage.removeItem("access_token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("gnifp")
  
    // swal({
    //   type: 'success',
    //   title: 'Successfully Logged out',
    //   showConfirmButton: false,
    //   timer: 2000
    // });

    this._nav.navigate(['/']);
  }
  triggerMike() {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('please upgrade');
    } else {

      this.blink = true;
      this.search();
    }
  }
  search(): void {
    this.speech.record().subscribe((text) => {
      this.query = text;
      this.blink = false;
      this.spokenText.emit(this.query);
      this.speech.stop();
    });
  }
  single(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }

  deletenofication(id) {
    this._serv.deletenotify(id).subscribe(

      data => {

        // this.notification();
      },
      error => {
        // console.log(error);
      });
  }
  updatenofication(id) {
    this._serv.Updatenotify(id).subscribe(

      data => {

        // this.notification();
      },
      error => {
        // console.log(error);
      });
  }
  user
  ngOnInit() {
    this.check_login;
     }

  downloads() {
    this.local = localStorage.getItem('currentUser');
    let pars = JSON.parse(this.local);
    let obj = {
      email: pars.username
    }
    this.download.Download(obj).subscribe(res => {
      if (res.message == "Success") {
        let link = document.createElement("a");
        link.download = "GenieCapture.exe";
        link.href = "https://cloud.geniecapture.com/Installer/GenieCapture.exe";
        link.click();
      } else if (res.message == "False") {
        this._shareData.AlertBox("warning", "You have already downloaded please contact us");
      } else {
        this._nav.navigate(['/pricing'])
      }
    }, error => {
      this._shareData.AlertBox("error", JSON.stringify(error));
    })
  }
  check_login() {

    if (localStorage.getItem('access_token') != null) {


      return true;
    } else {

      return false;
    }


  }


}