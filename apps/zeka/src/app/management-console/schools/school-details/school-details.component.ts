import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { School, ServiceDetail, ServiceListVm } from '@frontend/api-interface';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent {

  public frm: FormGroup;
  public ctlName: FormControl;
  public ctlLocality: FormControl;
  public isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<SchoolDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { school: School; err:string, isNew: boolean; },
    private fb: FormBuilder,
  ) {
    this.ctlName = this.fb.control('', [
      Validators.minLength(2),
      Validators.maxLength(50)]);
    this.ctlLocality = this.fb.control('', [
      Validators.minLength(2),
      Validators.maxLength(50)]);

    this.frm = this.fb.group({
      schoolId: this.data.school.schoolId,
      name: this.ctlName,
      locality: this.ctlLocality,
    });

    this.isNew = data.isNew;
    this.frm.patchValue(data.school);
  }

  update() {
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
