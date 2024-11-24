import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BeneficiaryFormation, FormationResult, Formation, courseLevel, School, TrainingType} from '@frontend/api-interface';
import * as _ from 'lodash-es';
import { tools } from '@frontend/shared';

@Component({
  selector: 'frontend-beneficiary-formation-details',
  templateUrl: './beneficiary-formation-details.component.html',
  styleUrls: ['./beneficiary-formation-details.component.scss']
})
export class BeneficiaryFormationDetailsComponent {
  public frm: FormGroup;
  public ctlFormationId: FormControl;
  public ctlSchoolId: FormControl;
  public ctlTrainingtypeId: FormControl;
  public ctlNote: FormControl;
  public ctlCourseLevel: FormControl;
  public ctlresultId: FormControl;
  public ctlStartDate: FormControl;
  public ctlEndDate: FormControl;
  public isNew: boolean;
  listOfFormations : Formation[] = [];
  filteredlistOfFormations : any[] = [];
  listOfSchools : School[] = [];
  filteredlistOfSchools : any[] = [];
  filteredlistOftrainingtypes : any[] = [];
  listOftrainingtypes : TrainingType[] = [];

  results : FormationResult[] = [
    { id: 0, value: 'En cours'},
    { id: 1, value: 'Réussite'},
    { id: 2, value: 'Echec'},
    { id: 3, value: 'Abandon'},
  ];

  courseLevels : courseLevel [] = [
    { id: 0, value: 'Autre'},
    { id: 1, value: '1ère'},
    { id: 2, value: '2eme'},
    { id: 3, value: '3eme'},
    { id: 4, value: '4eme'},
    { id: 5, value: '5eme'},
    { id: 6, value: '6eme'},
    { id: 7, value: '7eme'},
    { id: 8, value: 'A1'},
    { id: 9, value: 'A2'},
    { id: 10, value: 'B1'},
    { id: 11, value: 'B2'},
    { id: 12, value: 'C1'},
    { id: 13, value: 'C2'}
  ];

  constructor(
    public dialogRef: MatDialogRef<BeneficiaryFormationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { benefFormation: BeneficiaryFormation; schools: School[]; formations: Formation[]; trainingTypes: TrainingType[]; isNew: boolean; },
    private fb: FormBuilder,
  ) {
    this.ctlFormationId = this.fb.control('', []);
    this.ctlSchoolId = this.fb.control('', []);
    this.ctlTrainingtypeId = this.fb.control('', []);
    this.ctlNote = this.fb.control('', [
      Validators.minLength(2),
      Validators.maxLength(50)]);
    this.ctlCourseLevel = this.fb.control('', []);
    this.ctlresultId = this.fb.control('', []);
    this.ctlStartDate = this.fb.control('', []);
    this.ctlEndDate = this.fb.control('', []);
    this.frm = this.fb.group({
      schoolRegistrationId: this.data.benefFormation.schoolRegistrationId,
      formationId: this.ctlFormationId,
      schoolId: this.ctlSchoolId,
      trainingTypeId: this.ctlTrainingtypeId,
      beneficiaryId: this.data.benefFormation.beneficiaryId,
      note: this.ctlNote,
      courseLevel: this.ctlCourseLevel,
      result: this.ctlresultId,
      startDate:this.ctlStartDate,
      enDate: this.ctlEndDate
    });
    this.listOfFormations = data.formations;
    this.listOfSchools = data.schools;
    this.listOftrainingtypes = data.trainingTypes;

    this.filteredlistOfFormations = this.listOfFormations;
    this.filteredlistOfSchools = this.listOfSchools;
    this.isNew = data.isNew;
    this.frm.get("schoolRegistrationId").patchValue(data.benefFormation.schoolRegistrationId);
    this.frm.get("formationId").patchValue(data.benefFormation.formationId);
    this.frm.get("schoolId").patchValue(data.benefFormation.schoolId);
    this.frm.get("trainingTypeId").patchValue(data.benefFormation.trainingTypeId);
    this.frm.get("beneficiaryId").patchValue(data.benefFormation.beneficiaryId);
    this.frm.get("note").patchValue(data.benefFormation.note);
    this.frm.get("courseLevel").patchValue(data.benefFormation.courseLevel);
    this.frm.get("result").patchValue(data.benefFormation.schoolResult);
    this.frm.get("startDate").patchValue(tools.formatDate(new Date(data.benefFormation.startDate)));
    this.frm.get("enDate").patchValue(tools.formatDate(new Date(data.benefFormation.enDate)));
    //this.frm.patchValue(data.formation);
  }

  update() {
    this.frm.value.startDate = tools.formatDate(new Date(this.frm.get("startDate").value));
    this.frm.value.enDate = tools.formatDate(new Date(this.frm.get("enDate").value));
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

  onSearch(value: string, type : string) {
    if(type == 'school'){
      this.filteredlistOfSchools = this.search(value,type);
    } else if(type == 'formation'){
      this.filteredlistOfFormations = this.search(value,type);
    }
  }

  search(value: string, type: string) {
    let filter = value.toLowerCase();
    if(type == 'school'){
      return this.listOfSchools.filter(option =>
        option.name.toLowerCase().includes(filter)
      );
    } else {
        return this.listOfFormations.filter(option =>
          option.name.toLowerCase().includes(filter)
        );
    }
  }

  get f() { return this.frm.controls; }

  isEndDateConsistent(): any {
    return (ctl: FormControl) => {
        const formGp = ctl.parent;
        if(formGp){
          const enDated = new Date(ctl.value);
          const startDate = new Date(formGp.get('startDate').value);
          if (enDated.getTime() < startDate.getTime()){
            return { isEndDateConsistent: true }
            formGp.get('startDate').setErrors({ isEndDateConsistent: true });
          }
        }else {
          return null;
        }
    };
  }

  isStartDateConsistent(): any {
    return (ctl: FormControl) => {
        const formGp = ctl.parent;
        if(formGp){
          const startDate = new Date(ctl.value);
          const enDated = new Date(formGp.get('enDate').value);
          if (enDated.getTime() < startDate.getTime()){
            return { isStartDateConsistent: true }
          }
        }else {
          return null;
        }
    };
  }

}

