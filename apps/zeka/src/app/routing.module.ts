import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManagementConsoleComponent } from './management-console/management-console.component';
import { JobsManagementComponent } from './jobs-management/jobs-management.component';
import { CpasAuthGuardService } from '@cpas/authentication-ng-lib';
import { PreloadModulesStrategy } from '@frontend/core-state';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [CpasAuthGuardService]
  },
  {
    path: 'beneficiary',
    loadChildren: () => import('./beneficiary-management/beneficiary-management.module').then(m => m.BeneficiaryModule),
  },
  {
    path: 'beneficiary/:niss', data: { preload: true },
    loadChildren: () => import('./beneficiary-management/beneficiary-management.module').then(m => m.BeneficiaryModule),
    canActivate: [CpasAuthGuardService]
  },
  { path: 'admin',
    loadChildren: () => import('./management-console/management-console.module').then(m => m.ManagementConsoleModule),
  },
  {
    path: 'jobs', component: JobsManagementComponent,
    loadChildren: () => import('./jobs-management/jobs-management.module').then(m => m.JobsModule),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //RouterModule.forRoot(routes,{ preloadingStrategy: PreloadModulesStrategy, relativeLinkResolution: 'legacy' })
    RouterModule.forRoot(routes,{ preloadingStrategy: PreloadModulesStrategy})
  ],
  exports: [RouterModule],
  providers: [PreloadModulesStrategy]
})
export class RoutingModule { }
