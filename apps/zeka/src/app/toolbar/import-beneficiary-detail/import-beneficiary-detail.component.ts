/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeneficiaryDetail, BeneficiaryLookUp, BeneficiariesLookUp } from '@frontend/api-interface';
import { BeneficiariesFacade, PositionFacadeService, NotificationService } from '@frontend/core-state';

@Component({
  selector: 'frontend-import-beneficiary-detail',
  templateUrl: './import-beneficiary-detail.component.html',
  styleUrls: ['./import-beneficiary-detail.component.scss']
})
export class ImportBeneficiaryDetailComponent {
  public control = new FormControl();
  public beneficiaryLoading = false;

  public frm: FormGroup;
  public ctlNiss: FormControl;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ImportBeneficiaryDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { niss: string },
    private fb: FormBuilder
    ) {
      this.ctlNiss = this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]{8,11}$')
      ]);

      this.frm = this.fb.group({
        niss: this.ctlNiss,
      });
      this.frm.patchValue(data);
    }

  cancel(): void {
    this.dialogRef.close();
  }

  import() : void{
    this.dialogRef.close(this.frm.value);
  }
}
