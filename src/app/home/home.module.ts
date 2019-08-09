import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { MaterialModule } from '../app.module';
// import { CountdownModule } from 'ng2-countdown-timer';
import { CountdownModule } from "ng2-countdown-timer";
import { CountdownTimerModule } from 'ngx-countdown-timer';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MaterialModule,
        CountdownTimerModule,
        CountdownModule
    ],
    declarations: []
})

export class HomeModule {}
