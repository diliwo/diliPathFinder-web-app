import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PositionFacadeService } from '@frontend/core-state';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'frontend-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  //allBeneficiariesLookUp$: Observable<BeneficiariesLookUp> = this.beneficiariesFacade.allBeneficiariesLookUp$;
  position$: Observable<string> = this.positionFacadeService.position$;
  benefId$: Observable<number> = this.positionFacadeService.benefId$;
  public version = environment.AppVersion;
  public showVersion = environment.ShowVersion;
  isBeneficiarySelected: boolean;
  public currentUserDecodedToken: string[];

  constructor(
    private positionFacadeService: PositionFacadeService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.positionFacadeService.benefId$.subscribe((benefId) => {
      this.isBeneficiarySelected = benefId !== null;
    });
  }


}
