import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreDataModule, API_BASE_URL, AppConfigs } from '@frontend/core-data';
import { CoreStateModule } from '@frontend/core-state';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { MaterialModule } from '@frontend/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ConfirmationBoxComponent, SharedModule } from '@frontend/shared';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/fr';
import { ConfigService } from '@frontend/core-data'
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardComponent } from './dahsboard/dashboard.component';
import { RightItemListComponent } from './dahsboard/right-item-list/right-item-list.component';
import { LeftItemListComponent } from './dahsboard/left-item-list/left-item-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DashboardComponent,
    RightItemListComponent,
    LeftItemListComponent
  ],
  imports: [
    CoreDataModule,
    CoreStateModule,
    RoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (appConfig: ConfigService) => () =>{ return appConfig.loadConfig()},
      deps: [ConfigService]
    },
    { provide: API_BASE_URL, useFactory: () => AppConfigs.ApiBaseUrl },
    { provide: MAT_DATE_LOCALE, useValue: 'fr'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
