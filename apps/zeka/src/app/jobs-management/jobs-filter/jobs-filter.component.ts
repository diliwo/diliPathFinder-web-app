import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobsFacadeService } from '@frontend/core-state';
import { JobDetail, JobsListVm, SearchJobFilter } from '@frontend/api-interface';
import { JobsDetailComponent } from '../jobs-detail/jobs-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobOfferListComponent } from '../../home/job-offer-list/job-offer-list.component';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'frontend-jobs-filter',
  templateUrl: './jobs-filter.component.html',
  styleUrls: ['./jobs-filter.component.scss']
})
export class JobsFilterComponent implements OnInit {
  myControl = new FormControl();
  toogleFilterControl = new FormControl();

  @Input() jobs :any[] = [];
  @Input() rewards : any[] = [];
  @Input() partnersList:any[] = [];
  @Output() upsertJobtEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() filterChanged = new EventEmitter();
  @Input() noQueryParameters = false;

  selectedPartnerId: number;
  selectedVacant: boolean;
  onlyOpenjobs = false;
  // selectedStatusJobId: boolean;

  lastFilter: SearchJobFilter;

  constructor(
    private jobsFacadeService : JobsFacadeService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.lastFilter = {} as SearchJobFilter;

    this.myControl.valueChanges
    .pipe (
       startWith(''),
       debounceTime(300),
       distinctUntilChanged()
    ).subscribe((value) => {
      this.lastFilter.filterText = value;
      this.lastFilter.isOpen = this.onlyOpenjobs;
     this.filterChanged.emit(this.lastFilter);
    });

    this.toogleFilterControl.valueChanges.subscribe((value) => {
      this.onlyOpenjobs = value;
      this.lastFilter.isOpen = this.onlyOpenjobs;
      this.filterChanged.emit(this.lastFilter);
    });
  }

  createPartner(){
    const jobDetail = new JobDetail();
    const listPartners = this.partnersList;
    const listOfRewards = this.rewards;
    const dlg = this.dialog.open(JobsDetailComponent, { data: { jobDetail, isNew: true, partners: listPartners, rewards: listOfRewards } });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
            this.upsertJobtEvent.emit(res);
        }
    });
  }

  onPartnerChanged($event: MatSelectChange) {
    this.selectedPartnerId = $event.value;
    this.selectedVacant = undefined;
    this.redirectAccordingToFilters();
  }

  openJobOffersHistory() {
    const jobs = this.jobs;
    const dlg = this.dialog.open(JobOfferListComponent, { data: { jobs },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'});
  }

  redirectAccordingToFilters(){
    const filter = {} as SearchJobFilter;

    filter.partnerId = this.selectedPartnerId;
    filter.isVacant = this.selectedVacant;

    if(filter.partnerId == this.lastFilter.partnerId &&
      filter.isVacant == this.lastFilter.isVacant ){
        return;
    }

    this.lastFilter = filter;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { partnerId:filter.partnerId,isVacant:filter.isVacant }
    });
  }

  readQueryParameters() {
    this.route.queryParams.subscribe((params) => {
      if(params.isVacant){
          var isVacant = Boolean(params.isVacant);
          this.selectedVacant = isVacant;
          var partnerId = Number(params.partnerId);
          this.selectedPartnerId = partnerId;
      } else if(params.partnerId){
          console.log(params.partnerId);
          var partnerId = Number(params.partnerId);
          this.selectedPartnerId = partnerId;
      }

      let filter = {
        partnerId: this.selectedPartnerId,
        isVacant: this.selectedVacant,
      } as SearchJobFilter;

      this.lastFilter = filter;
      console.log(filter);
      this.filterChanged.emit(filter);
    });
  }

  areFilterEqual(a: SearchJobFilter, b: SearchJobFilter) {
    if (a === undefined && b === undefined) {
      return true;
    }
    if (
      (a === undefined && b !== undefined) ||
      (a !== undefined && b === undefined)
    ) {
      return false;
    }

    return (
      a.partnerId === b.partnerId &&
      a.isVacant === b.isVacant
    );
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }
}
