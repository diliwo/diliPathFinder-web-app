import {Component, ViewChild, OnInit} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NatureOfContract, NatureOfContracts, ProfessionnalExperience, TypeOfContract} from '@frontend/api-interface';
import * as _ from 'lodash-es';
import { tools } from '@frontend/shared';

@Component({
  selector: 'frontend-professional-expectation-detail',
  templateUrl: './professional-experience-detail.component.html',
  styleUrls: ['./professional-experience-detail.component.scss']
})
export class ProfessionalExperienceDetailComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public frm: FormGroup;
  public ctlEndDate: FormControl;
  public ctlStartDate: FormControl;
  public ctlCompanyName: FormControl;
  public ctlFunction: FormControl;
  public ctlTask: FormControl;
  public ctlEnvironment: FormControl;
  public ctlContextOfHiring: FormControl;
  public ctlTypeOfContract: FormControl;
  public ctlReasonEndOfContract: FormControl;
  public isNew: boolean;
  contracts : NatureOfContract[];

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(
    public dialogRef: MatDialogRef<ProfessionalExperienceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { experience: ProfessionnalExperience, listOfcontracts: NatureOfContract[], isNew: boolean },
    private fb: FormBuilder
  ) {
    this.ctlStartDate = this.fb.control(tools.formatDate(new Date()), [
      Validators.required,
      tools.dateValidator.bind(this)]);
    this.ctlEndDate = this.fb.control(tools.formatDate(new Date()), [
      tools.isEndDateConsistent('startDate'),
      Validators.required,
      tools.dateValidator.bind(this)]);
    this.ctlCompanyName = this.fb.control('', []);
    this.ctlFunction = this.fb.control('', []);
    this.ctlTask = this.fb.control('',[]);
    this.ctlEnvironment = this.fb.control('',[]);
    this.ctlContextOfHiring = this.fb.control('',[]);
    this.ctlTypeOfContract = this.fb.control('',[]);
    this.ctlReasonEndOfContract = this.fb.control('',[]);

    this.frm = this.fb.group({
      professionalExperienceId: this.data.experience.professionalExperienceId,
      startDate:this.ctlStartDate,
      endDate:this.ctlEndDate,
      companyName: this.ctlCompanyName,
      function: this.ctlFunction,
      task: this.ctlTask,
      environment: this.ctlEnvironment,
      contextOfHiring: this.ctlContextOfHiring,
      natureOfContractId: this.ctlTypeOfContract,
      reasonEndOfContract: this.ctlReasonEndOfContract,
      beneficiaryId: this.data.experience.beneficiaryId
    });
    this.contracts = data.listOfcontracts;
    this.isNew = data.isNew;
    this.frm.get("professionalExperienceId").patchValue(data.experience.professionalExperienceId);
    this.frm.get("startDate").patchValue(tools.formatDate(new Date(data.experience.startDate)));
    this.frm.get("endDate").patchValue(tools.formatDate(new Date(data.experience.endDate)));
    this.frm.get("function").patchValue(data.experience.function);
    this.frm.get("companyName").patchValue(data.experience.companyName);
    this.frm.get("task").patchValue(data.experience.task);
    this.frm.get("environment").patchValue(data.experience.environment);
    this.frm.get("contextOfHiring").patchValue(data.experience.contextOfHiring);
    this.frm.get("natureOfContractId").patchValue(data.experience.natureOfContractId);
    this.frm.get("reasonEndOfContract").patchValue(data.experience.reasonEndOfContract);
  }

  update() {
    this.frm.value.startDate = tools.formatDate(new Date(this.frm.get("startDate").value));
    this.frm.value.endDate = tools.formatDate(new Date(this.frm.get("endDate").value));
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
