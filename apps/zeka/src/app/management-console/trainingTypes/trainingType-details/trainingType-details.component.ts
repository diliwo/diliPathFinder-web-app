import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProfessionMv, TrainingType } from '@frontend/api-interface';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-trainingtype-details',
  templateUrl: './trainingType-details.component.html',
  styleUrls: ['./trainingType-details.component.scss']
})
export class TrainingTypesDetailsComponent {

  public frm: FormGroup;
  public ctlName: FormControl;
  public isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<TrainingTypesDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: TrainingType; isNew: boolean; },
    private fb: FormBuilder,
  ) {
    this.ctlName = this.fb.control('', [
      Validators.minLength(3),
      Validators.maxLength(50)]);

    this.frm = this.fb.group({
      id: data.type.id,
      name: this.ctlName
    });

    this.isNew = data.isNew;
    this.frm.get("name").patchValue(data.type.name);
  }

  update() {
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
