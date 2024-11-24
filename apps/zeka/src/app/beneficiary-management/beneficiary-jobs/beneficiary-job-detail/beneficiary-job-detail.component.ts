import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Candidacy, JobOfferDetail} from '@frontend/api-interface';
import { CandidaciesFacadeService, JobOffersFacadeService } from '@frontend/core-state';
import * as _ from 'lodash-es';
import { tools } from '@frontend/shared';

@Component({
  selector: 'frontend-beneficiary-job-detail',
  templateUrl: './beneficiary-job-detail.component.html',
  styleUrls: ['./beneficiary-job-detail.component.scss']
})
export class BeneficiaryJobDetailComponent {

  public frm: FormGroup;
  public ctlJobOffer: FormControl;
  public ctlIsHired: FormControl;
  public ctlApplicationDate: FormControl;
  public isNew: boolean;
  public listOfJoboffers: JobOfferDetail[];
  public filteredListOfJoboffers: JobOfferDetail[];
  public jobOfferDate: Date;

  constructor(
    public dialogRef: MatDialogRef<BeneficiaryJobDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { candidacyDetail: Candidacy; isNew: boolean; joboffers: JobOfferDetail[], idBenef:number},
    private fb: FormBuilder,
    private candidaciesFacadeService: CandidaciesFacadeService
  ) {
    this.ctlJobOffer = this.fb.control('', []);
    this.ctlApplicationDate = this.fb.control('', [Validators.required]);

    this.frm = this.fb.group({
      candidacyId: this.data.candidacyDetail.candidacyId,
      jobOfferId: this.ctlJobOffer,
      isHired: data.candidacyDetail.isHired,
      applicationDate : this.ctlApplicationDate,
      beneficiaryId: data.idBenef,
    });

    this.isNew = data.isNew;
    this.listOfJoboffers = data.joboffers;
    this.filteredListOfJoboffers = this.listOfJoboffers.sort((a,b)=> { return a.jobOfferNumber - b.jobOfferNumber});
    this.frm.get("jobOfferId").patchValue(data.candidacyDetail.jobOfferId);
    this.frm.get("isHired").patchValue(data.candidacyDetail.isHired);
    if(data.candidacyDetail.applicationDate != undefined){
      this.frm.get("applicationDate").patchValue(tools.formatDate(new Date(data.candidacyDetail.applicationDate)));
    }

    //job offer start date must be older thant application date
    this.ctlJobOffer.valueChanges.subscribe(selectedJobOfferId => {
      const jobOffer = this.findObjectById(selectedJobOfferId);
      this.jobOfferDate = jobOffer.vacancyDate;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.frm.value.applicationDate = tools.formatDate(new Date(this.frm.get("applicationDate").value));
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }


  onSearch(value: string) {
    this.filteredListOfJoboffers = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.listOfJoboffers.filter(option =>
      option.jobInfo.toLowerCase().includes(value)
    );
  }

  findObjectById(id: number): JobOfferDetail | undefined {
    return this.filteredListOfJoboffers.find(obj => obj.jobOfferId === id);
  }
}
