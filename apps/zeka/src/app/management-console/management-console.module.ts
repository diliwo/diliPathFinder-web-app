import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreDataModule, API_BASE_URL } from '@frontend/core-data';
import { CoreStateModule } from '@frontend/core-state';
import { MaterialModule } from '@frontend/material';
import { environment } from '../../environments/environment';
// eslint-disable-next-line max-len
import { FormationDetailsComponent } from './formations/formation-details/formation-details.component';
import { FormationListComponent } from './formations/formations.component';
import { ServicesComponent } from './services/services.component';
import { ServicesDetailsComponent } from './services/services-details/services-details.component';
import { ReferentsComponent } from './referents/referents.component';
import { ReferentsDetailsComponent } from './referents/referents-details/referents-details.component';
import { PartnersComponent } from './partners/partners.component';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolDetailsComponent } from './schools/school-details/school-details.component';
import { ProfessionsDetailsComponent } from './professions/professions-details/professions-details.component';
import {ProfessionsComponent } from './professions/professions.component';
import { ManagementConsoleComponent } from './management-console.component';
import { CpasAuthInterceptor, AuthenticationNgLibModule } from '@cpas/authentication-ng-lib';
import { ManagementConsoleRoutingModule } from './management-console-routing.module';
import { SharedModule } from '@frontend/shared';
import { NgxEditorModule } from 'ngx-editor';
import { TrainingTypesDetailsComponent } from './trainingTypes/trainingType-details/trainingType-details.component';
import { TrainingTypesComponent } from './trainingTypes/trainingTypes.component';

@NgModule({
  declarations: [
    ManagementConsoleComponent,
    ServicesComponent,
    ServicesDetailsComponent,
    ReferentsComponent,
    ReferentsDetailsComponent,
    PartnersComponent,
    SchoolsComponent,
    SchoolDetailsComponent,
    PartnersComponent,
    SchoolsComponent,
    SchoolDetailsComponent,
    ProfessionsDetailsComponent,
    ProfessionsComponent,
    FormationDetailsComponent,
    FormationListComponent,
    TrainingTypesDetailsComponent,
    TrainingTypesComponent
  ],
  imports: [
    SharedModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    NgxEditorModule,
    ManagementConsoleRoutingModule,
    AuthenticationNgLibModule.forRoot({
      OAuthConfig: environment.OAuth,
    })
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.ApiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: CpasAuthInterceptor, multi: true },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ManagementConsoleModule { }
