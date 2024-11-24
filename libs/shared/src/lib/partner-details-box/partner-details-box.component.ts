import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Partner, CategoryOfPartner, StatusOfPartner} from '@frontend/api-interface';
import { tools } from '@frontend/shared';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-partner-details',
  templateUrl: './partner-details-box.component.html',
  styleUrls: ['./partner-details-box.component.scss']
})
export class PartnerDetailsBoxComponent {
  public frm: FormGroup;
  public frmPhone: FormGroup;
  public ctlPartnerNumber: FormControl;
  public ctlName: FormControl;
  public ctlAddressNumber: FormControl;
  public ctlAddressStreet: FormControl;
  public ctlAddressBoxNumber: FormControl;
  public ctlAddressPostalCode: FormControl;
  public ctlAddressCity: FormControl;
  public ctlJobCoachId: FormControl;
  public ctlCategoryOfPartner: FormControl;
  public ctlStatusOfPartner: FormControl;
  public ctlDateOfAgreementSignature: FormControl;
  public ctlDateOfConclusion : FormControl;
  public ctlIsEconomieSociale: FormControl;
  public ctlNote : FormControl;
  public ctlPhoneNumber: FormControl;
  public ctlContactName: FormControl;
  public ctlContactGender: FormControl;
  public isNew: boolean;
  public listRefJobCoach: any[] = [];
  public phones;

  public readonly: boolean;

  categories: CategoryOfPartner[] = [
    { id: 1, value: 'Asbl 1030'},
    { id: 5, value: 'Asbl Hors 1030'},
    { id: 2, value: 'Asbl Socio Culturel'},
    { id: 4, value: 'Commune'},
    { id: 0, value: 'CPAS'},
    { id: 3, value: 'Entreprise privée'}
  ];

  status: StatusOfPartner[] = [
    { id: 0, value: 'Actif'},
    { id: 1, value: 'Inactif'},
    { id: 2, value: 'Clôturé'},
  ]



  constructor(
    public dialogRef: MatDialogRef<PartnerDetailsBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { partner: Partner; isNew: boolean, listReferents: any[], readonly: boolean},
    private fb: FormBuilder
    ){
      this.ctlPartnerNumber = this.fb.control('', []);
      this.ctlName = this.fb.control('', []);
      this.ctlAddressNumber = this.fb.control('', []);
      this.ctlAddressStreet = this.fb.control('', []);
      this.ctlAddressBoxNumber = this.fb.control('', []);
      this.ctlAddressPostalCode = this.fb.control('', []);
      this.ctlAddressCity = this.fb.control('', []);
      this.ctlJobCoachId = this.fb.control('', []);
      this.ctlCategoryOfPartner = this.fb.control('', []);
      this.ctlStatusOfPartner = this.fb.control('', []);
      this.ctlDateOfAgreementSignature = this.fb.control('', []);
      this.ctlDateOfConclusion = this.fb.control('', []);
      this.ctlIsEconomieSociale = this.fb.control('', []);
      this.ctlNote = this.fb.control('', []);

      this.frm = this.fb.group({
        partnerId: this.data.partner.partnerId,
        partnerNumber: this.ctlPartnerNumber,
        name: this.ctlName,
        streetNumber: this.ctlAddressNumber,
        streetName: this.ctlAddressStreet,
        boxNumber: this.ctlAddressBoxNumber,
        streetPostalCode: this.ctlAddressPostalCode,
        streetCity: this.ctlAddressCity,
        jobCoachId: this.ctlJobCoachId,
        categoryOfPartner: this.ctlCategoryOfPartner,
        statusOfPartner: this.ctlStatusOfPartner,
        dateOfAgreementSignature: this.ctlDateOfAgreementSignature,
        isEconomieSociale: this.ctlIsEconomieSociale,
        dateOfConclusion: this.ctlDateOfConclusion,
        note: this.ctlNote
      });

      this.ctlPhoneNumber = this.fb.control('', []);
      this.ctlContactName = this.fb.control('', []);
      this.ctlContactGender = this.fb.control('', []);
      this.frmPhone = this.fb.group({
          phoneNumber: this.ctlPhoneNumber,
          contactName: this.ctlContactName,
          gender: this.ctlContactGender
      });

      this.isNew = data.isNew;
      this.readonly = data.readonly;

      this.frm.get("partnerNumber")?.patchValue(data.partner.partnerNumber);
      this.frm.get("name")?.patchValue(data.partner.name);

      if(data.partner.dateOfAgreementSignature != undefined){
        this.frm.get("dateOfAgreementSignature")?.patchValue(tools.formatDate(new Date(data.partner.dateOfAgreementSignature)));
      }
      if(this.isNotDefaultDate(data.partner.dateOfConclusion) && data.partner.dateOfConclusion != undefined){
        this.frm.get("dateOfConclusion")?.patchValue(tools.formatDate(new Date(data.partner.dateOfConclusion)));
      }

      this.frm.get("streetNumber")?.patchValue(data.partner.streetNumber);
      this.frm.get("streetName")?.patchValue(data.partner.streetName);
      this.frm.get("boxNumber")?.patchValue(data.partner.boxNumber);
      this.frm.get("streetCity")?.patchValue(data.partner.streetCity);
      this.frm.get("streetPostalCode")?.patchValue(data.partner.streetPostalCode);
      this.frm.get("jobCoachId")?.patchValue(data.partner.jobCoachId);
      this.frm.get("note")?.patchValue(data.partner.note);
      this.frm.get("categoryOfPartner")?.patchValue(data.partner.categoryOfPartner);
      this.frm.get("statusOfPartner")?.patchValue(data.partner.statusOfPartner);
      this.frm.get("isEconomieSociale")?.patchValue(data.partner.isEconomieSociale);

      this.phones = _.cloneDeep(data.partner.phones);

      this.listRefJobCoach = data.listReferents;

      if(this.readonly){
        this.frm.disable();
        this.frmPhone.disable();
      }
    }

    get dateOfAgreementSignature() {
      return this.frm.controls['dateOfAgreementSignature'];
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    update() {
      const data = this.frm.value;
      data.phones = this.phones;
      this.dialogRef.close(data);
    }

    cancel() {
      this.dialogRef.close();
    }

    phoneAdd() {
      if (!this.phones) {
          this.phones = [];
      }
      this.phones.push(this.frmPhone.value);
      this.frmPhone.reset();
      this.frm.markAsDirty();
  }

  phoneDelete(phone) {
      _.remove(this.phones, phone);
      this.frm.markAsDirty();
  }

  hasOnlyDigit(phones: string){
    let spChars = /^\d{2}.+$/;
    if(spChars.test(phones)){
      return true;
    } else {
      return false;
    }
  }

  isNotDefaultDate(date) {
    return date !== '0001-01-01T00:00:00';
  }

  isEndDateConsistent(): any {
    return (ctl: FormControl) => {
        const formGp = ctl.parent;
        if(formGp){
          const enDated = new Date(ctl.value);
          const startDate = new Date(formGp.get('dateOfAgreementSignature')?.value);
          if (enDated.getTime() < startDate.getTime()){
            return { isEndDateConsistent: true }
          }
        }else {
          return null;
        }
    };
  }
}
