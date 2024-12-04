import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { courseLevel, Field, Training, SchoolListVm, Team, Teams, TrainingFields, Type } from '@frontend/api-interface';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.scss']
})
export class trainingDetailsComponent {
  public frm: FormGroup;
  public ctlName: FormControl;
  public ctlType: FormControl;
  public ctlField: FormControl;
  public isNew: boolean;
  fields : TrainingFields;



  constructor(
    public dialogRef: MatDialogRef<trainingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { training: Training; fields: TrainingFields, isNew: boolean; },
    private fb: FormBuilder,
  ) {
    this.ctlField = this.fb.control('', []);
    this.ctlName = this.fb.control('', [
      Validators.minLength(2),
      Validators.maxLength(50)]);
    this.ctlType = this.fb.control('', []);
    this.ctlField = this.fb.control('', []);
    this.frm = this.fb.group({
      trainingId: this.data.training.id,
      name: this.ctlName,
      trainingFieldId: this.ctlField
    });
    this.fields = this.data.fields;
    this.isNew = data.isNew;
    this.frm.get("trainingId").patchValue(data.training.id);
    this.frm.get("name").patchValue(data.training.name);
    this.frm.get("trainingFieldId").patchValue(data.training.trainingFieldId);
  }

  update() {
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
