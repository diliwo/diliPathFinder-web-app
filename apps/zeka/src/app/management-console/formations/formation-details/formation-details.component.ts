import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { courseLevel, Field, Formation, SchoolListVm, ServiceDetail, ServiceListVm, TrainingFields, Type } from '@frontend/api-interface';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent {
  public frm: FormGroup;
  public ctlName: FormControl;
  public ctlType: FormControl;
  public ctlField: FormControl;
  public isNew: boolean;
  fields : TrainingFields;



  constructor(
    public dialogRef: MatDialogRef<FormationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formation: Formation; fields: TrainingFields, isNew: boolean; },
    private fb: FormBuilder,
  ) {
    this.ctlField = this.fb.control('', []);
    this.ctlName = this.fb.control('', [
      Validators.minLength(2),
      Validators.maxLength(50)]);
    this.ctlType = this.fb.control('', []);
    this.ctlField = this.fb.control('', []);
    this.frm = this.fb.group({
      formationId: this.data.formation.formationId,
      name: this.ctlName,
      trainingFieldId: this.ctlField
    });
    this.fields = this.data.fields;
    this.isNew = data.isNew;
    this.frm.get("formationId").patchValue(data.formation.formationId);
    this.frm.get("name").patchValue(data.formation.name);
    this.frm.get("trainingFieldId").patchValue(data.formation.trainingFieldId);
  }

  update() {
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
