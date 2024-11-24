import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpasAuthGuardService } from '@cpas/authentication-ng-lib';
import { JobsManagementComponent } from './jobs-management.component';

const routes: Routes = [
  {
    path:'',component: JobsManagementComponent,
    canActivate: [CpasAuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiaryRoutingModule {
  static components = [
    JobsManagementComponent
    ];
}
