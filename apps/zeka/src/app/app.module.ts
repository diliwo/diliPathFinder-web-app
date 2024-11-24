import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreDataModule, API_BASE_URL, AppConfigs } from '@frontend/core-data';
import { CoreStateModule } from '@frontend/core-state';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearchBeneficiaryComponent } from './toolbar/search-beneficiary/search-beneficiary.component';
import { RoutingModule } from './routing.module';
import { MaterialModule } from '@frontend/material';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImportBeneficiaryDetailComponent } from './toolbar/import-beneficiary-detail/import-beneficiary-detail.component';
import { JobOfferDetailComponent } from './jobs-management/job-offer-detail/job-offer-detail.component';
import { BeneficiarySupportCloseBoxComponent }
from '../app/beneficiary-management/beneficiary-supports/beneficiary-support-close-box/beneficiary-support-close-box.component';
import { ConfirmationBoxComponent } from '@frontend/shared';
import { CpasAuthInterceptor, AuthenticationNgLibModule } from '@cpas/authentication-ng-lib';
import { RightItemListComponent } from './home/right-item-list/right-item-list.component';
import { PartnersListComponent } from './home/partners-list/partners-list.component';
import { AboutBoxComponent } from './toolbar/about-box/about-box.component';
import { SharedModule } from '@frontend/shared';
import { BeneficiariesIntegrationJobListComponent } from './home/beneficiaries-integration-job-list/beneficiaries-integration-job-list.component';
import { LeftItemListComponent } from './home/left-item-list/left-item-list.component';
import { MySupportsListComponent } from './home/my-supports-list/my-supports-list.component';
import { JobOfferListComponent } from './home/job-offer-list/job-offer-list.component';
import { MyConsultantSupportsListComponent } from './home/my-supports-list/my-consultant-supports-list/my-consultant-supports-list';
import { MyJobCoachSupportsListComponent } from './home/my-supports-list/my-jobcoach-supports-list/my-jobcoach-supports-list';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/fr';
import { SociabiliGatewayNgLibModule } from '@cpas/sociabili-gateway-ng-lib';
import { ConfigService } from '@frontend/core-data'

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SearchBeneficiaryComponent,
    HomeComponent,
    ImportBeneficiaryDetailComponent,
    JobOfferListComponent,
    JobOfferDetailComponent,
    BeneficiarySupportCloseBoxComponent,
    ConfirmationBoxComponent,
    RightItemListComponent,
    PartnersListComponent,
    AboutBoxComponent,
    BeneficiariesIntegrationJobListComponent,
    LeftItemListComponent,
    MySupportsListComponent,
    MyConsultantSupportsListComponent,
    MyJobCoachSupportsListComponent,
  ],
  imports: [
    BrowserModule,
    CoreDataModule,
    CoreStateModule,
    RoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    SharedModule,
    AuthenticationNgLibModule.forRoot({
      OAuthConfig: 'OAUTH_CONFIG',
    }),
    SociabiliGatewayNgLibModule.forRoot({
      ApiSociabiliGatewayUrl: 'API_SOCIABILI_GATEWAY_URL',
    }),
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (appConfig: ConfigService) => () =>{ return appConfig.loadConfig()},
      deps: [ConfigService]
    },
    { provide: 'OAUTH_CONFIG', useFactory: () => AppConfigs.OAuth },
    { provide: 'API_SOCIABILI_GATEWAY_URL', useFactory: () => AppConfigs.ApiSociabiliGatewayUrl },
    { provide: API_BASE_URL, useFactory: () => AppConfigs.ApiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: CpasAuthInterceptor, multi: true },
    { provide: 'GIPSY_URL', useFactory: () => AppConfigs.GipsyUrl},
    {provide: MAT_DATE_LOCALE, useValue: 'fr'}

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
