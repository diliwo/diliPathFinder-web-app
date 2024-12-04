import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreDataModule, API_BASE_URL } from '@frontend/core-data';
import { CoreStateModule } from '@frontend/core-state';
import { MaterialModule } from '@frontend/material';
import { environment } from '../../environments/environment';
// eslint-disable-next-line max-len
import { trainingDetailsComponent } from './trainings/training-details/training-details.component';
import { trainingsComponent } from './trainings/trainings.component';
import { AdminAreaManagementComponent } from './admin-area-management.component';
import { AdminAreaManagementRoutingModule } from './admin-area-management-routing.module';
import { SharedModule } from '@frontend/shared';
import { NgxEditorModule } from 'ngx-editor';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailsComponent } from './teams/team-details/team-details.component';
import { StaffMemberDetailsComponent } from './staffmembers/staffmember-details/staffmember-details.component';
import { PartnersComponent } from './partners/partners.component';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolDetailsComponent } from './schools/school-details/school-details.component';
import { ProfessionsDetailsComponent } from './professions/professions-details/professions-details.component';
import { ProfessionsComponent } from './professions/professions.component';
import { TrainingTypesDetailsComponent } from './trainingTypes/trainingType-details/trainingType-details.component';
import { TrainingTypesComponent } from './trainingTypes/trainingTypes.component';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamDetailsComponent,
    StaffMemberDetailsComponent,
    AdminAreaManagementComponent,
    PartnersComponent,
    SchoolsComponent,
    SchoolDetailsComponent,
    SchoolsComponent,
    SchoolDetailsComponent,
    ProfessionsDetailsComponent,
    ProfessionsComponent,
    trainingDetailsComponent,
    trainingsComponent,
    TrainingTypesDetailsComponent,
    TrainingTypesComponent
  ],
  imports: [
    SharedModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    NgxEditorModule,
    AdminAreaManagementRoutingModule
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.ApiBaseUrl }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AdminAreaManagementModule { }
