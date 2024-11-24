import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { JobDetail, JobsListVm, Reward, StatusOfJobOffer, CategoryOfJob,TypeOfJob, DocumentDetail, AnnualClosure, MessageType, PartnerSelection } from '@frontend/api-interface';
import { JobsFacadeService, NotificationService } from '@frontend/core-state';
import * as _ from 'lodash-es';
import { Observable } from 'rxjs';
import { DEFAULT_RESIZE_TIME } from '@angular/cdk/scrolling';




@Component({
  selector: 'frontend-jobs-detail',
  templateUrl: './jobs-detail.component.html',
  styleUrls: ['./jobs-detail.component.scss']
})
export class JobsDetailComponent implements OnInit {
  public filteredListOfPartners: PartnerSelection[];
  statusOfJobOffer: StatusOfJobOffer[] = [
    {id: 0, value: 'Ouvert'},
    {id: 1, value: 'Fermé'}
  ];

  categoryOfJob: CategoryOfJob[] = [
    {id: 0, value: 'Ouvrier'},
    {id: 1, value: 'Employé'}
  ];

  typeOfJob: TypeOfJob[] = [
    {id: 0, value: 'Nouveau'},
    {id: 1, value: 'Remplacement'}
  ];
  months :any[]= [
    {id:1, value : 'Janvier', nbDays:31},
    {id:2, value : 'Février', nbDays: this.leapYear() ? 28 : 28}, // Pour l'instant l'année bissextile n'est pas prise en compte
    {id:3, value : 'Mars', nbDays:31},
    {id:4, value : 'Avril', nbDays:30},
    {id:5, value : 'Mai', nbDays:31},
    {id:6, value : 'June', nbDays:30},
    {id:7, value : 'Juillet', nbDays:31},
    {id:8, value : 'Août', nbDays:31},
    {id:9, value : 'Septembre', nbDays:30},
    {id:10, value : 'Octobre', nbDays:31},
    {id:11, value : 'Novembre', nbDays:30},
    {id:12, value : 'Décembre', nbDays:31}
  ]
  startDays: number[] = [];
  endDays: number[] = [];

  public frm: FormGroup;
  ctlJobTitle: FormControl;
  ctlJobNumber: FormControl;
  ctlReward: FormControl;
  ctlComment: FormControl;
  //ctlTypeOfJob: FormControl;
  ctlTypeOfJob = new FormControl(this.typeOfJob[0].id);
  ctlStatusOfJobOffer = new FormControl(this.statusOfJobOffer[0].id);
  ctlCategoryOfJob: FormControl;
  ctlPartnerId: FormControl;
  ctlStartDay: FormControl;
  ctlStartMonth: FormControl;
  ctlEndDay: FormControl;
  ctlEndMonth: FormControl;
  public isNew: boolean;
  public annualClosureFrm: FormGroup;
  public annualClosures : AnnualClosure[] = [];

  rewards: Reward[] = [];

  listOfPartners: PartnerSelection[] = [];
  constructor(
    public dialogRef: MatDialogRef<JobsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobDetail: JobDetail; isNew: boolean; partners: any[], rewards: Reward[]},
    private fb: FormBuilder,
    private jobsFacadeService: JobsFacadeService,
    private notificationService : NotificationService
  ) {
      this.ctlJobTitle = this.fb.control('',[Validators.required]);
      this.ctlJobNumber = this.fb.control('',[
        Validators.required,
        this.validateNumberDigits]);
      this.ctlReward = this.fb.control('',[Validators.required]);
      this.ctlComment = this.fb.control('',[]);
      this.ctlTypeOfJob = this.fb.control(0,[Validators.required]);
      this.ctlStatusOfJobOffer = this.fb.control(0,[Validators.required]);
      this.ctlCategoryOfJob = this.fb.control('',[Validators.required]);
      this.ctlPartnerId = this.fb.control(0,[Validators.required]);

      this.frm = this.fb.group({
        jobId: this.data.jobDetail.jobId,
        jobTitle: this.ctlJobTitle,
        jobNumber: this.ctlJobNumber,
        reward: this.ctlReward,
        comment: this.ctlComment,
        typeOfJob: this.ctlTypeOfJob,
        statusOfJobOffer: this.ctlStatusOfJobOffer,
        categoryOfJob: this.ctlCategoryOfJob,
        partnerId: this.ctlPartnerId
      });
      this.ctlStartDay = this.fb.control('',[Validators.required]);
      this.ctlStartMonth = this.fb.control('',[Validators.required]);
      this.ctlEndDay= this.fb.control('',[Validators.required]);
      this.ctlEndMonth= this.fb.control('',[Validators.required]);
      this.annualClosureFrm = this.fb.group({
        id: new FormControl(0,[]),
        startDay: this.ctlStartDay,
        startMonth: this.ctlStartMonth,
        endDay: this.ctlEndDay,
        endMonth: this.ctlEndMonth
    });

      this.isNew = data.isNew;
      this.listOfPartners = data.partners;
      this.filteredListOfPartners = this.listOfPartners;
      this.frm.get("jobTitle").patchValue(data.jobDetail.jobTitle);
      this.frm.get("jobNumber").patchValue(data.jobDetail.jobNumber);
      this.frm.get("reward").patchValue(data.jobDetail.reward);
      this.frm.get("comment").patchValue(data.jobDetail.comment);
      this.frm.get("typeOfJob").patchValue(data.jobDetail.typeOfJob);
      this.frm.get("statusOfJobOffer").patchValue(data.jobDetail.statusOfJobOffer);
      this.frm.get("categoryOfJob").patchValue(data.jobDetail.categoryOfJob);

      if(data.jobDetail.partnerId){
        this.frm.get("partnerId").patchValue(data.jobDetail.partnerId);
      }

      this.rewards = data.rewards;
      this.annualClosures = _.cloneDeep(data.jobDetail.annualClosures);
   }
  ngOnInit(): void {
    this.annualClosureFrm.get('startMonth')!.valueChanges.subscribe((value) => {
      let monthId = Number(value);
      let month = this.months.find((s) => s.id == monthId);
      if (month) {
        this.startDays = Array(+month.nbDays).fill(1).map((x,i)=>i+1);
      }
    });
    this.annualClosureFrm.get('endMonth')!.valueChanges.subscribe((value) => {
      let monthId = Number(value);
      let month = this.months.find((s) => s.id == monthId);
      if (month) {
        this.endDays = Array(+month.nbDays).fill(1).map((x,i)=>i+1);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    let data = this.frm.value;
    data.annualClosures = this.annualClosures;
    this.dialogRef.close(data);
  }

  cancel() {
    this.dialogRef.close();
  }

  leapYear()
  {
    let year = new Date().getFullYear();
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }
  padDay (day: number){
    return String(day).padStart(2, '0');
  }

  closureAdd(){
    if (!this.annualClosures) {
      this.annualClosures = [];
    }
    let c = this.annualClosureFrm.value;
    let year = new Date().getFullYear();
    let startDate =  new Date(year, c.startMonth, c.startDay).getTime();
    let endDate = new Date(year, c.endMonth, c.endDay).getTime();
    if(startDate <= endDate ){
      this.annualClosures.push(this.annualClosureFrm.value);
      this.annualClosureFrm.reset();
      this.frm.markAsDirty();
    }else{
      this.notificationService.showMessage("La date de début ne peut être inférieure à la date de fin",MessageType.Error);
    }

  }
  closureDelete(annualClosure : AnnualClosure) {
    _.remove(this.annualClosures, annualClosure);
    this.frm.markAsDirty();
}

closuerToString(annualClosure: AnnualClosure){
  const monthStart = this.months.find((s) => s.id == +annualClosure.startMonth)?.value;
  const monthEnd = this.months.find((s) => s.id == +annualClosure.endMonth)?.value;

  let result = '';

   if(monthStart != null && monthEnd != null){
    result =  'Du: ' + this.padDay(+annualClosure.startDay) + ' ' + monthStart + ' Au: ' + this.padDay(+annualClosure.endDay) + ' ' + monthEnd;
   }

  return result;
}


onSearch(value: string) {
  this.filteredListOfPartners = this.search(value.toLowerCase());
}

search(value: string) {
  let filter = value.toLowerCase();
  return this.listOfPartners.filter(option =>
    option.name.toLowerCase().includes(value)
  );
}

validateNumberDigits(control: FormControl): { [key: string]: any } | null {
  const value = control.value;
  if (value && value.toString().length > 8) {
    return { 'tooManyDigits': true };
  }
  return null;
}
}
