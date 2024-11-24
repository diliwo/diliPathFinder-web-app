import { Component, OnInit } from '@angular/core';
import { JobsFacadeService, PartnersFacadeService, JobOffersFacadeService, DocumentsFacadeService } from '@frontend/core-state';
import { JobsListVm, JobDetail, PartnersListVm, JobOfferDetail, DocumentDetail, SearchJobFilter, Rewards, PartnerSelections } from '@frontend/api-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'frontend-jobs-management',
  templateUrl: './jobs-management.component.html',
  styleUrls: ['./jobs-management.component.scss']
})
export class JobsManagementComponent implements OnInit {

  allJobs$: Observable<JobsListVm> = this.jobsFacadeService.allJobsListVm$
  allPartners$: Observable<PartnerSelections> = this.partnersFacadeService.partnersSelection$
  rewards$: Observable<Rewards> = this.jobsFacadeService.rewards$

  // allDocumentsJob$: Observable<DocumentListVm> = this.documentsFacadeService.allDocumentsByPartnerIdAndJobId$
  public selectedFilter: SearchJobFilter;
  public jobsDataLoading = true;
  public filterRefresh = false;
  pageSize = 30;
  currentPage = 1;
  constructor(
    private jobsFacadeService:JobsFacadeService,
    private partnersFacadeService:PartnersFacadeService,
    private jobOffersFacadeService:JobOffersFacadeService,
    private documentsFacadeService : DocumentsFacadeService
    ) {}

  ngOnInit(): void {
    this.selectedFilter = {
      partnerId: null,
      filterText: null,
      isVacant: null,
      isOpen: null
    };

    this.reset();
    this.jobsFacadeService.mutations$.subscribe((_) => this.reset());
    this.jobOffersFacadeService.mutations$.subscribe((_) => this.reset());
    this.documentsFacadeService.mutations$.subscribe((_) => this.reset());

    this.jobsFacadeService.spinner$.subscribe((_) => {
      this.stopSpinner();
    });
  }

  reset(){
    this.loadJobs();
    this.loadPartners();
    this.loadJobOffers();
    this.loadRewards();
  }

  loadJobs(){
    this.jobsFacadeService.loadJobs(this.currentPage,this.pageSize,this.selectedFilter.filterText,this.selectedFilter.isOpen);
  }

  loadRewards(){
    this.jobsFacadeService.loadRewards();
  }
  loadJobOffers(){
    this.jobOffersFacadeService.loadJobOffers();
  }
  loadPartners(){
    this.partnersFacadeService.loadSelectionList(1,1000,'','name asc');
  }

  persistJob(jobDetail: JobDetail){
    this.jobsFacadeService.persist(jobDetail);
  }

  jobsRefresh(currentPage: number){
    this.currentPage = currentPage;

    if(this.currentPage == 2){
      this.filterRefresh = false;
    }
    this.jobsFacadeService.loadJobs(currentPage,this.pageSize,this.selectedFilter.filterText,this.selectedFilter.isOpen);
  }

  updateJobDates(jobDetail: JobDetail){
    this.jobsFacadeService.updateDate(jobDetail);
  }
  persistJobOffer(jobOfferDetail: JobOfferDetail){
    this.jobOffersFacadeService.persist(jobOfferDetail);
  }

  saveDocument(documentDetail: DocumentDetail){
    this.documentsFacadeService.save(documentDetail);
  }


  deleteJob(job: JobDetail) {
    this.jobsFacadeService.delete(job.jobId);
  }

  onFilterChanged(filter : SearchJobFilter) {
    this.selectedFilter.filterText = filter.filterText;
    this.selectedFilter.isOpen = filter.isOpen;
    this.currentPage = 1;

    this.filterRefresh = true;
    this.loadJobs();
  }


  stopSpinner() {
    this.jobsDataLoading = false;
  }
}
