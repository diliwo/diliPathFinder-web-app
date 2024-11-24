/* eslint-disable max-len */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { JobsFacadeService, JobsDataSource } from '@frontend/core-state';
import { JobDetail } from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash-es';
import { JobsService } from '@frontend/core-data';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'frontend-job-offer-list',
  templateUrl: './job-offer-list.component.html',
  styleUrls: ['./job-offer-list.component.scss'],
})
export class JobOfferListComponent {
  dataSource: JobsDataSource;
  nbOfJobs: number;
  title: string;
  iconItem: string;
  minimumDate: Date;
  currentStatus = 'active';
  statusesControl = new FormControl('active');
  statuses = [{name:'Offres ouvertes', value:'active'},{name:'Offres fermées', value:'inactive'},{name:'Tous', value:'all'}];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef) {
    if (content) {
      this.paginatorContent = content;
    }
  }

  @ViewChild('input') input: ElementRef;

  displayedColumns: string[] = [
    'jobNumber',
    'partnerName',
    'jobTitle',
    'reward',
    'typeOfJob',
    'statusOfJobOffer',
    'categoryOfJob',
    'lastJobOfferVacancyDateTime',
    'nameOfhired',
  ];

  constructor(
    private jobsService: JobsService,
    private jobsFacadeService: JobsFacadeService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<JobOfferListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, iconItem: string }
  ) {
    this.title = data.title;
    this.minimumDate = new Date('0001-01-01T00:00:00Z');
    this.iconItem = data.iconItem;
  }

  ngOnInit() {
    this.dataSource = new JobsDataSource(this.jobsService);
    this.dataSource.loadJobsFilteredByStatus('active',1, 10, '','jobNumber asc');
    this.getNumberOfJobs();

    this.statusesControl.valueChanges.subscribe((value) => {
      this.currentStatus = value;
      this.loadJobsPage();
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadJobsPage();
        })
      )
      .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadJobsPage())
      )
      .subscribe();

    // one create or update, load new page
    this.jobsFacadeService.mutations$.subscribe((_) => {
      this.loadJobsPage();
      this.getNumberOfJobs();
    });
  }

  loadJobsPage() {
    this.dataSource.loadJobsFilteredByStatus(
      this.currentStatus,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.sort.active+ " " + this.sort.direction
    );
  }

  getNumberOfJobs() {
    this.dataSource.nbrOfJobs$.subscribe((nb: number) => {
      console.log(nb);
      this.nbOfJobs = nb;
    });
  }

  close() {
    this.dialogRef.close();
  }

  dateIsNotSame(apiDateString : string) : boolean {
    const dateApi = new Date(apiDateString);

   return !(dateApi.getFullYear() === this.minimumDate.getFullYear() &&
          dateApi.getMonth() === this.minimumDate.getMonth() &&
          dateApi.getDate() === this.minimumDate.getDate());
  }
}
