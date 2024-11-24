import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Candidacy, EmploymentTerminationReason, EmploymentTerminationType} from '@frontend/api-interface';
import * as _ from 'lodash-es';
import { tools } from '@frontend/shared';

@Component({
  selector: 'frontend-employment-termination-box',
  templateUrl: './employment-termination-box.component.html',
  styleUrls: ['./employment-termination-box.component.scss']
})
export class EmploymentTerminationComponent {
  public frm: FormGroup;
  public ctlEmploymentTerminationType: FormControl;
  public ctlEmploymentTerminationReasons = new FormControl([]);
  public ctlOccupiedTo: FormControl;
  listOfReasons : EmploymentTerminationReason[] = [];
  listOfTypes : EmploymentTerminationType[] = [];
  firstSelectedName: string;
  employmentStartDate: Date;
  specialOptions = ['CDD', 'CDR', 'CDI'];

  constructor(
    public dialogRef: MatDialogRef<EmploymentTerminationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { candidacy: Candidacy; employmentTerminationTypes: EmploymentTerminationType[]; employmentTerminationReasons: EmploymentTerminationReason[]; },
    private fb: FormBuilder,
  ) {
    this.ctlEmploymentTerminationType = this.fb.control(0,[]);
    this.ctlEmploymentTerminationReasons = this.fb.control([], []);
    this.ctlOccupiedTo = this.fb.control('', []);
    this.frm = this.fb.group({
      jobOfferId: data.candidacy.jobOfferId,
      beneficiaryId: data.candidacy.beneficiaryId,
      employmentTerminationTypeId: this.ctlEmploymentTerminationType,
      employmentTerminationReasonIds: this.ctlEmploymentTerminationReasons,
      occupiedFrom: tools.formatDate(new Date(data.candidacy.jobOfferStartDate)),
      occupiedTo: this.ctlOccupiedTo
    });

    this.frm.get("employmentTerminationTypeId").patchValue(data.candidacy.employmentTerminationType.id);
    this.frm.get("employmentTerminationReasonIds").patchValue(data.candidacy.terminationReasonsForEmployment.items.reduce((a, o) => (a.push(o.id), a), []));
    this.frm.get("occupiedTo").patchValue(data.candidacy.jobOfferEndDate);
    // if(data.candidacy.jobOfferEndDate != undefined){
    //   this.frm.get("occupiedTo").patchValue(tools.formatDate(new Date(data.candidacy.jobOfferEndDate)));
    // }

    this.listOfReasons = data.employmentTerminationReasons;
    this.listOfTypes = data.employmentTerminationTypes;
    this.employmentStartDate = data.candidacy.jobOfferStartDate;

    this.ctlEmploymentTerminationReasons.valueChanges.subscribe((selectedValues) => {
      this.handleValueChanges(selectedValues);
    });
  }


  cancel() {
    this.dialogRef.close();
  }



  get f() { return this.frm.controls; }

  terminate(){
    this.frm.value.occupiedTo = tools.formatDate(new Date(this.frm.get("occupiedTo").value));
    this.dialogRef.close(this.frm.value);
  }

  getSelectedReasonName(id: number): string {
    const selectedReason = this.listOfReasons.find((reason) => reason.id == id);
    const test = this.ctlEmploymentTerminationReasons.value?.[0];
    return selectedReason?.name;
  }

  containsNonCumulativesValues(currentOptionId : number) : boolean{
    const selectedValues = this.ctlEmploymentTerminationReasons.value || [];
    const selectedReasons = this.listOfReasons.filter(reason => selectedValues.includes(reason.id));

    const results = selectedReasons.filter(reason => this.specialOptions.includes(reason.name));

    return results.length > 0  && results.find(reason => reason.id == currentOptionId) == undefined ? true : false;
  }

  handleValueChanges(selectedValues: any[]): void {
    const selectedReasons = this.listOfReasons.filter(reason => selectedValues.includes(reason.id));
    const selectedSpecialOptions = selectedReasons.filter(reason => this.specialOptions.includes(reason.name));

    if (selectedSpecialOptions.length > 0) {

      const newSelectedValues = selectedValues.filter(value => {
        const reason = this.listOfReasons.find(r => r.id === value);
        return reason && this.specialOptions.includes(reason.name);
      });
      this.ctlEmploymentTerminationReasons.setValue(newSelectedValues, { emitEvent: false });
    }
  }
}

