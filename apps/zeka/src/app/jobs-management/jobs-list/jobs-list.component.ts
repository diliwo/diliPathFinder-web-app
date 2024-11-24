import { Component, Input, OnInit, AfterViewInit, EventEmitter, OnChanges, SimpleChanges, HostListener} from '@angular/core';
import { DocumentDetail, JobDetail, JobOfferDetail, SearchJobFilter } from '@frontend/api-interface';
import { JobOfferDetailComponent } from '../job-offer-detail/job-offer-detail.component';
import { DocumentsFacadeService, JobOffersFacadeService, JobsFacadeService } from '@frontend/core-state';
import { MatDialog } from '@angular/material/dialog';
import { Output } from '@angular/core';
import * as _ from 'lodash-es';
import { JobsDetailComponent } from '../jobs-detail/jobs-detail.component';
import { JobCandidaciesListComponent } from '../job-candidacies-list/job-candidacies-list.component';
import { JobFilesBoxComponent } from '../job-files-box/job-files-box.component';
import { ConfirmationBoxComponent, tools } from '@frontend/shared';
import { EmploymentDatesComponent } from '../employment-dates-box/employment-dates';
import { permissions } from '@frontend/shared';
import { JobOccupantsListComponent } from '../job-occupants-list/job-occupants-list.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'frontend-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})


export class JobsListComponent implements OnChanges {

  @Input() jobs :any[] = [];
  @Input() totalJobs: number;
  @Input() resetScrolling: boolean;
  @Input() currentFilter: SearchJobFilter;
  @Input() refreshFilter: boolean;
  @Input() pageSize: number;
  @Input() rewards : any[] = [];
  @Input() partnersList:any[] = [];
  @Input() documentsList:DocumentDetail[] = [];
  @Output() filterEvent: EventEmitter<any> = new EventEmitter();
  @Output() upsertJobtEvent: EventEmitter<any> = new EventEmitter();
  @Output() updateJobtDatesEvent: EventEmitter<any> = new EventEmitter();
  @Output() upsertJobOfferEvent: EventEmitter<any> = new EventEmitter();
  @Output() addDocumentEvent: EventEmitter<any> = new EventEmitter();
  @Output() loadDocumentEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteJobEvent : EventEmitter<any> = new EventEmitter();

  currentPage = 1;
  loadMoreVisible = true;
  loadingNewPage = false;
  itemToolTip : any;
  showsTooltip  = false;
  tooltipItem = null;
  topPosition: any;
  leftPosition: any;

  nbrOfJobsToLoad = 30;
  nbrOfJobsPerPage = 0;
  public localJobs: any[] = [];
  perm = permissions; // to be used in the template;
  isSmallScreen: boolean;

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) {
     this.checkScreenSize()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const test = window.innerWidth;
    this.isSmallScreen = window.innerWidth < 1540; // Set your desired breakpoint here
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes[propName].currentValue != changes[propName].previousValue)  {
        switch (propName) {
          case 'jobs': {
            this.loadingNewPage = false;
              if(this.refreshFilter){
                this.localJobs = [];
                this.currentPage = 1;
              }

              if(!_.isEqual(this.localJobs,this.jobs)){
                this.loadMoreVisible = false;
                this.localJobs.push(...this.jobs);
              }
          }
        }
      }
    }
  }


  isVacant(job : JobDetail) : string{
    const result = "noOffer";
    if(job.hasJobOffer){
      return String(job.isVacant);
    }
    return result;
  }

  create(JobDetail: JobDetail){
    console.log(JobDetail);
    const jobOfferDetail = new JobOfferDetail();
    const rewards = this.rewards;
    jobOfferDetail.jobId = JobDetail.jobId;
    const dlg = this.dialog.open(JobOfferDetailComponent, { data: { jobOfferDetail, isNew: true, rewards } });

    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
            this.upsertJobOfferEvent.emit(res);
        }
    });
  }

  edit(jobDetail: JobDetail) {
    const jobOfferDetail = jobDetail.jobOffers.filter(j => j.jobOfferId == jobDetail.lastJobOfferId)[0] as JobOfferDetail;
    console.log(jobOfferDetail);
    const dlg = this.dialog.open(JobOfferDetailComponent, { data: { jobOfferDetail, isNew: false } });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
           _.assign(jobOfferDetail, res);
            this.upsertJobOfferEvent.emit(res);
        }
    });
  }

  getJobOfferDate(jobDetail){
    const jobOfferDetail = jobDetail.jobOffers.filter(j => j.jobOfferId == jobDetail.lastJobOfferId)[0] as JobOfferDetail;
    return new Date(jobOfferDetail.vacancyDate);
  }

  editJob(jobDetail: JobDetail){
    const listPartners = this.partnersList;
    const rewards = this.rewards;
    const dlg = this.dialog.open(JobsDetailComponent, { data: { jobDetail, isNew: false, partners: listPartners, rewards } });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
            this.upsertJobtEvent.emit(res);
        }
    });
  }

  openFileBox(jobDetail: JobDetail){
    this.loadDocumentEvent.emit(jobDetail);
    const docsList = this.documentsList;
    console.log(docsList);
    const documentDetail = new DocumentDetail();
    documentDetail.jobId = jobDetail.jobId;
    documentDetail.partnerId = jobDetail.partnerId;
    const dlg = this.dialog.open(JobFilesBoxComponent, { data: { documentDetail, documents : docsList } });

    dlg.beforeClosed().subscribe(res => {
        if (res) {
          this.addDocumentEvent.emit(res);
        }
    });
  }

  openCandidaciesList(jobDetail: JobDetail) {
    const candidacies = jobDetail.candidacies;
    const dlg = this.dialog.open(JobCandidaciesListComponent, { data: { candidacies },maxHeight: '100%'});
  }

  openOccupantsList(jobDetail: JobDetail) {
    const dlg = this.dialog.open(JobOccupantsListComponent, { data: { jobId: jobDetail.jobId}});
  }

  lastDateReponse(startDate : Date, lastDate: Date) {
    const dateStart = new Date(startDate);
    const dateEnd = new Date(lastDate);

    if (new Date(startDate).getTime() < new Date(lastDate).getTime()){
      return tools.Europatools(dateEnd);
    }
    return 'Néant';
  }

  onScroll(): void {
    this.filterEvent.emit(++this.currentPage);
  }

  editDates(job: JobDetail) {
    const jobOffer = job.jobOffers.
    find(JobOfferDetail =>
      (new Date(JobOfferDetail.startOccupationDate).getTime()) === (new Date(job.occupiedFrom).getTime())
      &&
      (new Date(JobOfferDetail.endOccupationDate).getTime()) === (new Date(job.occupiedTo).getTime())
    );
    const dlg = this.dialog.open(EmploymentDatesComponent, { data: { job, jobOffer } ,
      maxWidth: '100%',
      width: '30%'});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
            this.updateJobtDatesEvent.emit(res);
        }
    });
  }

  delete(job: JobDetail){
    const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
      data: {
        title: 'Confirmez la suppression !',
        message: 'Etes-vous certain de vouloir supprimer ce poste'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if(result == true){
        console.log(result);
        this.deleteJobEvent.emit(job);
      }
    });
  }

  onHover(itemToolTip: any, e : MouseEvent) {
    this.showsTooltip = true;
    this.tooltipItem = itemToolTip;
    this.topPosition = e.pageY - 100;
    this.leftPosition = e.pageX - 70;
  }

  closePopUp() {
    this.showsTooltip = false;
    this.tooltipItem = null;
    this.topPosition = null;
    this.leftPosition = null;
  }

  redirectToBeneficiary(niss: string){
    this.router.navigate(['/beneficiary',niss]);
  }
}
