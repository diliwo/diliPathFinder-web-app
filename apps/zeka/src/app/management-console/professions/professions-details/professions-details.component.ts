import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProfessionMv } from '@frontend/api-interface';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-professions-details',
  templateUrl: './professions-details.component.html',
  styleUrls: ['./professions-details.component.scss']
})
export class ProfessionsDetailsComponent {

  public frm: FormGroup;
  public ctlName: FormControl;
  public isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<ProfessionsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { profession: ProfessionMv.Profession; isNew: boolean; },
    private fb: FormBuilder,
  ) {
    this.ctlName = this.fb.control('', [
      Validators.minLength(3),
      Validators.maxLength(50)]);

    this.frm = this.fb.group({
      professionId: this.data.profession.professionId,
      name: this.ctlName
    });

    this.isNew = data.isNew;
    console.log(data.profession.professionId);
    this.frm.patchValue(data.profession);
  }

  update() {
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
