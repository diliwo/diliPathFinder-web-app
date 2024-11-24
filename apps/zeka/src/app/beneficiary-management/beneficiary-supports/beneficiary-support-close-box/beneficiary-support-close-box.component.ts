import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReasonOfClosure, ReasonOfClosures, Support } from '@frontend/api-interface';
import { tools } from '@frontend/shared';

@Component({
  selector: 'frontend-support-close-box',
  templateUrl: './beneficiary-support-close-box.component.html',
  styleUrls: ['./beneficiary-support-close-box.component.scss']
})
export class BeneficiarySupportCloseBoxComponent {

  public frm: FormGroup;
  public ctlEndDate: FormControl;
  public ctlReason: FormControl;
  reasons: ReasonOfClosure[] = [];

  constructor(
    public dialogRef: MatDialogRef<BeneficiarySupportCloseBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { support: Support, reasons:ReasonOfClosure[]},
    private fb: FormBuilder,
  ) {
    this.reasons = data.reasons;
    this.ctlEndDate = this.fb.control('', []);
    this.ctlReason = this.fb.control('', []);
    this.frm = this.fb.group({
      supportId: this.data.support.supportId,
      startdate: this.data.support.startDate,
      endDate: this.ctlEndDate,
      referentId: this.data.support.referentId,
      beneficiaryId: data.support.beneficiaryId,
      reasonOfClosure: this.ctlReason
    });

    this.frm.get("endDate").patchValue(tools.formatDate(new Date(Date.now())));
    this.frm.get("reasonOfClosure").patchValue(data.support.reasonOfClosure);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.frm.value.endDate = tools.formatDate(new Date(this.frm.get("endDate").value));
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
