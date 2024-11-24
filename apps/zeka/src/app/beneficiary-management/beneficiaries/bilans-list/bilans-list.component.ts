import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BilanDataSource, BilansFacadeService, NotificationService, ReferentFacadeService } from '@frontend/core-state';
import { BilanMv, MessageType,DocumentDetail } from '@frontend/api-interface';
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
import { BilanDetailsComponent } from '../bilan-details/bilan-details.component';
import { ConfirmationBoxComponent } from '@frontend/shared';

@Component({
  selector: 'frontend-bilans-list',
  templateUrl: './bilans-list.component.html',
  styleUrls: ['./bilans-list.component.scss']
})
export class BilansListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'consultant','actions'];
  dataSource : BilanDataSource;
  nbrOfBilans:number;
  areAllBilansNotDone: boolean;

  @Input() beneficiaryId: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef){
    if(content){
      this.paginatorContent = content;
    }
  }

  @ViewChild('input') input: ElementRef;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Output() updateEvent: EventEmitter<any> = new EventEmitter();
  @Output() createEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() areAllBilansFinilizedEvent: EventEmitter<boolean> = new EventEmitter();
  error: any;

  constructor(
    private bilanService : BilanService,
    private bilansFacadeService : BilansFacadeService,
    public dialog: MatDialog,
    private notificationService: NotificationService
    ) {}

  ngOnInit() {
    this.dataSource = new BilanDataSource(this.bilanService);
    this.dataSource.loadBilans(1, 10, this.beneficiaryId,'');
    this.getNumberOfBilans();
    this.allBilansAreNotDone();
  }

  ngAfterViewInit(): void {
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
          this.beneficiaryId
        );
    }


    edit(bilan: BilanMv.Bilan) {
      const dlg = this.dialog.open(BilanDetailsComponent, { data: { bilan, isNew: false },
        height: '92%',
        width: '70%',
        disableClose: true,});
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              _.assign(bilan, res);
              console.log(res);
              this.bilansFacadeService.persist(res);
          }
      });
    }

    getNumberOfBilans(){
      this.dataSource.numberOfBilans$.subscribe((nb:number) => {
        console.log(nb);
        this.nbrOfBilans = nb;
      })
    }

    allBilansAreNotDone(){
      this.dataSource.allBilansAreNotDoneSubject$.subscribe((result:boolean) => {
        this.areAllBilansFinilizedEvent.emit(result);
      });
    }

    isFinalized(bilan :BilanMv.Bilan, type: string) : string{
      const result = 'false-'+type;
      if(bilan.isFinalized){
        return String(bilan.isFinalized)+'-'+type;
      }
      return result;
    }

    delete(bilan: BilanMv.Bilan){
      const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
        data: {
          title: 'Confirmez la suppression !',
          message: 'Êtes-vous certain de vouloir supprimer cet élément ?'
        }
      });

      confirmDialog.afterClosed().subscribe(result => {
        if(result == true){
          if(!bilan.isFinalized){
            this.bilansFacadeService.delete(bilan.bilanId);
          }else {
            this.notificationService.showMessage(
              'Seul le dernier accompagnement peut être supprimé !',
              MessageType.Information
            );
          }
        }
      });
    }

    showDocument(bilan: BilanMv.Bilan){
      const documentDetail = new DocumentDetail();
      documentDetail.bilanId = bilan.bilanId;
      documentDetail.description = 'Bilan_'+bilan.creationDate;
      documentDetail.contentType = 'pdf';
      this.bilansFacadeService.getDocument(documentDetail)
    }

    finalize(id: number) {
      const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
        data: {
          title: 'Confirmez la finalisation !',
          message: 'Êtes-vous certain de vouloir finaliser cette version ?',
        },
      });

      confirmDialog.afterClosed().subscribe((result) => {
        if (result == true) {
          this.bilansFacadeService.finalize(id);
        }
      });
    }
}
