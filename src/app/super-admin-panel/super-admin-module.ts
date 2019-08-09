import {
    NgModule
} from '@angular/core';
import {
    superAdminRouter
} from './super.admin.routing'
import {
    LoginComponent
} from '../super-admin-panel/login/login.component';
import {
    MaterialModule
} from '../../app/app.module'
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    CommonModule
} from '@angular/common';
import {
    LoginService
} from '../super-admin-panel/login/login.service';
import {
    DashboardComponent
} from './dashboard-components/dashboard/dashboard.component';
import {
    AuthenticationService,
    AlwaysAuthService,
    OnlyLoggedInUsersGuard,
    OnlyLoggedOutUsersGuard
} from './auth-guards/authentication-guards';
import {
    HomeComponent
} from './dashboard-components/home/home.component';
import {
    HeaderComponent
} from './dashboard-components/header/header.component';
import {
    SidebarComponent
} from './dashboard-components/sidebar/sidebar.component';
import {
    DashboardService
} from './dashboard-services/dashboard.service';
import { HelpDeskComponent } from './dashboard-components/Portal-helpDesk/helpdesk.component';
import { HelpDeskDialogComponent } from './dashboard-components/Portal-helpDesk/help-dialog/help.dialog.component';
import { LicenseInfoComponent } from './dashboard-components/license/license-info.component';
import { PurchaseInfoComponent } from './purchase-info/purchase-info.component';
import { CustomerComponent } from './dashboard-components/customers/customer.component';
import { SearchComponent } from './dashboard-components/customers/search-dialog/search.dialog.component';
import { SearchQueryDialogComponent } from './dashboard-components/Portal-helpDesk/search-query-dialog/search.query.dialog.component';
import { ContactUsComponent } from './dashboard-components/contact-us/contact.component';
import { SiteHelpDeskComponent } from './site-help-desk/site-helpdesk.component';
import { SiteDeskDialogComponent } from './site-help-desk/help-dialog/help.dialog.component';
import { SearchSiteQueryDialog } from './site-help-desk/search-site-query-dialog/search.query.dialog.component';
import { SharedService } from './dashboard-services/shared.services';
import { PaymentComponent } from './dashboard-components/payment-details/payment.component';
import { SearchPaymentDialogComponent } from './dashboard-components/payment-details/payment-search-dialog/search.payment.dialog.component';

import { DashboardDetailComponent } from './dashboarddetail/dashboarddetail.component';
@NgModule({
    imports: [
        CommonModule,
        superAdminRouter,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        DashboardComponent,
        LicenseInfoComponent,
        PurchaseInfoComponent,
        HomeComponent,
        HeaderComponent,
        CustomerComponent,
        SidebarComponent,
        HelpDeskDialogComponent,
        SearchQueryDialogComponent,
        SiteHelpDeskComponent,
        SearchComponent,
        ContactUsComponent,
        PaymentComponent,
        HelpDeskComponent,
        SiteDeskDialogComponent,
        SearchSiteQueryDialog,
        SearchPaymentDialogComponent,
        DashboardDetailComponent
    ],
    entryComponents:[SearchPaymentDialogComponent,HelpDeskDialogComponent,SearchComponent,SearchSiteQueryDialog,SearchQueryDialogComponent,SiteDeskDialogComponent],
    providers: [
        LoginService,
        SharedService,
        AuthenticationService,
        DashboardService,
        AlwaysAuthService,
        OnlyLoggedInUsersGuard,
        OnlyLoggedOutUsersGuard,
    ],

})
export class SuperAdminModule {}