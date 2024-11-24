import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  PartnerDataSource,
  PartnersFacadeService,
  ReferentFacadeService,
} from '@frontend/core-state';
import {
  DocumentDetail,
  PartnersListVm,
  Referent,
  ReferentListVm,
  Partner,
} from '@frontend/api-interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash-es';
import { PartnersService, ReferentService } from '@frontend/core-data';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { PartnerDetailsBoxComponent } from '@frontend/shared';
import { read } from 'fs';

@Component({
  selector: 'frontend-partners-list',
  templateUrl: './partners-list.component.html',
  styleUrls: ['./partners-list.component.scss']
})
export class PartnersListComponent implements OnInit {
  displayedColumns: string[] = [
    'partnerNumber',
    'name',
    'jobCoachName',
    'categoryOfPartner',
    'statusOfPartner'
  ];
  dataSource: PartnerDataSource;
  nbOfPartners: number;
  title: string;
  iconItem: string;
  referentList: Referent[] = [];
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
    private partnersFacadeService: PartnersFacadeService,
    private partnerService: PartnersService,
    private referentsFacadeService : ReferentFacadeService,
    private referentService : ReferentService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PartnersListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, iconItem: string }
  ) {
    this.title = data.title;
    this.iconItem = data.iconItem;
  }

  ngOnInit() {
    this.dataSource = new PartnerDataSource(this.partnerService);
    this.dataSource.loadPartners(1, 10, '');
    this.getNumberOfPartners();
    this.loadReferents();
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
          this.loadPartnersPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadPartnersPage())
    )
    .subscribe();

    // one create or update, load new page
    this.partnersFacadeService.mutations$.subscribe((_) => {
      this.loadPartnersPage();
      this.getNumberOfPartners();
    });

    this.referentsFacadeService.mutations$.subscribe((_) => {
      this.loadReferents();
    });
  }

  loadPartnersPage() {
    this.dataSource.loadPartners(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.sort.active+ " " + this.sort.direction
    );
  }
  getNumberOfPartners() {
    this.dataSource.nbrOfParters$.subscribe((nb: number) => {
      console.log(nb);
      this.nbOfPartners = nb;
    });
  }

  close() {
    this.dialogRef.close();
  }

  view(partner: Partner) {
    const dlg = this.dialog.open(PartnerDetailsBoxComponent,
      { data: { partner, isNew: false, listReferents : this.referentList, readonly: true}});
  }

  loadReferents(){
    this.referentService.getAll(1,1000,'','lastname asc').subscribe((referentsApi :ReferentListVm) => {
      this.referentList = referentsApi.referents;
      console.log(this.referentList);
    });
  }
}
