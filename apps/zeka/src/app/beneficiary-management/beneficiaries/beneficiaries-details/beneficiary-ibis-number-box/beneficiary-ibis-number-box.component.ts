import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { JobDetail, JobOfferDetail, StatusOfJobOffer } from '@frontend/api-interface';
import { JobOffersFacadeService } from '@frontend/core-state';
import * as _ from 'lodash-es';
import { tools } from '@frontend/shared';

@Component({
  selector: 'frontend-beneficiary-ibis-number-box',
  templateUrl: './beneficiary-ibis-number-box.component.html',
  styleUrls: ['./beneficiary-ibis-number-box.component.scss']
})
export class BeneficiaryIbisNumberBoxComponent {
  public frm: FormGroup;
  ctlIbisNumber: FormControl;
  public isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<BeneficiaryIbisNumberBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ibisNumber: string  },
    private fb: FormBuilder,
  ) {

    this.ctlIbisNumber = this.fb.control('', []);

    this.frm = this.fb.group({
      op: 'add',
      path: '/ibisnumber',
      value : this.ctlIbisNumber,
    });
    this.frm.get("value").patchValue(data.ibisNumber);
   }

   onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    const result = [this.frm.value];
    this.dialogRef.close(result);
  }

  cancel() {
    this.dialogRef.close();
  }
}
