import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,ChangeDetectorRef, SimpleChanges, ElementRef } from '@angular/core';
import { ProfessionsDataSource, ProfessionsFacadeService } from '@frontend/core-state';
import { ProfessionMv } from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfessionsDetailsComponent } from './professions-details/professions-details.component';
import * as _ from 'lodash-es';
import { ProfessionsService } from '@frontend/core-data';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { ConfirmationBoxComponent } from '@frontend/shared';

@Component({
  selector: 'frontend-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.scss']
})
export class ProfessionsComponent implements OnDestroy {
  displayedColumns: string[] = [
    'name',
    'actions'
  ];
  dataSource: ProfessionsDataSource;
  nbOfProfessions: number;
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

  @Output() updateEvent: EventEmitter<any> = new EventEmitter();
  @Output() createEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private professionsFacadeService : ProfessionsFacadeService,
    private professionsService : ProfessionsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.dataSource = new ProfessionsDataSource(this.professionsService);
    this.dataSource.load(1, 10, '');
    this.getNumberOfProfessions();
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
          this.loadProfessionsIspPage();
        })
      )
      .subscribe();

          // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadProfessionsIspPage())
    )
    .subscribe();

    // one create or update, load new page
    this.professionsFacadeService.mutations$.subscribe((_) => {
      this.loadProfessionsIspPage();
      this.getNumberOfProfessions();
    });
  }

  loadProfessionsIspPage() {
    this.dataSource.load(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.sort.active+ " " + this.sort.direction
    );
  }

  getNumberOfProfessions() {
    this.dataSource.nbrOfProfessions$.subscribe((nb: number) => {
      console.log(nb);
      this.nbOfProfessions = nb;
    });
  }

  edit(profession: ProfessionMv.Profession) {
    const dlg = this.dialog.open(ProfessionsDetailsComponent, { data: { profession, isNew: false },
      width: '500px' });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
            _.assign(profession, res);
            this.updateEvent.emit(res);
        }
    });
  }

  create(){
    const profession = new ProfessionMv.Profession();
    const err = this.error;
    console.log(err);
    const dlg = this.dialog.open(ProfessionsDetailsComponent, { data: { profession, err, isNew: true },
      width: '500px' });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
            this.createEvent.emit(res);
        }
    });
  }

  delete(profession: ProfessionMv.Profession){
    const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
      data: {
        title: 'Confirmez la suppression !',
        message: 'Etes-vous certain de vouloir supprimer ce métier !'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if(result == true){
        console.log(result);
        this.deleteEvent.emit(profession);
      }
    });
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }
}
