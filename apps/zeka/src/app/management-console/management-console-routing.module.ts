import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpasAuthGuardService } from '@cpas/authentication-ng-lib';
import { ManagementConsoleComponent } from './management-console.component';

const routes: Routes = [
  {
    path:'',component: ManagementConsoleComponent,
    canActivate: [CpasAuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementConsoleRoutingModule {
  static components = [
    ManagementConsoleComponent
    ];
}
