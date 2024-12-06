import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Team, Teams } from '@frontend/api-interface';
import { TeamsService } from '@frontend/core-data';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-teams-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent {

  public frm: FormGroup;
  public ctlName: FormControl;
  public ctlAcronym: FormControl;
  public isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<TeamDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { team: Team; err:string, isNew: boolean; },
    private fb: FormBuilder,
    private teamsService : TeamsService,
  ) {
    this.ctlName = this.fb.control('', [
      Validators.minLength(3),
      Validators.maxLength(50)],[/*this.isServiceUnique()*/]);
    this.ctlAcronym = this.fb.control('', [
      Validators.minLength(2),
      Validators.maxLength(7)]);

    this.frm = this.fb.group({
      id: this.data.team.id,
      name: this.ctlName,
      acronym: this.ctlAcronym,
    });

    this.isNew = data.isNew;
    console.log(data.team);
    console.log(data.err);
    this.frm.patchValue(data.team);
  }

  update() {
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
