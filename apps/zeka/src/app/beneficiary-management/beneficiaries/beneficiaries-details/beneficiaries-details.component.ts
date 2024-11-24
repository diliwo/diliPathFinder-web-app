import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BeneficiaryDetail, BeneficiaryFormation, CandidaciesListVm, MessageType, LastBenefFormation } from '@frontend/api-interface';
import { PositionFacadeService, CandidaciesFacadeService, BeneficiariesFacade, NotificationService } from '@frontend/core-state';
import { BeneficiaryLanguageBoxComponent } from './beneficiary-language-box/beneficiary-language-box.component';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BilanManagementComponent } from '../bilan-management/bilan-management.component';
import { BeneficiaryIbisNumberBoxComponent } from './beneficiary-ibis-number-box/beneficiary-ibis-number-box.component';

@Component({
  selector: 'frontend-beneficiaries-details',
  templateUrl: './beneficiaries-details.component.html',
  styleUrls: ['./beneficiaries-details.component.scss']
})
export class BeneficiariesDetailsComponent implements OnInit {
  @Input() beneficiary: BeneficiaryDetail;
  allCandidaciesByBeneficiary$: Observable<CandidaciesListVm> = this.candidaciesFacadeService.allCandidaciesByBeneficiary$
  @Output() refreshEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private positionFacadeServices: PositionFacadeService,
    private candidaciesFacadeService: CandidaciesFacadeService,
    private beneficiariesFacade: BeneficiariesFacade,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: Router,
    @Inject("GIPSY_URL") public gipsyUrl: string
  ) {
  }
  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.positionFacadeServices.getBeneficiaryId(parseInt(this.beneficiary.beneficiaryId));
  }

  updateNativeLanguage(benefNiss: string): void {
    const nativeLanguage = this.beneficiary.nativeLanguage;
    const niss = benefNiss;
    const dlg = this.dialog.open(BeneficiaryLanguageBoxComponent, { data: { niss, nativeLanguage } });
    dlg.beforeClosed().subscribe(res => {
      if (res) {
        console.log(res);
        this.beneficiariesFacade.updateNativeLanguage(res);
        this.beneficiary.nativeLanguage = res.nativeLanguage;
      }
    });
  }

  upsertIbisNumber(benefNiss: string): void {
    const niss = benefNiss;
    const ibisNumber = this.beneficiary.ibisNumber;
    const dlg = this.dialog.open(BeneficiaryIbisNumberBoxComponent, { data: { ibisNumber: ibisNumber } });
    dlg.beforeClosed().subscribe(res => {
      if (res) {
        this.beneficiariesFacade.updateIbisNumber(res, niss);
        this.beneficiary.ibisNumber = this.checkIfIbisNumberIsConsistent(res[0].value,this.beneficiary.ibisNumber);
      }
    });
  }

  openAssessmentManagment() {
    const beneficiary = this.beneficiary;
    const dlg = this.dialog.open(BilanManagementComponent, {
      data: { beneficiary },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
  }

  refresh(benefNiss: string) {
    console.log('beneficiaries-details.components -> refresh : ' + benefNiss);
    this.beneficiariesFacade.importBeneficiary(benefNiss, false);
  }

  goToBeneficiaryLink(niss: string) {
    return window.open(
      `${this.gipsyUrl}beneficiary/${niss}`,
      "_blank"
    );
  }

  checkIfIbisNumberIsConsistent(newNumber : string, oldNumber: string){
    return (newNumber.length > 20) ? oldNumber : newNumber;
  }
}
