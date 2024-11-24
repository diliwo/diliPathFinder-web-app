import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validators,FormBuilder,FormControl } from '@angular/forms';
import { JobDetail, JobsListVm, Reward, StatusOfJobOffer, CategoryOfJob,TypeOfJob, DocumentDetail, DocumentListVm, Candidacy, EmploymentStatusItem } from '@frontend/api-interface';
import { DocumentsFacadeService, JobsFacadeService, NotificationService } from '@frontend/core-state';
import * as _ from 'lodash-es';
import { Observable } from 'rxjs';
import { tools } from '@frontend/shared';

export function fileSizeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tooBig = control.value.size > (5 * 1024 * 1024);
    return tooBig ? { fileSizeTooBig: true } : null;
  };
}

@Component({
  selector: 'frontend-job-files-box',
  templateUrl: './beneficiary-employment-status-box.component.html',
  styleUrls: ['./beneficiary-employment-status-box.component.scss']
})
export class BeneficiaryEmploymentStatusBoxComponent {
  workScheduletypes: any[] = [
    {id: 0, value: 'Temps plein'},
    {id: 1, value: 'Temps partiel'}
  ];
  history : EmploymentStatusItem[] = [];
  lastItem: EmploymentStatusItem;

  public frm: FormGroup;
  public ctlEmploymentStatusDate: FormControl;
  public ctlEmploymentStatus: FormControl;

  constructor(
    public dialogRef: MatDialogRef<BeneficiaryEmploymentStatusBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { candidacy: Candidacy },
    private fb: FormBuilder,
    private documentsFacadeService : DocumentsFacadeService,
    private notificationService : NotificationService
  ) {
    this.ctlEmploymentStatus = this.fb.control(this.workScheduletypes[0].id, []);
    this.ctlEmploymentStatusDate = this.fb.control('', []);

    this.history = data.candidacy.employmentStatusHistory.items;

    this.lastItem = this.history[0];

    this.frm = this.fb.group({
      candidacyId: data.candidacy.candidacyId,
      employmentStatusDate: this.ctlEmploymentStatusDate,
      employmentStatus: this.ctlEmploymentStatus
    });


    if(this.lastItem != null){
      this.frm.get("employmentStatusDate").patchValue(tools.formatDate(new Date(this.lastItem.startDate)));
      this.frm.get("employmentStatus").patchValue(this.lastItem.employmentStatus);
    }
  }

  add(){
    this.frm.value.employmentStatusDate = tools.formatDate(new Date(this.frm.get("employmentStatusDate").value));
    this.dialogRef.close(this.frm.value);
  }
  cancel(){
    this.dialogRef.close();
  }
}
