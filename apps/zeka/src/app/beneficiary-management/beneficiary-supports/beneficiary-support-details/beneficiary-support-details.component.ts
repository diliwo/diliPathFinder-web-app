import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Referent, UpsertReferenceCommand, Support, MySupport} from '@frontend/api-interface';
import { ServicesIspFacadeService, SupportsFacadeService } from '@frontend/core-state';
import * as _ from 'lodash-es';
import { ManagementConsoleComponent } from '../../../management-console/management-console.component';
import { tools } from '@frontend/shared';

@Component({
  selector: 'frontend-support-details',
  templateUrl: './beneficiary-support-details.component.html',
  styleUrls: ['./beneficiary-support-details.component.scss']
})
export class BeneficiarySupportDetailsComponent {

  public frm: FormGroup;
  public ctlStartDate: FormControl;
  public ctlEndDate: FormControl;
  public ctlReferent: FormControl;
  public ctlNote: FormControl;
  public isNew: boolean;
  public listOfConsultants: Referent[];
  public filteredlistOfConsultants: Referent[];

  constructor(
    public dialogRef: MatDialogRef<BeneficiarySupportDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { support: Support; isNew: boolean; referents: any[], idBenef:number},
    private fb: FormBuilder,
    private supportsFacadeService: SupportsFacadeService
  ) {
    this.ctlStartDate = this.fb.control('', []);
    this.ctlReferent = this.fb.control('', []);
    this.ctlNote = this.fb.control('',[]);

    this.frm = this.fb.group({
      supportId: this.data.support.supportId,
      startdate: this.ctlStartDate,
      referentId: this.ctlReferent,
      note: this.ctlNote,
      beneficiaryId: data.idBenef,
    });

    this.isNew = data.isNew;
    this.listOfConsultants = data.referents;
    this.filteredlistOfConsultants = this.listOfConsultants;
    this.frm.get("startdate").patchValue(tools.formatDate(new Date(data.support.startDate)));
    this.frm.get("note").patchValue(data.support.note);
    this.frm.get("referentId").patchValue(data.support.referentId);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.frm.value.startdate = tools.formatDate(new Date(this.frm.get("startdate").value));
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

  onSearch(value: string) {
    this.filteredlistOfConsultants = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.listOfConsultants.filter(option =>
      option.fullname.toLowerCase().includes(filter)
    );
  }
}

