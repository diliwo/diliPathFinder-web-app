import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BilanDataSource, BilansFacadeService, ReferentFacadeService } from '@frontend/core-state';
import { BilanMv } from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import * as _ from 'lodash-es';
import { Console } from 'console';
import { BilanService } from '@frontend/core-data';

@Component({
  selector: 'frontend-personal-situation-list',
  templateUrl: './personal-situation-list.component.html',
  styleUrls: ['./personal-situation-list.component.scss']
})
export class PersonalSituationListComponent {
  displayedColumns: string[] = ['note', 'consultant','actions'];
  dataSource : BilanDataSource;
  nbrOfBilans:number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef){
    if(content){
      this.paginatorContent = content;
    }
  }

  @ViewChild('input') input: ElementRef;
  @Output() updateEvent: EventEmitter<any> = new EventEmitter();
  @Output() createEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  error: any;

  constructor(
    private bilanService : BilanService,
    private bilansFacadeService : BilansFacadeService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.dataSource = new BilanDataSource(this.bilanService);
    this.dataSource.loadBilans(1, 3, 2,'');
    this.getNumberOfBilans();
  }

  ngAfterViewInit(): void {
            // server-side search
            fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadBilansPage();
                })
            )
            .subscribe();

        // on paginate events, load a new page
        this.paginator.page
        .pipe(
            tap(() => {
              console.log('paginated');
              this.loadBilansPage()
            })
        )
        .subscribe();

        // one create or update, load new page
        this.bilansFacadeService.mutations$.subscribe((_) => {
          this.loadBilansPage();
          this.getNumberOfBilans();
        });
    }

    loadBilansPage() {
        this.dataSource.loadBilans(
          this.paginator.pageIndex+1,
          this.paginator.pageSize,
          this.input.nativeElement.value,
        );
    }


    edit(bilan: BilanMv.Bilan) {
      // console.log(formation);
      // const dlg = this.dialog.open(FormationDetailsComponent, { data: { formation, schools:this.schools, isNew: false } });
      // dlg.beforeClosed().subscribe(res => {
      //     if (res) {
      //         _.assign(formation, res);
      //         console.log(res);
      //         this.formationsFacadeService.persist(res);
      //     }
      // });
    }

    create(){
      // const formation = new Formation();
      // const err = this.error;
      // console.log(err);
      // const dlg = this.dialog.open(FormationDetailsComponent, { data: { formation, schools:this.schools, isNew : true } });
      // dlg.beforeClosed().subscribe(res => {
      //     if (res) {
      //       this.formationsFacadeService.persist(res);
      //     }
      // });
    }

    delete(bilan: BilanMv.Bilan){
      // const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
      //   data: {
      //     title: 'Confirmez la suppression !',
      //     message: 'Etes-vous certain de vouloir supprimer l\'école: \n' + formation.name
      //   }
      // });

      // confirmDialog.afterClosed().subscribe(result => {
      //   if(result == true){
      //     console.log(result);
      //     this.formationsFacadeService.delete(formation.formationId);
      //   }
      // });
    }

    getNumberOfBilans(){
      this.dataSource.numberOfBilans$.subscribe((nb:number) => {
        console.log(nb);
        this.nbrOfBilans = nb;
      })
    }
}

