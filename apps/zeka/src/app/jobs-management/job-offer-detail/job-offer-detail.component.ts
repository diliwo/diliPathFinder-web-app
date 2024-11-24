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
  selector: 'frontend-job-offer-detail',
  templateUrl: './job-offer-detail.component.html',
  styleUrls: ['./job-offer-detail.component.scss']
})
export class JobOfferDetailComponent {
  public frm: FormGroup;
  ctlVacancyDate: FormControl;
  ctlStatusOfJobOffer = new FormControl(false);
  public isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<JobOfferDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobOfferDetail: JobOfferDetail; isNew: boolean; },
    private fb: FormBuilder,
    private jobOffersFacadeService: JobOffersFacadeService
  ) {
    this.ctlVacancyDate = this.fb.control('',[]);

    this.frm = this.fb.group({
      jobOfferId: this.data.jobOfferDetail.jobOfferId,
      candidacyId: '0',
      vacancyDate: this.ctlVacancyDate,
      startOccupationDate: '0001-01-01T00:00:00',
      endOccupationDate:'0001-01-01T00:00:00',
      statusOfJobOffer : this.ctlStatusOfJobOffer,
      jobId: data.jobOfferDetail.jobId,
      employmentStatus: undefined
    });
    this.isNew = data.isNew;
    //this.frm.patchValue(data.jobOfferDetail);
    console.log(data.jobOfferDetail);
    console.log(data.jobOfferDetail.vacancyDate);
    if (data.jobOfferDetail.vacancyDate) {
      this.frm.get("vacancyDate").patchValue(tools.formatDate(new Date(data.jobOfferDetail.vacancyDate)));
    } else {
      this.frm.get("vacancyDate").patchValue(tools.formatDate(new Date()));
    }
    this.frm.get("statusOfJobOffer").patchValue(data.jobOfferDetail.statusOfJobOffer);
   }

   onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.frm.value.vacancyDate = tools.formatDate(new Date(this.frm.get("vacancyDate").value));
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
