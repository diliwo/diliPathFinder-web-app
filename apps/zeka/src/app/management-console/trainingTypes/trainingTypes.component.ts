import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,ChangeDetectorRef, SimpleChanges, ElementRef } from '@angular/core';
import { ProfessionsDataSource, ProfessionsFacadeService, TrainingFieldsFacadeService, TrainingTypeDataSource, TrainingTypesFacadeService } from '@frontend/core-state';
import { ProfessionMv, TrainingType } from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash-es';
import { ProfessionsService, TrainingTypeService } from '@frontend/core-data';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { ConfirmationBoxComponent } from '@frontend/shared';
import { TrainingTypesDetailsComponent } from './trainingType-details/trainingType-details.component';

@Component({
  selector: 'frontend-trainingtypes',
  templateUrl: './trainingTypes.component.html',
  styleUrls: ['./trainingTypes.component.scss']
})
export class TrainingTypesComponent implements OnDestroy {
  displayedColumns: string[] = [
    'name',
    'actions'
  ];
  dataSource: TrainingTypeDataSource;
  nbOfTypes: number;
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
    private trainingTypesFacadeService : TrainingTypesFacadeService,
    private trainingTypeService : TrainingTypeService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.dataSource = new TrainingTypeDataSource(this.trainingTypeService);
    this.dataSource.load(1, 10, '','name asc');
    this.getNumberOfTypes();
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
          this.loadTypesPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadTypesPage())
    )
    .subscribe();

    // one create or update, load new page
    this.trainingTypesFacadeService.mutations$.subscribe((_) => {
      this.loadTypesPage();
      this.getNumberOfTypes();
    });
  }

  loadTypesPage() {
    this.dataSource.load(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.sort.active+ " " + this.sort.direction
    );
  }

  getNumberOfTypes() {
    this.dataSource.numberOfTrainingTypes$.subscribe((nb: number) => {
      console.log(nb);
      this.nbOfTypes = nb;
    });
  }

  edit(type: TrainingType) {
    const dlg = this.dialog.open(TrainingTypesDetailsComponent, { data: { type, isNew: false },
      width: '500px' });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
            _.assign(type, res);
            this.trainingTypesFacadeService.persist(res);
        }
    });
  }

  create(){
    const type = new TrainingType();
    const err = this.error;
    console.log(err);
    const dlg = this.dialog.open(TrainingTypesDetailsComponent, { data: { type, err, isNew: true },
      width: '500px' });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          this.trainingTypesFacadeService.persist(res);
        }
    });
  }

  delete(type: TrainingType){
    const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
      data: {
        title: 'Confirmez la suppression !',
        message: 'Etes-vous certain de vouloir supprimer ce métier !'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if(result == true){
        this.trainingTypesFacadeService.delete(type.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }
}
