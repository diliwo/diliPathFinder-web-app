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
  ViewChild,
} from '@angular/core';
import {
  PartnerDataSource,
  PartnersFacadeService,
  StaffMembersFacadeService,
} from '@frontend/core-state';
import {
  DocumentDetail,
  Partner,
  StaffMember,
} from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash-es';
import { PartnerDetailsBoxComponent } from '@frontend/shared';
import { PartnersService, StaffMemberService } from '@frontend/core-data';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { ConfirmationBoxComponent } from '@frontend/shared';

@Component({
  selector: 'frontend-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent {
  displayedColumns: string[] = [
    'partnerNumber',
    'name',
    'jobCoachName',
    'categoryOfPartner',
    'statusOfPartner',
    'actions',
  ];
  dataSource: PartnerDataSource;
  nbOfPartners: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef) {
    if (content) {
      this.paginatorContent = content;
    }
  }

  @ViewChild('input') input: ElementRef;

  staffMembers: StaffMember[] = [];
  @Input() documentsList: DocumentDetail[] = [];
  @Output() updatePartnerEvent: EventEmitter<any> = new EventEmitter();
  @Output() createPartnerEvent: EventEmitter<any> = new EventEmitter();
  @Output() deletePartnerEvent: EventEmitter<any> = new EventEmitter();
  @Output() addDocumentEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private partnersFacadeService: PartnersFacadeService,
    private staffMembersFacadeService: StaffMembersFacadeService,
    private partnerService: PartnersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.dataSource = new PartnerDataSource(this.partnerService);
    this.dataSource.load(1, 10, '','partnerNumber asc');
    this.getNumberOfPartners();
    this.loadStaffMembers();
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

    this.staffMembersFacadeService.mutations$.subscribe((_) => {
      this.loadStaffMembers();
    });
  }

  loadPartnersPage() {
    this.dataSource.load(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.sort.active+ " " + this.sort.direction
    );
  }

  loadStaffMembers() {
    this.staffMembers = null;
    this.staffMembersFacadeService.load(1,1000,'','lastname asc');
    this.staffMembersFacadeService.allStaffMembers$.subscribe((data) => {
      this.staffMembers = data.StaffMembers;
    });
  }


  delete(partner: Partner){
    const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
      data: {
        title: 'Confirmez la suppression !',
        message: 'Etes-vous certain de vouloir supprimer ce partenaire'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if(result == true){
        console.log(result);
        this.deletePartnerEvent.emit(partner);
      }
    });
  }

  create() {
      console.log(this.staffMembers);
      const partner = new Partner();
     const listStaffMembers = this.staffMembers;
      const dlg = this.dialog.open(PartnerDetailsBoxComponent, { data: { partner, isNew: true, listStaffMembers, readonly: false },disableClose: true});
      dlg.beforeClosed().subscribe(res => {
          if (res) {
            console.log(res);
              this.createPartnerEvent.emit(res);
          }
      });
  }

  edit(partner: Partner) {
    const listStaffMembers = this.staffMembers;
    const dlg = this.dialog.open(PartnerDetailsBoxComponent,
      { data: { partner, isNew: false, listStaffMembers,readonly: false },disableClose: true});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
           _.assign(partner, res);
            this.updatePartnerEvent.emit(res);
        }
    });
  }

  openFileBox(partner: Partner) {
    const docsList = this.documentsList;
    console.log(docsList);
    const documentDetail = new DocumentDetail();
    documentDetail.jobId = 0;
    documentDetail.partnerId = partner.partnerId;
  }

  getNumberOfPartners() {
    this.dataSource.nbrOfParters$.subscribe((nb: number) => {
      console.log(nb);
      this.nbOfPartners = nb;
    });
  }
}
