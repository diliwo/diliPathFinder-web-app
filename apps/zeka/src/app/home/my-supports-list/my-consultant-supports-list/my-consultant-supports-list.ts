import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MySupport, Support } from '@frontend/api-interface';
import { SupportsService } from '@frontend/core-data';
import { BeneficiariesFacade, MySupportDataSource, SupportsFacadeService } from '@frontend/core-state';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'frontend-my-consultant-supports-list',
  templateUrl: './my-consultant-supports-list.html',
  styleUrls: ['./my-consultant-supports-list.scss']
})
export class MyConsultantSupportsListComponent {
  @Output() public pushNissEvent: EventEmitter<string[]> = new EventEmitter<string[]>();
  onlyActivesSupports = true;
  toogleFilterControl = new FormControl(true);
  displayedColumns: string[] = [
    'beneficiaryLastName',
    'beneficiaryReferenceNumber',
    'beneficiaryContactLanguage',
    'hasChildren',
    'lastAction',
    'projects',
    'lastApppointmentDate',
    'lastEvaluationDate',
    'comment'
  ];
  dataSource: MySupportDataSource;
  nbOfMySupports: number;
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
  listOfNiss: string[] = [];

  constructor(
    private supportsFacadeService: SupportsFacadeService,
    private supportsService: SupportsService,
    private router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MyConsultantSupportsListComponent>,
    private beneficiariesFacadeService: BeneficiariesFacade,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, iconItem: string }
  ) {
    this.title = data.title;
    this.iconItem = data.iconItem;
  }

  ngOnInit() {
    this.dataSource = new MySupportDataSource(this.supportsService);
    this.dataSource.load(1, 25, '', true,'beneficiaryLastName asc');
    this.getNumberOfMySupports();

    this.toogleFilterControl.valueChanges.subscribe((value) => {
      this.onlyActivesSupports = value;
      this.loadMySupportsPage();
    });

    this.dataSource.supportsSubject$.subscribe((value: MySupport[]) => {
        this.fetchBeneficiariesNiss(value);
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
          this.loadMySupportsPage();
        })
      )
      .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadMySupportsPage())
      )
      .subscribe();

    // on paginate events, load a new page
    // this.paginator.page
    //   .pipe(
    //     tap(() => {
    //       console.log('paginated');
    //       this.loadMySupportsPage();
    //     })
    //   )
    //   .subscribe();

    // one create or update, load new page
    this.supportsFacadeService.mutations$.subscribe((_) => {
      this.loadMySupportsPage();
      this.getNumberOfMySupports();
    });

    this.beneficiariesFacadeService.mutations$.subscribe((_) => {
      this.loadMySupportsPage();
      this.getNumberOfMySupports();
    });
  }

  loadMySupportsPage() {
    this.dataSource.load(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.onlyActivesSupports,
      this.sort.active+ " " + this.sort.direction
    );
  }
  getNumberOfMySupports() {
    this.dataSource.numberOfSupports$.subscribe((nb: number) => {
      console.log(nb);
      this.nbOfMySupports = nb;
    });
  }

  close() {
    this.dialogRef.close();
  }

  redirectToBeneficiary(niss: string){
    this.dialogRef.close();
    this.router.navigate(['/beneficiary',niss]);
  }

  fetchBeneficiariesNiss(data: MySupport[]){
    if (Array.isArray(data)) {
      this.listOfNiss = [];
      for (let item of data)
        this.listOfNiss.push(item.beneficiaryNiss);
    }
  }
  refresh(){
    this.pushNissEvent.emit(this.listOfNiss);
  }
}
