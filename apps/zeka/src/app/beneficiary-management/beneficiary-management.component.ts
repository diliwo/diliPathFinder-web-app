import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { Router } from '@angular/router';
import { BeneficiariesFacade, PositionFacadeService } from '@frontend/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'frontend-beneficiaries',
  templateUrl: './beneficiary-management.component.html',
  styleUrls: ['./beneficiary-management.component.scss']
})
export class BeneficiaryComponent {
  public beneficiaryInfoIsActive = false;
  position$: Observable<string> = this.positionFacadeService.position$;
  benefId$: Observable<number> = this.positionFacadeService.benefId$;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private positionFacadeService: PositionFacadeService,
    ) {
  }

  onRouterOutletActivate(componentRef: Event) {
    if (componentRef instanceof BeneficiariesComponent) {
      this.beneficiaryInfoIsActive = true;
    }
  }

}
