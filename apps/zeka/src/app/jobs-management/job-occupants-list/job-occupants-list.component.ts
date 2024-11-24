import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { BeneficiariesFacade, JobOccupantsDataSource, JobsFacadeService } from '@frontend/core-state';
import { BeneficiaryLookUp, JobDetail, JobOccupant, JobOccupants } from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash-es';
import { Router } from '@angular/router';
import { JobsService } from '@frontend/core-data';

@Component({
  selector: 'frontend-job-occupants-list',
  templateUrl: './job-occupants-list.component.html',
  styleUrls: ['./job-occupants-list.component.scss']
})
export class JobOccupantsListComponent implements OnInit {
  displayedColumns: string[] = [
    'fullName',
    'referenceNumber',
    'startOccupationDate',
    'endOccupationDate'
  ];
  dataSource: JobOccupantsDataSource;
  nbOfOccupants: number;
  jobid: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef) {
    if (content) {
      this.paginatorContent = content;
    }
  }

  @ViewChild('input') input: ElementRef;
  @Input() error : any;

  constructor(
    private jobsFacadeService : JobsFacadeService,
    private jobsService : JobsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: number }
    ) {
      this.jobid = data.jobId;
    }

  ngOnInit() {
    this.dataSource = new JobOccupantsDataSource(this.jobsService);
    this.dataSource.loadOccupants(1, 10, this.jobid,'');
    this.getNumberOfOccupants();
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
          this.loadOccupants();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadOccupants())
    )
    .subscribe();

    // one create or update, load new page
    this.jobsFacadeService.mutations$.subscribe((_) => {
      this.loadOccupants();
      this.getNumberOfOccupants();
    });
  }

  loadOccupants() {
    this.dataSource.loadOccupants(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.jobid,
      this.input.nativeElement.value,
    );
  }

  getNumberOfOccupants() {
    this.dataSource.numberOfOccupants$.subscribe((nb: number) => {
      console.log(nb);
      this.nbOfOccupants = nb;
    });
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }
}
