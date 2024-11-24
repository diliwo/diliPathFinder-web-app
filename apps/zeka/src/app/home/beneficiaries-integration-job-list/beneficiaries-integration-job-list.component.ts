import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { BeneficiariesService, CandidaciesService } from '@frontend/core-data';
import { CandidaciesFacadeService, IntegrationWorkersDataSource } from '@frontend/core-state';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'frontend-beneficiaries-integration-job-list',
  templateUrl: './beneficiaries-integration-job-list.component.html',
  styleUrls: ['./beneficiaries-integration-job-list.component.scss']
})
export class BeneficiariesIntegrationJobListComponent implements OnInit {
  displayedColumns: string[] = [
    'beneficiaryName',
    'beneficiaryReferenceNumber',
    'partnerNumber',
    'partnerName',
    'partnerPostalCode',
    'referentLastName',
    'startContratDate',
    'endContratDate',
    'jobReward',
    'jobNumber',
    'jobProfile'
   ];
  dataSource: IntegrationWorkersDataSource;
  ngOfIntegrationWorkers: number;
  title: string;
  iconItem: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef) {
    if (content) {
      this.paginatorContent = content;
    }
  }

  @ViewChild('input') input: ElementRef;

  constructor(
    private candidaciesFacadeService: CandidaciesFacadeService,
    private candidaciesService: CandidaciesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BeneficiariesIntegrationJobListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, iconItem: string }
  ) {
    this.title = data.title;
    this.iconItem = data.iconItem;
  }

  ngOnInit() {
    this.dataSource = new IntegrationWorkersDataSource(this.candidaciesService);
    this.dataSource.load(1, 10,'',true,'beneficiaryName asc');
    this.getNumberOfIntegrationWorkers();
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.load();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.load())
    )
    .subscribe();

    // one create or update, load new page
    this.candidaciesFacadeService.mutations$.subscribe((_) => {
      this.load();
      this.getNumberOfIntegrationWorkers();
    });
  }

  load() {
    this.dataSource.load(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      true,
      this.sort.active+ " " + this.sort.direction
    );
  }
  getNumberOfIntegrationWorkers() {
    this.dataSource.numberOfIntegrationWorkers$.subscribe((nb: number) => {
      console.log(nb);
      this.ngOfIntegrationWorkers = nb;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
