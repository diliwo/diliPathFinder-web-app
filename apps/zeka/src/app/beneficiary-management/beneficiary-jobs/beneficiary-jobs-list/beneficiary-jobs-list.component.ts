import { AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CandidaciesFacadeService,
  CandidacyDataSource,
  EmploymentTerminationReasonFacadeService,
  EmploymentTerminationTypeFacadeService,
JobOffersFacadeService } from '@frontend/core-state';
import { Candidacy, EmploymentTerminationReason, EmploymentTerminationType, JobOfferDetail } from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BeneficiaryJobDetailComponent } from '../beneficiary-job-detail/beneficiary-job-detail.component';
import * as _ from 'lodash-es';
import { ActivatedRoute } from '@angular/router';
import { JobHireBoxComponent } from '../job-hire-box/job-hire-box.component';
import { CandidaciesService } from '@frontend/core-data';
import { tap } from 'rxjs/operators';
import { ConfirmationBoxComponent } from '@frontend/shared';
import { BeneficiaryEmploymentStatusBoxComponent } from '../beneficiary-employment-status-box/beneficiary-employment-status-box.component';
import { EmploymentTerminationComponent } from '../employment-termination-box/employment-termination-box.component';

@Component({
  selector: 'frontend-beneficiary-jobs-list',
  templateUrl: './beneficiary-jobs-list.component.html',
  styleUrls: ['./beneficiary-jobs-list.component.scss']
})
export class BeneficiaryJobsListComponent {
  @Input() beneficiaryCandidacies : any[];
  @Input() maTableStateSupport : MatTableState;
  @Input() jobOffersList: any[];
  @Input() beneficiaryId: number;
  @Output() upsertCandidacyEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteCandidacyEvent: EventEmitter<any> = new EventEmitter();
  @Output() terminateEmploymentEvent: EventEmitter<any> = new EventEmitter();
  @Output() upsertJobOfferEvent: EventEmitter<any> = new EventEmitter();
  @Output() addToHistoryEvent: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['joboffer','applicationDate', 'jobOfferStartDate','jobOfferEndDate','jobRward','ishired','actions'];
  nbOfCandidacies:number;
  dataSource: CandidacyDataSource;
  filter: string;
  state: MatTableState;
  error: any;

  employmentTerminationTypes: EmploymentTerminationType[] = [];
  employmentTerminationReasons: EmploymentTerminationReason[] = [];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef){
    if(content){
      this.paginatorContent = content;
    }
  }
  @ViewChild('input') input: ElementRef;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public CandidaciesFacadeService: CandidaciesFacadeService,
    public jobOffersFacadeService : JobOffersFacadeService,
    private empTerminationReasonFacadeService: EmploymentTerminationReasonFacadeService,
    private empTerminationTypeFacadeService: EmploymentTerminationTypeFacadeService,
    private candidaciesService: CandidaciesService
  ) {}

  ngOnInit() {
    this.dataSource = new CandidacyDataSource(this.candidaciesService);
    this.dataSource.load(1, 25, this.beneficiaryId);
    this.getNumberOfCandidacies();
    this.getEmploymentTerminationTypes();
    this.getEmploymentTerminationReasons();
    //this.loadJobOffers();
  }

  ngAfterViewInit(): void {
    // on paginate events, load a new page
    this.paginator.page
    .pipe(
        tap(() => {
          console.log('paginated');
          this.loadCandidacies();
        })
    )
    .subscribe();

    // one create or update, load new page
    this.CandidaciesFacadeService.mutations$.subscribe((_) => {
      this.loadCandidacies();
    });

    this.jobOffersFacadeService.mutations$.subscribe((_) => {
      this.loadCandidacies();
    });
}

isJobOfferClosed(candidacy :Candidacy, type:string) : string{
  return String(candidacy.isJobOfferClosed)+'-'+type;
}

isHired(isNotHired:boolean) : string{
  return String(isNotHired)+'-history';
}

loadCandidacies(){
  this.dataSource.load(
    this.paginator.pageIndex+1,
    this.paginator.pageSize,
    this.beneficiaryId);
}

  create(){
    const joboffers = this.jobOffersList;
    console.log(this.jobOffersList);
    const idBenef = this.beneficiaryId;
    const candidacyDetail = new Candidacy();
    const dlg = this.dialog.open(BeneficiaryJobDetailComponent, { data: { candidacyDetail, isNew: true, joboffers, idBenef } ,
      maxWidth: '100%',
      width: '30%'});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
            this.upsertCandidacyEvent.emit(res);
        }
    });
  }

  edit(candidacyDetail: Candidacy) {
    const joboffers = this.jobOffersList;
    const idBenef = this.beneficiaryId;
    const dlg = this.dialog.open(BeneficiaryJobDetailComponent, { data: { candidacyDetail, isNew: false, joboffers, idBenef } ,
      maxWidth: '100%',
      width: '30%'});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
           _.assign(candidacyDetail, res);
            this.upsertCandidacyEvent.emit(res);
        }
    });
  }

  hire(candidacyDetail: Candidacy) {
    const joboffer = this.jobOffersList.filter(JobOfferDetail => JobOfferDetail.jobOfferId == candidacyDetail.jobOfferId)[0] as JobOfferDetail;
    const dlg = this.dialog.open(JobHireBoxComponent, { data: { candicyId:candidacyDetail.candidacyId ,joboffer,isNew: true } ,
      maxWidth: '100%',
      width: '30%'});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
           _.assign(joboffer, res);
            this.upsertJobOfferEvent.emit(res);
        }
    });
  }

  terminate(candidacyDetail: Candidacy){
    const dlg = this.dialog.open(EmploymentTerminationComponent, { data: { candidacy: candidacyDetail , employmentTerminationTypes: this.employmentTerminationTypes, employmentTerminationReasons: this.employmentTerminationReasons} ,
      maxWidth: '100%',
      width: '30%'});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
            this.terminateEmploymentEvent.emit(res);
        }
    });
  }
  editWorkScheduleType(candidacy: Candidacy){

    const dlg = this.dialog.open(BeneficiaryEmploymentStatusBoxComponent, { data: { candidacy} ,
      maxWidth: '100%',
      width: '30%'});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          this.addToHistoryEvent.emit(res);
        }
    });
  }

  delete(candidacy: Candidacy){
    const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
      data: {
        title: 'Confirmez la suppression !',
        message: 'Êtes-vous certain de vouloir supprimer cet élément ?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if(result == true){
          this.CandidaciesFacadeService.delete(candidacy.candidacyId);
      }
    });
  }

  getNumberOfCandidacies(){
    this.dataSource.numberOfCandidacies$.subscribe((nb:number) => {
      console.log(nb);
      this.nbOfCandidacies = nb;
    })
  }

  getEmploymentTerminationTypes(){
    this.empTerminationTypeFacadeService.load(1,1000,'', 'name asc');
    this.empTerminationTypeFacadeService.data$.subscribe((data) => {
      this.employmentTerminationTypes = data.items;
    });
  }

  getEmploymentTerminationReasons(){
    this.empTerminationReasonFacadeService.load(1,1000,'', 'name asc');
    this.empTerminationReasonFacadeService.data$.subscribe((data) => {
      this.employmentTerminationReasons = data.items;
    });
  }

  getSelectedReasonNames(candidacy: Candidacy): string {
    const selectedValues = candidacy.terminationReasonsForEmployment.items || [];
    return selectedValues.map(reason => reason.name).join(', ');
  }
}
