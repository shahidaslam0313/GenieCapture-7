import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxCarouselModule } from 'ngx-carousel';
import { LoaderComponent } from './loader/loader.component';
import { ProgressHttpModule } from "angular-progress-http";
import { UsMapModule } from 'angular-us-map';
import {Nl2BrPipeModule} from 'nl2br-pipe';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { LoginService} from './login/login.service';
import { PricingService } from './pricing/pricing.service';
import { RegisterService} from './registered/register.service';
import { ForgetPasswordService } from './dashboard/forget-password/forget-password.service';
import { MatFormFieldModule} from '@angular/material';
import { ChangedPasswordService } from './dashboard/changed-password/changed-password.service';
import { SidebarService } from './user-sidebar/sidebar.service';
import { ProfileService } from './dashboard/profile/profile.service';
import { HeaderService } from './header/header.service';
import { HomeService } from './home/home.service';
import { ContactUsService } from './contact-us/contact-us.service';
import { FooterService } from './footer/footer.service';
import { SpeechRecognitionService } from './header/speechservice';
import {PreloaderFull} from './component/preloader-full/preloader-full';
import {PreloaderSmall} from './component/preloader-small/preloader-small';
import {BaseRequestOptions} from '@angular/http';
import {PreloaderService} from './serv/preloader-service';
import {XHRBackend, RequestOptions} from '@angular/http';
import {HttpService} from './serv/http-service';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { CountdownModule } from 'ng2-countdown-timer';
// import { MatTabChangeEvent } from '@angular/material';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { ReplyComponent } from './dashboard/reply/reply.component';
import 'hammerjs';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
     MatIconModule,
 
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { PricingComponent } from './pricing/pricing.component';
import { TextMaskModule } from 'angular2-text-mask';
import { RegisteredComponent } from './registered/registered.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './dashboard/forget-password/forget-password.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthenticationService, AlwaysAuthService, OnlyLoggedInUsersGuard, OnlyLoggedOutUsersGuard } from './_guards/auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AgmCoreModule } from '@agm/core';
import { FooterComponent } from './footer/footer.component';
import { ChangedPasswordComponent } from './dashboard/changed-password/changed-password.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { WhatIsRfpComponent } from './what-is-rfp/what-is-rfp.component';
import { FeaturesComparisonComponent } from './features-comparison/features-comparison.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PartnershipComponent } from './partnership/partnership.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {SharedData } from './shared-service'
import {DatePipe} from '@angular/common';
import { AdminLayoutComponent } from './layouts/lyout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import{AdminComponent} from './layouts/superadmin/admin-layout.component'
import {SidebarComponent} from './sidebar/sidebar.component';
import {VerifyCodeComponent} from './verifycode/verifycode.component';
import {VerifyCodeComponent2} from './verifycode2/verifycode2.component';
import {PurchaseHistoryComponent} from './dashboard/purchase-history/purchase-history.component';
import {LicenseDetailsComponent} from './dashboard/license-details/license-details.component';
import {PaymentComponent} from './dashboard/payment/payment.component';
import {RecordingsComponent} from './recordings/recordings.component';
import{VerificationComponent} from './verification/verification.component'
import { Verification2Component } from './verification2/verification2.component';
export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, preloaderService: PreloaderService) {
    return new HttpService(backend, defaultOptions, preloaderService);
}
import { LivechatWidgetModule } from '@livechat/angular-widget';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecapchaComponent } from './recapcha/recapcha.component';
import { RecapchaService } from './recapcha/recapcha.service';
import { SubscriptionComponent } from './dashboard/subscription/subscription.component';
import { PurchaseHistoryService } from './dashboard/purchase-history/purchase-history-service';
import { PaymentService } from './dashboard/payment/payment.service';
import { PaymentDialogComponent } from './dashboard/payment/payment-dialog/payment.dialog.component';
import { PartnerShipService } from './partnership/partnership.service';
import { DownloadService } from './serv/download.service';
import { NgProgressModule } from 'ngx-progressbar';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe';

import { CustomerSupportComponent } from './dashboard/customer-support/customer.support';
import { CustomerService } from './dashboard/customer-support/customer-service';
import { SuperAdminComponent } from './layouts/super-admin-layout/super.admin.component';
import { QueryResponseComponent } from './dashboard/tickets-response/tickets.response';
import { TicketService } from './dashboard/tickets-response/tickets-service';
import { SalePopUpComponent } from './home/popup-dialog/pop-up.dialog.component';
let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("210115018603-187b6essbhk7booo33ab36d1u8cn3jpp.apps.googleusercontent.com")
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("692540294438102")
    }
  ]);
  export function provideConfig() {
    return config;
  }
  
@NgModule({
    exports: [
        
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        NgProgressModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
   
    ],
    declarations: [],

})
export class MaterialModule {}

@NgModule({
    imports:      [
        InternationalPhoneModule,
        Nl2BrPipeModule,
        Ng2SmartTableModule,
        CommonModule,
        UsMapModule,
        BrowserAnimationsModule,
        FormsModule,
        // CountdownModule,
        TextMaskModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        MaterialModule,
        MatNativeDateModule,
        ProgressHttpModule,
        Ng2SearchPipeModule,
        CountdownModule,
        NgxCarouselModule,
        CountdownTimerModule,
        // CountdownModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDPnJ0zatoiPOI1GOeeS7HCj7AxIW183tg'
        }),
        ReactiveFormsModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        // MatStepperModule,
        SocialLoginModule,
        LivechatWidgetModule,
        HttpClientModule,
        MatTableModule,
     
    ],
    exports:[
        MatTableModule
    ],
    declarations: [
        DashboardComponent,
        AdminComponent,
        SuperAdminComponent,
        SidebarComponent,
        UnsubscribeComponent,
        AppComponent,
        AuthLayoutComponent,
        AdminLayoutComponent,
        HomeComponent,
        ReplyComponent,
        HeaderComponent,
        UserSidebarComponent,
        PricingComponent,
        PreloaderFull,
        PreloaderSmall,
        LoaderComponent,
        RegisteredComponent,
        QueryResponseComponent ,
        LoginComponent,
        ForgetPasswordComponent,
        AboutComponent,
        SubscriptionComponent,
        ProfileComponent,
        FooterComponent,
        ChangedPasswordComponent,
        ContactUsComponent,
        HowItWorksComponent,
        WhatIsRfpComponent,
        FeaturesComparisonComponent,
        TermsComponent,
        PrivacyPolicyComponent,
        PartnershipComponent,
        VerifyCodeComponent,
        VerifyCodeComponent2,
        PurchaseHistoryComponent,
        LicenseDetailsComponent,
        PaymentComponent,
        RecordingsComponent,
        VerificationComponent,
        Verification2Component,
        RecapchaComponent,
        PaymentDialogComponent,
        CustomerSupportComponent,
        SalePopUpComponent

    ],
    entryComponents:[PaymentDialogComponent,SalePopUpComponent],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
          },
        DatePipe,
        PurchaseHistoryService,
        CustomerService,
        SharedData,
        HomeService,
        HeaderService,
        ChangedPasswordService,
        SidebarService,
        LoginService,
        PricingService,
        RegisterService,
        ForgetPasswordService,
        PreloaderService,
        PaymentService,
        TicketService,
        AuthenticationService,
        AlwaysAuthService ,
        OnlyLoggedInUsersGuard ,
        OnlyLoggedOutUsersGuard ,
        BaseRequestOptions,
        ProfileService,
        DownloadService,
        ContactUsService,
        FooterService,
        RecapchaService,
        PartnerShipService,
        SpeechRecognitionService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, PreloaderService]
        },
    ],
    bootstrap: [ AppComponent ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
