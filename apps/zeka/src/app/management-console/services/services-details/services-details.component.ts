import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ServiceDetail, ServiceListVm } from '@frontend/api-interface';
import { ServicesIspService } from '@frontend/core-data';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-services-details',
  templateUrl: './services-details.component.html',
  styleUrls: ['./services-details.component.scss']
})
export class ServicesDetailsComponent {

  public frm: FormGroup;
  public ctlName: FormControl;
  public ctlAcronym: FormControl;
  public isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<ServicesDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { serviceDetail: ServiceDetail; err:string, isNew: boolean; },
    private fb: FormBuilder,
    private servicesIspService: ServicesIspService,
  ) {
    this.ctlName = this.fb.control('', [
      Validators.minLength(3),
      Validators.maxLength(50)],[/*this.isServiceUnique()*/]);
    this.ctlAcronym = this.fb.control('', [
      Validators.minLength(2),
      Validators.maxLength(7)]);

    this.frm = this.fb.group({
      serviceId: this.data.serviceDetail.serviceId,
      name: this.ctlName,
      acronym: this.ctlAcronym,
    });

    this.isNew = data.isNew;
    console.log(data.serviceDetail);
    console.log(data.err);
    this.frm.patchValue(data.serviceDetail);
  }

  // isServiceUnique(): any {
  //   let timeout: NodeJS.Timer;
  //   return (ctl: FormControl) => {
  //       clearTimeout(timeout);
  //       const name = ctl.value;
  //       return new Promise(resolve => {
  //           timeout = setTimeout(() => {
  //               if (ctl.pristine) {
  //                   resolve(null);
  //               } else {
  //                   this.servicesIspService.isServiceUnique(name).subscribe(service => {
  //                     console.log(service);
  //                       resolve(service ? { isServiceUnique: true } : false);
  //                   });
  //               }
  //           }, 300);
  //       });
  //   };
  // }

  update() {
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
