import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { StaffMemberDataSource, StaffMembersFacadeService, TeamsFacadeService } from '@frontend/core-state';
import { StaffMembers, StaffMember} from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { StaffMemberDetailsComponent } from './StaffMembers-details/StaffMembers-details.component';
import * as _ from 'lodash-es';
import { Console } from 'console';
import { StaffMemberService } from '@frontend/core-data';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConfirmationBoxComponent } from '@frontend/shared';
import { StaffMemberDetailsComponent } from './staffmember-details/staffmember-details.component';

@Component({
  selector: 'frontend-StaffMembers',
  templateUrl: './StaffMembers.component.html',
  styleUrls: ['./StaffMembers.component.scss']
})
export class StaffMembersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstname', 'lastname','servicename','actions'];
  dataSource : StaffMemberDataSource;
  nbOfStaffMembers:number;

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
  @Output() upserStaffMemberEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteStaffMemberEvent: EventEmitter<any> = new EventEmitter();
  error: any;

  constructor(
    private StaffMembersService : StaffMemberService,
    private StaffMembersFacadeService : StaffMembersFacadeService,
    private teamsFacadeService : TeamsFacadeService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.dataSource = new StaffMemberDataSource(this.StaffMembersService);
    this.dataSource.load(1, 10, '','firstname asc');
    this.getNumberOfStaffMembers();
  }

  ngAfterViewInit(): void {
            // server-side search
            fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadPage();
                })
            )
            .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadPage())
      )
      .subscribe();

        // one create or update, load new page
        this.StaffMembersFacadeService.mutations$.subscribe((_) => {
          this.loadPage();
          this.getNumberOfStaffMembers();
        });

        this.teamsFacadeService.mutations$.subscribe((_) => {
          this.loadPage();
        });
    }

    loadPage() {
        this.dataSource.load(
          this.paginator.pageIndex+1,
          this.paginator.pageSize,
          this.input.nativeElement.value,
          this.sort.active+ " " + this.sort.direction
        );
    }

    edit(staffMember: StaffMember) {
      console.log(staffMember);
      const listStaffMembers = this.services;
      const dlg = this.dialog.open(StaffMemberDetailsComponent, { data: { staffMember, isNew: false,listStaffMembers } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              _.assign(staffMember, res);
              console.log(res);
              this.upserStaffMemberEvent.emit(res);
          }
      });
    }

    create(){
      const staffMember = new StaffMember();
      const listStaffMembers = this.services;
      const dlg = this.dialog.open(StaffMemberDetailsComponent, { data: { staffMember, isNew: true,listStaffMembers } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              this.upserStaffMemberEvent.emit(res);
          }
      });
    }

    delete(StaffMember: StaffMember){
      const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
        data: {
          title: 'Confirmez la suppression !',
          message: 'Etes-vous certain de vouloir supprimer ce référent'
        }
      });

      confirmDialog.afterClosed().subscribe(result => {
        if(result == true){
          console.log(result);
          this.deleteStaffMemberEvent.emit(StaffMember);
        }
      });
    }

    getNumberOfStaffMembers(){
      this.dataSource.nbrOfStaffMembers$.subscribe((nb:number) => {
        console.log(nb);
        this.nbOfStaffMembers = nb;
      })
    }
}
