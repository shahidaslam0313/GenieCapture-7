import {
  Component,
  OnInit,
} from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material';
@Component({
  selector: 'pop-up',
  templateUrl: 'pop-up.html',
  styleUrls: ['../popup-dialog/pop-up.scss']
})
export class SalePopUpComponent implements OnInit {
  SaleOff: boolean;Dayss = 0; Hourss = 0; Minutess = 0; Secondss = 0;
  constructor(public dialogRef: MatDialogRef <SalePopUpComponent>) {

  }
  ngOnInit() {
    this.Timer(1563009720000)
  }
  Timer(oldtime) {
    var x = setInterval(() => {
      this.SaleOff=true;
      let now = new Date().getTime()
      let olddate = new Date(oldtime).getTime()
      var distance = olddate - now;
      this.Dayss = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.Hourss = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.Minutess = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.Secondss = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        this.SaleOff=false;
        this.Dayss = 0;
        this.Hourss = 0;
        this.Minutess =0;
        this.Secondss =0;
        clearInterval(x);
      }
    }, 1000);
  }
  close()
  {
    this.dialogRef.close()
  }
}