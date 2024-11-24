import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpasAuthGuardService } from '@cpas/authentication-ng-lib';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BilanManagementComponent } from './beneficiaries/bilan-management/bilan-management.component';
import { BeneficiaryFormationsComponent } from './beneficiary-formations/beneficiary-formations.component';
import { BeneficiaryJobsComponent } from './beneficiary-jobs/beneficiary-jobs.component';
import { BeneficiarySuivisComponent } from './beneficiary-suivis/beneficiary-suivis.component';
import { BeneficiarySupportsComponent } from './beneficiary-supports/beneficiary-supports.component';
import { BeneficiaryComponent } from './beneficiary-management.component';

const routes: Routes = [
  {
    path:'',component: BeneficiaryComponent,
    children: [
      { path: ':niss', component: BeneficiariesComponent,canActivate: [CpasAuthGuardService] },
      { path: ':niss/support/:id', component: BeneficiarySupportsComponent,canActivate: [CpasAuthGuardService] },
      { path: ':niss/jobs', component: BeneficiaryJobsComponent,canActivate: [CpasAuthGuardService] },
      { path: ':niss/bilan', component: BilanManagementComponent,canActivate: [CpasAuthGuardService] },
      { path: ':niss/formations', component: BeneficiaryFormationsComponent,canActivate: [CpasAuthGuardService] },
      { path: ':niss/suivis', component: BeneficiarySuivisComponent,canActivate: [CpasAuthGuardService] }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiaryRoutingModule {
  static components = [
      BeneficiaryComponent,
      BeneficiariesComponent,
      BeneficiarySupportsComponent,
      BeneficiaryJobsComponent,
      BilanManagementComponent,
      BeneficiaryFormationsComponent,
      BeneficiarySuivisComponent
    ];
}
