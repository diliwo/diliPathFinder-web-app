import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SupportsService } from '@frontend/core-data';
import { BeneficiariesFacade, MyJobCoachSupportDataSource, SupportsFacadeService } from '@frontend/core-state';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'frontend-my-jobcoach-supports-list',
  templateUrl: './my-jobcoach-supports-list.html',
  styleUrls: ['./my-jobcoach-supports-list.scss']
})
export class MyJobCoachSupportsListComponent {
  @Output() public pushNissEvent: EventEmitter<string[]> = new EventEmitter<string[]>();
  onlyActivesSupports = true;
  toogleFilterControl = new FormControl(true);
  displayedColumns: string[] = [
    'beneficiaryLastName',
    'beneficiaryReferenceNumber',
    'beneficiaryContactLanguage',
    'hasChildren',
    'dateLastStartContract',
    'dateLastEndContract',
    'workplace',
    'dateLastQuartelyEvaluation',
    'comment'
  ];
  dataSource: MyJobCoachSupportDataSource;
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
    private beneficiariesFacadeService: BeneficiariesFacade,
    private supportsFacadeService: SupportsFacadeService,
    private supportsService: SupportsService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MyJobCoachSupportsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, iconItem: string }
  ) {
    this.title = data.title;
    this.iconItem = data.iconItem;
  }

  ngOnInit() {
    this.dataSource = new MyJobCoachSupportDataSource(this.supportsService);
    this.dataSource.load(1, 10,'',true,'beneficiaryLastName asc');
    this.getNumberOfMySupports();

    this.toogleFilterControl.valueChanges.subscribe((value) => {
      this.onlyActivesSupports = value;
      this.loadMySupportsPage();
    });
  }

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

  redirectToJob(niss: string){
    this.dialogRef.close();
    this.router.navigate(['/beneficiary',niss]);
  }

  refresh(){
    this.pushNissEvent.emit(this.listOfNiss);
  }
}
