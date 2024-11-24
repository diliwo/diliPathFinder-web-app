import { Component, OnInit, SimpleChanges } from '@angular/core';
import { BeneficiaryDetail, BeneficiaryLookUp, BeneficiariesLookUp, Roles } from '@frontend/api-interface';
import { BeneficiariesFacade } from '@frontend/core-state';
import { PositionFacadeService } from '@frontend/core-state';
import { ImportBeneficiaryDetailComponent } from './import-beneficiary-detail/import-beneficiary-detail.component';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AboutBoxComponent } from '../toolbar/about-box/about-box.component';
import { MySupportsListComponent } from '../home/my-supports-list/my-supports-list.component';
import { JwtHelper } from '@cpas/authentication-ng-lib';
import { permissions } from '@frontend/shared';

@Component({
  selector: 'frontend-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  //allBeneficiariesLookUp$: Observable<BeneficiariesLookUp> = this.beneficiariesFacade.allBeneficiariesLookUp$;
  position$: Observable<string> = this.positionFacadeService.position$;
  benefId$: Observable<number> = this.positionFacadeService.benefId$;
  newNiss$: Observable<string> = this.beneficiariesFacade.newNiss$;
  public version = environment.AppVersion;
  public showVersion = environment.ShowVersion;
  isBeneficiarySelected : boolean;
  perm = permissions; // to be used in the template;
  public currentUserDecodedToken: string[];
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private beneficiariesFacade: BeneficiariesFacade,
    private positionFacadeService: PositionFacadeService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {
   }

   ngOnInit() : void {
    this.beneficiariesFacade.imported$.subscribe((_) => {
      this.redirect();
    });
  }

  redirect(){
    this.newNiss$.subscribe((nissFromApi : string) => {
      const newNiss = nissFromApi != null ? nissFromApi : null;
      console.log('New niss imported : ' + newNiss);
      this.router.navigate(['/beneficiary',newNiss]);
    });
  }

  import(){
    const niss = '';
      const dlg = this.dialog.open(ImportBeneficiaryDetailComponent, { data: { niss} ,
        maxWidth: '100%',
        width: '30%'});
      dlg.beforeClosed().subscribe(res => {
          if (res) {
            console.log(res);
            this.beneficiariesFacade.importBeneficiary(res.niss, true);
          }
      });
    }

    openMySupports(){
      const dlg = this.dialog.open(MySupportsListComponent, { data: {
        title: 'Liste de mes CB',
        iconItem: 'folder_shared'
      },
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'});
    }

    openAboutBox() {
      const dialogRef = this.dialog.open(AboutBoxComponent);
    }
}
