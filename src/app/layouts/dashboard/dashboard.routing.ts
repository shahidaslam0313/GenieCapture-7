import { Routes } from '@angular/router';
 
import { DashboardComponent } from './dashboard.component';

export const ConsumerDashboardRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: DashboardComponent
    }]
}
];
