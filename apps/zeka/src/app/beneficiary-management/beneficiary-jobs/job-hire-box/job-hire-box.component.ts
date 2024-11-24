import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Candidacy, JobOfferDetail} from '@frontend/api-interface';
import { CandidaciesFacadeService, JobOffersFacadeService } from '@frontend/core-state';
import * as _ from 'lodash-es';
import { tools } from '@frontend/shared';

@Component({
  selector: 'frontend-job-hire-box',
  templateUrl: './job-hire-box.component.html',
  styleUrls: ['./job-hire-box.component.scss']
})
export class JobHireBoxComponent {
  workScheduletypes: any[] = [
    {id: 0, value: 'Temps plein'},
    {id: 1, value: 'Temps partiel'}
  ];

  public frm: FormGroup;
  public ctlStartDate: FormControl;
  public ctlEndDate: FormControl;
  public ctlEmploymentStatusDate: FormControl;
  public ctlEmploymentStatus: FormControl;
  public isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<JobHireBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { candicyId:number,joboffer : JobOfferDetail,isNew : boolean },
    private fb: FormBuilder,
    private candidaciesFacadeService: CandidaciesFacadeService
  ) {
    this.ctlStartDate = this.fb.control('', [Validators.required]);
    this.ctlEndDate = this.fb.control('', []);
    this.ctlEmploymentStatus = this.fb.control(this.workScheduletypes[0].id, []);
    this.ctlEmploymentStatusDate = this.fb.control('', []);

    this.frm = this.fb.group({
      jobOfferId: data.joboffer.jobOfferId,
      candidacyId: data.candicyId,
      vacancyDate: data.joboffer.vacancyDate,
      startOccupationDate: this.ctlStartDate,
      endOccupationDate: this.ctlEndDate,
      employmentStatus: this.ctlEmploymentStatus,
      jobId: data.joboffer.jobId
    });

    this.isNew = data.isNew;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  areDatesConsistent(startDate : Date, lastDate: Date){
    const dateStart = new Date(startDate);
    const dateEnd = new Date(lastDate);

    if (new Date(startDate).getTime() > new Date(lastDate).getTime()){
      return false;
    }
    return true;
  }

  isEndDateConsistent(): any {
    return (ctl: FormControl) => {
        const formGp = ctl.parent;
        if(formGp){
          const enDated = new Date(ctl.value);
          const startDate = new Date(formGp.get('startOccupationDate').value);
          if (enDated.getTime() < startDate.getTime()){
            return { isEndDateConsistent: true }
          }
        }else {
          return null;
        }
    };
  }

  parseDateString(dateString: string): boolean {
    if (!dateString || !Date.parse(dateString)) {
        console.error("Invalid date string:", dateString);
        return false;
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error("Could not convert string to DateTime:", dateString);
        return false;
    }

    return true;
}

  update() {
    this.frm.value.startOccupationDate = tools.formatDate(new Date(this.frm.get("startOccupationDate").value));
    if(this.parseDateString(this.frm.get("endOccupationDate").value)){
      this.frm.value.endOccupationDate = tools.formatDate(new Date(this.frm.get("endOccupationDate").value));
    }
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
