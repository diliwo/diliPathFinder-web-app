import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreDataModule, API_BASE_URL } from '@frontend/core-data';
import { CoreStateModule } from '@frontend/core-state';
import { MaterialModule } from '@frontend/material';
import { environment } from '../../environments/environment';
// eslint-disable-next-line max-len
import { JobsManagementComponent } from './jobs-management.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsFilterComponent } from './jobs-filter/jobs-filter.component';
import { JobsDetailComponent } from './jobs-detail/jobs-detail.component';
import { JobCandidaciesListComponent } from './job-candidacies-list/job-candidacies-list.component';
import { JobFilesBoxComponent } from './job-files-box/job-files-box.component';
import { JobFilesListComponent } from './job-files-box/job-files-list/job-files-list.component';
import { CpasAuthInterceptor, AuthenticationNgLibModule } from '@cpas/authentication-ng-lib';
import { BeneficiaryRoutingModule } from './jobs-management-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule} from '@frontend/shared';
import { NgxEditorModule } from 'ngx-editor';
import { JobOccupantsListComponent } from './job-occupants-list/job-occupants-list.component';
import { BeneficiaryEmploymentStatusBoxComponent } from '../beneficiary-management/beneficiary-jobs/beneficiary-employment-status-box/beneficiary-employment-status-box.component';
import { BeneficiaryEmploymentStatusHistoryComponent } from '../beneficiary-management/beneficiary-jobs/beneficiary-employment-status-box/beneficiary-employment-status-history/beneficiary-employment-status-history.component';
import { EmploymentDatesComponent } from './employment-dates-box/employment-dates';

@NgModule({
  declarations: [
    JobsManagementComponent,
    JobsFilterComponent,
    JobsListComponent,
    JobsDetailComponent,
    JobCandidaciesListComponent,
    JobFilesBoxComponent,
    JobFilesListComponent,
    JobOccupantsListComponent,
    BeneficiaryEmploymentStatusBoxComponent,
    BeneficiaryEmploymentStatusHistoryComponent,
    EmploymentDatesComponent
  ],
  imports: [
    SharedModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    InfiniteScrollModule,
    NgxEditorModule,
    BeneficiaryRoutingModule,
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
export class JobsModule { }
