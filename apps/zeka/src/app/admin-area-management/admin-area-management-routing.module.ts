import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAreaManagementComponent } from './admin-area-management.component';

const routes: Routes = [
  {
    path:'',component: AdminAreaManagementComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAreaManagementRoutingModule {
  static components = [
    AdminAreaManagementComponent
    ];
}
