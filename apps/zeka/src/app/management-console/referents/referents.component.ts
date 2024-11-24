import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ReferentDataSource, ReferentFacadeService, ServicesIspFacadeService } from '@frontend/core-state';
import { Referent, ReferentListVm, UpsertReferenceCommand} from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReferentsDetailsComponent } from './referents-details/referents-details.component';
import * as _ from 'lodash-es';
import { Console } from 'console';
import { ReferentService } from '@frontend/core-data';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConfirmationBoxComponent } from '@frontend/shared';

@Component({
  selector: 'frontend-referents',
  templateUrl: './referents.component.html',
  styleUrls: ['./referents.component.scss']
})
export class ReferentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstname', 'lastname','servicename','actions'];
  dataSource : ReferentDataSource;
  nbOfReferents:number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef){
    if(content){
      this.paginatorContent = content;
    }
  }

  @ViewChild('input') input: ElementRef;
  @Input() services: any[] = [];
  @Output() upserReferentEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteReferentEvent: EventEmitter<any> = new EventEmitter();
  error: any;

  constructor(
    private referentsService : ReferentService,
    private referentFacadeService : ReferentFacadeService,
    private servicesIspFacadeService : ServicesIspFacadeService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.dataSource = new ReferentDataSource(this.referentsService);
    this.dataSource.loadReferents(1, 10, '','firstname asc');
    this.getNumberOfReferents();
  }

  ngAfterViewInit(): void {
            // server-side search
            fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadReferentsPage();
                })
            )
            .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadReferentsPage())
      )
      .subscribe();

        // one create or update, load new page
        this.referentFacadeService.mutations$.subscribe((_) => {
          this.loadReferentsPage();
          this.getNumberOfReferents();
        });

        this.servicesIspFacadeService.mutations$.subscribe((_) => {
          this.loadReferentsPage();
        });
    }

    loadReferentsPage() {
        this.dataSource.loadReferents(
          this.paginator.pageIndex+1,
          this.paginator.pageSize,
          this.input.nativeElement.value,
          this.sort.active+ " " + this.sort.direction
        );
    }

    edit(upsertReferenceCommand: UpsertReferenceCommand) {
      console.log(upsertReferenceCommand);
      const listReferents = this.services;
      const dlg = this.dialog.open(ReferentsDetailsComponent, { data: { upsertReferenceCommand, isNew: false,listReferents } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              _.assign(upsertReferenceCommand, res);
              console.log(res);
              this.upserReferentEvent.emit(res);
          }
      });
    }

    create(){
      const upsertReferenceCommand = new UpsertReferenceCommand();
      const listReferents = this.services;
      const dlg = this.dialog.open(ReferentsDetailsComponent, { data: { upsertReferenceCommand, isNew: true,listReferents } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              this.upserReferentEvent.emit(res);
          }
      });
    }

    delete(referent: Referent){
      const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
        data: {
          title: 'Confirmez la suppression !',
          message: 'Etes-vous certain de vouloir supprimer ce référent'
        }
      });

      confirmDialog.afterClosed().subscribe(result => {
        if(result == true){
          console.log(result);
          this.deleteReferentEvent.emit(referent);
        }
      });
    }

    getNumberOfReferents(){
      this.dataSource.nbrOfreferents$.subscribe((nb:number) => {
        console.log(nb);
        this.nbOfReferents = nb;
      })
    }
}
