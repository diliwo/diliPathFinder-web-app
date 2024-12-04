import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,ChangeDetectorRef, SimpleChanges, ElementRef } from '@angular/core';
import { TeamsDataSource, TeamsFacadeService } from '@frontend/core-state';
import { Team, Teams} from '@frontend/api-interface';
import { MatTableState } from '@frontend/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamDetailsComponent } from './team-details/team-details.component';
import * as _ from 'lodash-es';
import { TeamsService } from '@frontend/core-data';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { ConfirmationBoxComponent } from '@frontend/shared';

@Component({
  selector: 'frontend-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class TeamsComponent implements OnDestroy {
  displayedColumns: string[] = [
    'name',
    'acronym',
    'actions'
  ];
  dataSource: TeamsDataSource;
  nbOfItems: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef) {
    if (content) {
      this.paginatorContent = content;
    }
  }

  @ViewChild('input') input: ElementRef;

  @Input() teams :any[] = [];
  @Input() error : any;
  @Output() upsertEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private teamsFacadeService : TeamsFacadeService,
    private teamsService : TeamsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.dataSource = new TeamsDataSource(this.teamsService);
    this.dataSource.load(1, 10, '','name asc');
    this.getNumberOfTeams();
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
          this.loadTeams();
        })
      )
      .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadTeams())
      )
      .subscribe();

    // one create or update, load new page
    this.teamsFacadeService.mutations$.subscribe((_) => {
      this.loadTeams();
      this.getNumberOfTeams();
    });
  }

  loadTeams() {
    this.dataSource.load(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.sort.active+ " " + this.sort.direction
    );
  }

  getNumberOfTeams() {
    this.dataSource.nbrOfTeams$.subscribe((nb: number) => {
      console.log(nb);
      this.nbOfItems = nb;
    });
  }

  edit(serviceDetail: Team) {
    const dlg = this.dialog.open(TeamDetailsComponent, { data: { serviceDetail, isNew: false } });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
            _.assign(serviceDetail, res);
            this.upsertEvent.emit(res);
        }
    });
  }

  create(){
    const serviceDetail = new Team();
    const err = this.error;
    console.log(err);
    const dlg = this.dialog.open(TeamDetailsComponent, { data: { serviceDetail, err, isNew: true } });
    dlg.beforeClosed().subscribe(res => {
        if (res) {
            this.upsertEvent.emit(res);
        }
    });
  }

  delete(team: Team){
    const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
      data: {
        title: 'Confirm the suppression !',
        message: 'Are you sure about deleting this team'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if(result == true){
        console.log(result);
        this.deleteEvent.emit(team);
      }
    });
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }
}
