import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import {
    LoginComponent
} from '../super-admin-panel/login/login.component';
import {
    DashboardComponent
} from '../super-admin-panel/dashboard-components/dashboard/dashboard.component';
import {
    OnlyLoggedInUsersGuard,
    OnlyLoggedOutUsersGuard
} from './auth-guards/authentication-guards';
import {
    HomeComponent
} from './dashboard-components/home/home.component';
import {
    PurchaseInfoComponent
} from './purchase-info/purchase-info.component';
import {
    CustomerComponent
} from './dashboard-components/customers/customer.component';
import { ContactUsComponent } from './dashboard-components/contact-us/contact.component';
import { PaymentComponent } from './dashboard-components/payment-details/payment.component';
import { DashboardDetailComponent } from './dashboarddetail/dashboarddetail.component';

const ADMIN_ROUTER: Routes = [{
        path: '',
        component: LoginComponent,
        canActivate: [OnlyLoggedOutUsersGuard],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [OnlyLoggedInUsersGuard],
        children: [{
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'contact',
                component: ContactUsComponent
            },
            {
                path: '',
                component: CustomerComponent
            }, {
                path: 'purchases/:code',
                component: PurchaseInfoComponent
            },{
                path:'payment-details',
                component:PaymentComponent
            },
            {
                path:'dashboarddetail',
                component: DashboardDetailComponent
            }

        ]
    }



];


export const superAdminRouter: ModuleWithProviders = RouterModule.forChild(ADMIN_ROUTER)