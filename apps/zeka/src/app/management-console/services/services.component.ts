import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,ChangeDetectorRef, SimpleChanges, ElementRef } from '@angular/core';
import { ServicesDataSource, ServicesIspFacadeService } from '@frontend/core-state';
import { ServiceDetail, ServiceListVm, UpsertServiceDetailCommand } from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicesDetailsComponent } from './services-details/services-details.component';
import * as _ from 'lodash-es';
import { ServicesIspService } from '@frontend/core-data';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { ConfirmationBoxComponent } from '@frontend/shared';

@Component({
  selector: 'frontend-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnDestroy {
  displayedColumns: string[] = [
    'name',
    'acronym',
    'actions'
  ];
  dataSource: ServicesDataSource;
  nbOfServices: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef) {
    if (content) {
      this.paginatorContent = content;
    }
  }

  @ViewChild('input') input: ElementRef;

  @Input() servicesIsp :any[] = [];
  @Input() error : any;
  @Output() upsertEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private servicesIspFacadeService : ServicesIspFacadeService,
    private servicesIspService : ServicesIspService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.dataSource = new ServicesDataSource(this.servicesIspService);
    this.dataSource.loadServices(1, 10, '','name asc');
    this.getNumberOfServices();
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
          this.loadServicesIspPage();
        })
      )
      .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadServicesIspPage())
      )
      .subscribe();

    // one create or update, load new page
    this.servicesIspFacadeService.mutations$.subscribe((_) => {
      this.loadServicesIspPage();
      this.getNumberOfServices();
    });
  }

  loadServicesIspPage() {
    this.dataSource.loadServices(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.sort.active+ " " + this.sort.direction
    );
  }

  getNumberOfServices() {
    this.dataSource.nbrOfServices$.subscribe((nb: number) => {
      console.log(nb);
      this.nbOfServices = nb;
    });
  }

  edit(serviceDetail: UpsertServiceDetailCommand) {
    const dlg = this.dialog.open(ServicesDetailsComponent, { data: { serviceDetail, isNew: false } });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
            _.assign(serviceDetail, res);
            this.upsertEvent.emit(res);
        }
    });
  }

  create(){
    const serviceDetail = new UpsertServiceDetailCommand();
    const err = this.error;
    console.log(err);
    const dlg = this.dialog.open(ServicesDetailsComponent, { data: { serviceDetail, err, isNew: true } });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
            this.upsertEvent.emit(res);
        }
    });
  }

  delete(upsertServiceDetailCommand: UpsertServiceDetailCommand){
    const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
      data: {
        title: 'Confirmez la suppression !',
        message: 'Etes-vous certain de vouloir supprimer ce service'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if(result == true){
        console.log(result);
        this.deleteEvent.emit(upsertServiceDetailCommand);
      }
    });
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }
}
