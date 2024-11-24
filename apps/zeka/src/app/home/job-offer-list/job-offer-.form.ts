/* eslint-disable quotes */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { JobDetail} from '@frontend/api-interface';
import { ServicesIspFacadeService, SupportsFacadeService } from '@frontend/core-state';
import * as _ from 'lodash-es';
import { ManagementConsoleComponent } from '../../management-console/management-console.component';
import { tools } from '@frontend/shared';

@Component({
  selector: 'frontend-job-offer-list',
  templateUrl: './job-offer-list.component.html',
  styleUrls: ['./job-offer-list.component.scss']
})
export class JobOfferListComponent implements OnInit {

  public frm: FormGroup;
  public ctlJobTitle: FormControl;
  public ctlReward : FormControl;
  public ctlIsVacant: FormControl;
  public ctlComment: FormControl;
  public ctlTypeOfJob: FormControl;
  public ctlStatusOfJobOffer: FormControl;
  public ctlCategoryOfJob: FormControl;
  public ctlPartnerName:FormControl;
  public ctlNumberOfCandidates:FormControl;
  public ctlLastJobOfferVacancyDateTime:FormControl;
  public ctlLastJobOfferOccupationDateTime:FormControl;
  public ctlLastDate:FormControl;

  public isNew: boolean;
  public listOfConsultants: any[];

  constructor(
    public dialogRef: MatDialogRef<JobDetail>,
    @Inject(MAT_DIALOG_DATA) public data: { jobDetail: JobDetail },
    private fb: FormBuilder,
    private supportsFacadeService: SupportsFacadeService
  ) {
    this.ctlJobTitle = this.fb.control('', []);
    this.ctlReward = this.fb.control('', []);
    this.ctlIsVacant = this.fb.control('', []);
    this.ctlComment = this.fb.control('', []);
    this.ctlTypeOfJob = this.fb.control('', []);
    this.ctlStatusOfJobOffer = this.fb.control('', []);
    this.ctlCategoryOfJob = this.fb.control('', []);
    this.ctlPartnerName = this.fb.control('', []);
    this.ctlLastJobOfferVacancyDateTime = this.fb.control('', []);
    this.ctlLastJobOfferOccupationDateTime = this.fb.control('', []);
    this.ctlLastDate = this.fb.control('', []);

    this.frm = this.fb.group({
      jobId: this.data.jobDetail.jobId,
      jobTitle : this.ctlJobTitle,
      reward : this.ctlReward,
      isVacant:this.ctlIsVacant,
      comment:this.ctlComment,
      typeOfJob : this.ctlTypeOfJob,
      statusOfJobOffer : this.ctlStatusOfJobOffer,
      categoryOfJob : this.ctlCategoryOfJob,
      partnerName : this.ctlPartnerName,
      lastJobOfferVacancyDateTime : this.ctlLastJobOfferVacancyDateTime,
      lastJobOfferOccupationDateTime : this.ctlLastJobOfferOccupationDateTime,
      lastDate : this.ctlLastDate
    });

    this.frm.get("jobTitle").patchValue(tools.formatDate(new Date(data.jobDetail.jobTitle)));
    this.frm.get("reward").patchValue(data.jobDetail.reward);
    this.frm.get("isVacant").patchValue(data.jobDetail.isVacant);
    this.frm.get("comment").patchValue(data.jobDetail.comment);
    this.frm.get("typeOfJob").patchValue(data.jobDetail.typeOfJob);
    this.frm.get("statusOfJobOffer").patchValue(data.jobDetail.statusOfJobOffer);
    this.frm.get("categoryOfJob").patchValue(data.jobDetail.categoryOfJob);
    this.frm.get("partnerName").patchValue(data.jobDetail.partnerName);
    this.frm.get("lastJobOfferVacancyDateTime").patchValue(data.jobDetail.lastJobOfferVacancyDateTime);
    this.frm.get("lastJobOfferOccupationDateTime").patchValue(data.jobDetail.lastJobOfferOccupationDateTime);
    this.frm.get("lastDate").patchValue(data.jobDetail.lastDate);
  }

  ngOnInit(): void {
  }

}
