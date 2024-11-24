import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreDataModule, API_BASE_URL } from '@frontend/core-data';
import { CoreStateModule } from '@frontend/core-state';
import { MaterialModule } from '@frontend/material';
import { environment } from '../../environments/environment';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BeneficiariesDetailsComponent } from './beneficiaries/beneficiaries-details/beneficiaries-details.component';
import { BeneficiaryJobsComponent } from './beneficiary-jobs/beneficiary-jobs.component';
import { BeneficiaryJobDetailComponent } from './beneficiary-jobs/beneficiary-job-detail/beneficiary-job-detail.component';
import { BeneficiaryJobsListComponent } from './beneficiary-jobs/beneficiary-jobs-list/beneficiary-jobs-list.component';
import { BeneficiaryLanguageBoxComponent } from './beneficiaries/beneficiaries-details/beneficiary-language-box/beneficiary-language-box.component';
import { BeneficiaryFormationsComponent } from './beneficiary-formations/beneficiary-formations.component';
import { BeneficiaryFormationsListComponent }
 from './beneficiary-formations/beneficiary-formations-list/beneficiary-formations-list.component';
import { BeneficiaryFormationDetailsComponent }
 from './beneficiary-formations/beneficiary-formation-details/beneficiary-formation-details.component';
import { CpasAuthInterceptor, AuthenticationNgLibModule } from '@cpas/authentication-ng-lib';
import { BilanManagementComponent } from './beneficiaries/bilan-management/bilan-management.component';
import { PersonalSituationComponent } from './beneficiaries/personal-situation/personal-situation.component';
import { PersonalExpectationComponent } from './beneficiaries/personal-expectation/personal-expectation.component';
import { PersonalSituationListComponent } from
'./beneficiaries/personal-situation/personal-situation-list/personal-situation-list.component';
import { PersonalSituationHousingListComponent }
 from './beneficiaries/personal-situation/personal-situation-housing-list/personal-situation-housing-list.component';
import { PersonalSituationHealthListComponent }
 from './beneficiaries/personal-situation/personal-situation-health-list/personal-situation-health-list.component';
import { PersonalSituationFinancialStatusListComponent }
 from './beneficiaries/personal-situation/personal-situation-financial-status-list/personal-situation-financial-status-list.component';
import { PersonalSituationAdministrativeStatusListComponent }
 from './beneficiaries/personal-situation/personal-situation-administrative-status-list/personal-situation-administrative-status-list.component';
import { BilansListComponent } from './beneficiaries/bilans-list/bilans-list.component';
import { BilanDetailsComponent } from './beneficiaries/bilan-details/bilan-details.component';
import { ProfessionalExperiencesListComponent }
from './beneficiary-jobs/professional-experiences-list/professional-experiences-list.component';
import { ProfessionalExperienceDetailComponent }
from './beneficiary-jobs/professional-experience-detail/professional-experience-detail.component';

import { BeneficiaryRoutingModule } from './beneficiary-management-routing.module';
import { SharedModule} from '@frontend/shared';
import { BeneficiarySupportsComponent } from './beneficiary-supports/beneficiary-supports.component';
import { BeneficiarySupportListComponent } from './beneficiary-supports/beneficiary-support-list/beneficiary-support-list.component';
import { BeneficiarySupportDetailsComponent } from './beneficiary-supports/beneficiary-support-details/beneficiary-support-details.component';
import { BeneficiarySuivisComponent } from './beneficiary-suivis/beneficiary-suivis.component';
import { BeneficiarySuivisListComponent } from './beneficiary-suivis/beneficiary-suivis-list/beneficiary-suivis-list.component';
import { BeneficiarySuiviDetailsComponent } from './beneficiary-suivis/beneficiary-suivi-details/beneficiary-suivi-details.component';
import { BilanProfessionDetailsComponent } from './beneficiaries/bilan-profession-details/bilan-profession-details.component';
import {JobHireBoxComponent } from './beneficiary-jobs/job-hire-box/job-hire-box.component'
import { BeneficiaryIbisNumberBoxComponent } from './beneficiaries/beneficiaries-details/beneficiary-ibis-number-box/beneficiary-ibis-number-box.component'
import { NgxEditorModule } from 'ngx-editor';
import { EmploymentTerminationComponent } from './beneficiary-jobs/employment-termination-box/employment-termination-box.component';

@NgModule({
  declarations: [
    BeneficiariesComponent,
    BeneficiariesDetailsComponent,
    BeneficiaryJobsComponent,
    BeneficiaryJobDetailComponent,
    BeneficiaryJobsListComponent,
    BeneficiaryLanguageBoxComponent,
    BeneficiaryFormationsComponent,
    BeneficiaryFormationsListComponent,
    BeneficiaryFormationDetailsComponent,
    BilanManagementComponent,
    PersonalSituationComponent,
    PersonalExpectationComponent,
    PersonalSituationListComponent,
    PersonalSituationHealthListComponent,
    PersonalSituationFinancialStatusListComponent,
    PersonalSituationAdministrativeStatusListComponent,
    BilansListComponent,
    BilanDetailsComponent,
    PersonalSituationHousingListComponent,
    BeneficiaryRoutingModule.components,
    BeneficiarySupportsComponent,
    BeneficiarySupportListComponent,
    BeneficiarySupportDetailsComponent,
    ProfessionalExperienceDetailComponent,
    ProfessionalExperiencesListComponent,
    BeneficiarySuivisComponent,
    BeneficiarySuivisListComponent,
    BeneficiarySuiviDetailsComponent,
    JobHireBoxComponent,
    BilanProfessionDetailsComponent,
    BeneficiaryIbisNumberBoxComponent,
    EmploymentTerminationComponent
  ],
  imports: [
    SharedModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    BeneficiaryRoutingModule,
    NgxEditorModule,
    AuthenticationNgLibModule.forRoot({
      OAuthConfig: environment.OAuth,
    })
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.ApiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: CpasAuthInterceptor, multi: true }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class BeneficiaryModule { }
