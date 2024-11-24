import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Candidacy} from '@frontend/api-interface';
import { CandidaciesFacadeService, JobOffersFacadeService } from '@frontend/core-state';
import * as _ from 'lodash-es';
import { tools } from '@frontend/shared';

@Component({
  selector: 'frontend-employment-dates',
  templateUrl: './employment-dates.component.html',
  styleUrls: ['./employment-dates.scss']
})
export class EmploymentDatesComponent {

  public frm: FormGroup;
  public ctlOccupiedFrom: FormControl;
  public ctlOccupiedTo: FormControl;
  public isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<EmploymentDatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { job,jobOffer},
    private fb: FormBuilder,
    private candidaciesFacadeService: CandidaciesFacadeService
  ) {
    this.ctlOccupiedFrom = this.fb.control('', [Validators.required]);
    this.ctlOccupiedTo = this.fb.control('', []);


    this.frm = this.fb.group({
      // jobOfferId: (data.jobOffer != null) ? data.jobOffer.jobOfferId : data.job.lastOccupiedJobOfferId,
      occupiedFrom: this.ctlOccupiedFrom,
      occupiedTo: this.ctlOccupiedTo,
      jobId: data.job.jobId
    });

    this.frm.get("occupiedFrom").patchValue(tools.formatDate(new Date(data.job.occupiedFrom)));

    if(this.isNotDefaultDate(data.job.occupiedTo) && data.job.occupiedTo != undefined){
      this.frm.get("occupiedTo").patchValue(tools.formatDate(new Date(data.job.occupiedTo)));
    }
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

  isNotDefaultDate(date) {
    return date !== '0001-01-01T00:00:00';
  }

  isEndDateConsistent(): any {
    return (ctl: FormControl) => {
        const formGp = ctl.parent;
        if(formGp){
          const enDated = new Date(ctl.value);
          const startDate = new Date(formGp.get('occupiedFrom').value);
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
    this.frm.value.occupiedFrom = tools.formatDate(new Date(this.frm.get("occupiedFrom").value));

    if(this.parseDateString(this.frm.get("occupiedTo").value)){
      this.frm.value.occupiedTo = tools.formatDate(new Date(this.frm.get("occupiedTo").value));
    }

    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
