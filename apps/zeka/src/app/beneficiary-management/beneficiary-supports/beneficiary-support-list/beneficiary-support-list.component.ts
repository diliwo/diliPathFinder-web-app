import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { SupportsFacadeService, ReferentFacadeService,SupportDataSource, NotificationService } from '@frontend/core-state';
import { SupportsService, ReferentService } from '@frontend/core-data';
import { BeneficiaryDetail,
  SupportDetail,
  ServiceListVm,
  Support,
  SupportListVm,
  Referent,
  ReferentListVm,
  MessageType,
  ReasonOfClosures,
  ReasonOfClosure
 } from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BeneficiarySupportDetailsComponent } from '../beneficiary-support-details/beneficiary-support-details.component';
import { BeneficiarySupportCloseBoxComponent } from '../beneficiary-support-close-box/beneficiary-support-close-box.component';
import * as _ from 'lodash-es';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ConfirmationBoxComponent,TextEllipsisComponent } from '@frontend/shared';

@Component({
  selector: 'frontend-support-list',
  templateUrl: './beneficiary-support-list.component.html',
  styleUrls: ['./beneficiary-support-list.component.scss']
})
export class BeneficiarySupportListComponent implements OnInit {
  @Input() beneficiarySupports : any[];
  @Input() maTableStateSupport : MatTableState;
  //@Input() referentList: any[];
  @Input() beneficiaryId: number;
  @Output() upsertSupportEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeSupportEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteSupportEvent: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['startdate', 'enddate','referent','note','reason','actions'];
  nbOfSupports:number;
  dataSource: SupportDataSource;
  filter: string;
  state: MatTableState;

  error: any;
  referentList: Referent[] = [];
  reasons: ReasonOfClosure[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef){
    if(content){
      this.paginatorContent = content;
    }
  }
  @ViewChild('input') input: ElementRef;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private supportsFacadeService: SupportsFacadeService,
    private supportsService : SupportsService,
    private referentsFacadeService : ReferentFacadeService,
    private referentService : ReferentService,
    private notificationService: NotificationService
  ) {
    this.state = supportsFacadeService.supportsState;
  }

  ngOnInit() {
    this.dataSource = new SupportDataSource(this.supportsService);
    this.dataSource.load(1, 25, this.beneficiaryId);
    this.getNumberOfSupprts();
    this.loadReferents();
    this.loadReasons();
  }

  ngAfterViewInit(): void {
    // on paginate events, load a new page
    this.paginator.page
    .pipe(
        tap(() => {
          console.log('paginated');
          this.loadSupports();
        })
    )
    .subscribe();

    // one create or update, load new page
    this.supportsFacadeService.mutations$.subscribe((_) => {
      console.log(_);
      this.getNumberOfSupprts();
      this.loadSupports();
    });

    this.referentsFacadeService.mutations$.subscribe((_) => {
      this.loadReferents();
    });
}

  loadSupports(){
    this.dataSource.load(
      this.paginator.pageIndex+1,
      this.paginator.pageSize,
      this.beneficiaryId);
  }

  loadReferents(){
    this.referentService.getAll(1,1000,'','lastname asc').subscribe((referentsApi :ReferentListVm) => {
      this.referentList = referentsApi.referents;
      console.log(this.referentList);
    });
  }

  loadReasons(){
    this.supportsService.getReasons().subscribe((reasons: ReasonOfClosures) => {
      this.reasons = reasons.items;
    });
  }

  edit(support: Support) {
    const referents = this.referentList;
    const idBenef = this.beneficiaryId;
    const dlg = this.dialog.open(BeneficiarySupportDetailsComponent, { data: {support, isNew: false, referents, idBenef}});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
            _.assign(support, res);
            this.supportsFacadeService.persist(res);
        }
    });
  }

  close(support: Support) {
    const reasons = this.reasons;
    const dlg = this.dialog.open(BeneficiarySupportCloseBoxComponent, { data: { support, reasons } });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
           _.assign(support, res);
            this.supportsFacadeService.close(res);
        }
    });
  }

  create(){
    const referents = this.referentList;
    console.log(referents);
    const idBenef = this.beneficiaryId;
    const support = new Support();
    const dlg = this.dialog.open(BeneficiarySupportDetailsComponent, { data: { support, isNew: true, referents, idBenef } });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
            this.supportsFacadeService.persist(res);
        }
    });
  }

  delete(support: Support){
    const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
      data: {
        title: 'Confirmez la suppression !',
        message: 'Êtes-vous certain de vouloir supprimer cet élément ?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if(result == true){
        if(support.isLastSupport){
          console.log(result);
          this.supportsFacadeService.delete(support.supportId);
        }else {
          this.notificationService.showMessage(
            'Seul le dernier accompagnement peut être supprimé !',
            MessageType.Information
          );
        }
      }
    });
  }


  getNumberOfSupprts(){
    this.dataSource.numberOfSupports$.subscribe((nb:number) => {
      console.log(nb);
      this.nbOfSupports = nb;
    })
  }
}
