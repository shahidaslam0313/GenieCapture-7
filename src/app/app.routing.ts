import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ChangedPasswordComponent } from './dashboard/changed-password/changed-password.component';
import { CustomerSupportComponent } from './dashboard/customer-support/customer.support';
import { ForgetPasswordComponent } from './dashboard/forget-password/forget-password.component';
import { LicenseDetailsComponent } from './dashboard/license-details/license-details.component';
import { PaymentComponent } from './dashboard/payment/payment.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { PurchaseHistoryComponent } from './dashboard/purchase-history/purchase-history.component';
import { SubscriptionComponent } from './dashboard/subscription/subscription.component';
import { QueryResponseComponent } from './dashboard/tickets-response/tickets.response';
import { FeaturesComparisonComponent } from './features-comparison/features-comparison.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { SuperAdminComponent } from './layouts/super-admin-layout/super.admin.component';
import { AdminComponent } from './layouts/superadmin/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { PartnershipComponent } from './partnership/partnership.component';
import { PricingComponent } from './pricing/pricing.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RegisteredComponent } from './registered/registered.component';
import { TermsComponent } from './terms/terms.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe';
import { VerificationComponent } from './verification/verification.component';
import { Verification2Component } from './verification2/verification2.component';
import { VerifyCodeComponent } from './verifycode/verifycode.component';
import { VerifyCodeComponent2 } from './verifycode2/verifycode2.component';
import { WhatIsRfpComponent } from './what-is-rfp/what-is-rfp.component';
import { OnlyLoggedInUsersGuard, OnlyLoggedOutUsersGuard } from './_guards/auth.guard';

export const AppRoutes: Routes = [{
        path: '',
        component: AuthLayoutComponent,
        children: [{
                path: '',
                component: HomeComponent
            },
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [OnlyLoggedOutUsersGuard],
            },
            {
                path: 'login/pricing/:code',
                component: LoginComponent,
                canActivate: [OnlyLoggedOutUsersGuard],
            },
            {
                path: 'login/ticket/:code',
                component: LoginComponent,
                canActivate: [OnlyLoggedOutUsersGuard],
            },
            
            {
                path: 'contact',
                component: ContactUsComponent
            },
            {
                path: 'trackyourticket/:code',
                component: QueryResponseComponent
            },
          
            {
                path: 'superadmindashboard',
                component: DashboardComponent
            },
          
            {
                path: 'how-it-works',
                component: HowItWorksComponent
            },
            {
                path: 'what-is-genie-capture',
                component: WhatIsRfpComponent
            },
            {
                path: 'features-comparison',
                component: FeaturesComparisonComponent
            },
            {
                path: 'terms',
                component: TermsComponent
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent
            },
            {
                path: 'partnership',
                component: PartnershipComponent
            },

            {
                path: 'pricing',
                component: PricingComponent
            },

            {
                path: 'who-are-we',
                component: AboutComponent
            },
            {
                path: 'sign-up',
                component: RegisteredComponent,
                canActivate: [OnlyLoggedOutUsersGuard],
            },
            {
                path: 'verify',
                component: VerifyCodeComponent
            },
            {
                path: 'recover-my-account',
                component: VerifyCodeComponent2
            },
            // {
            //     path: 'recordings',
            //     component: RecordingsComponent
            // },
            {
                path: 'forgetpassword/:code',
                component: ForgetPasswordComponent
            },
            {
                path: 'unsubscribe/:email',
                component: UnsubscribeComponent
            },
            {
                path: 'verifysignuplink/:code',
                component: VerificationComponent
            },
            {
                path: 'verification2',
                component: Verification2Component
            },

        ]
    },

    {
        path: '',
        component: SuperAdminComponent,
        children: [{
            path: 'admin',
            loadChildren: 'app/super-admin-panel/super-admin-module#SuperAdminModule'
        }]
    },

    {
        path: '',
        component: AdminComponent,
        canActivate: [OnlyLoggedInUsersGuard],
        children: [{
                path: 'change-password',
                component: ChangedPasswordComponent,

            },
            {
                path: 'profile',
                component: ProfileComponent,

            },
            {
                path: 'subscription',
                component: SubscriptionComponent,

            },
            {
                path: 'purchase-history',
                component: PurchaseHistoryComponent,

            },
            {
                path: 'payment',
                component: PaymentComponent,

            },
            {
                path: 'licensedetails',
                component: LicenseDetailsComponent,

            },
            {
                path: 'support',
                component: CustomerSupportComponent
            }

        ]
    },

];