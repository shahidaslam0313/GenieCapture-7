import {
  Component,
  OnInit
} from '@angular/core';
import swal from 'sweetalert2';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  AuthService
} from "angular4-social-login";
import {
  SharedData
} from '../shared-service';
import {
  DownloadService
} from '../serv/download.service';
import {
  NgProgress
} from 'ngx-progressbar';

declare const $: any;

//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
  path: '/dashboard',
  title: 'Dashboard',
  type: 'link',
  icontype: 'dashboard'
},

];
@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
})

export class SidebarComponent implements OnInit {

  constructor(public ngProgress: NgProgress, private _nav: Router, public _shareData: SharedData, private download: DownloadService) {

  }

  local;
  url: string;
  logout() {
    window.location.replace("/login");
    localStorage.removeItem("access_token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("gnifp")
    // swal({
    //   type: 'success',
    //   title: 'Successfully Logged out',
    //   showConfirmButton: false,
    //   timer: 2000
    // });
    // this._nav.navigate(["/login"]);
  }

  ngOnInit() { }

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
      }
      else {
        this._nav.navigate(['/pricing'])
      }
    }, error => {
      this._shareData.AlertBox("error", JSON.stringify(error));
    })
  }

}