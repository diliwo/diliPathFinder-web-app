import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { School } from '@frontend/api-interface';
import { SchoolsService } from '@frontend/core-data';
import { SchoolDataSource, SchoolsFacadeService } from '@frontend/core-state';
import { Console } from 'console';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { ConfirmationBoxComponent } from '@frontend/shared';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit, AfterViewInit {

  dataSource : SchoolDataSource;
  displayedColumns = ["name", "locality", "actions"];
  nbOfSchools:number;

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
    private schoolService : SchoolsService,
    private schooServiceFace : SchoolsFacadeService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.dataSource = new SchoolDataSource(this.schoolService);
    this.dataSource.loadSchools(1, 10, '','name asc');
    this.getNumberOfSchools();
  }

  ngAfterViewInit(): void {
            // server-side search
            fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadSchoolsPage();
                })
            )
            .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadSchoolsPage())
      )
      .subscribe();

        // one create or update, load new page
        this.schooServiceFace.mutations$.subscribe((_) => {
          this.loadSchoolsPage();
          this.getNumberOfSchools();
        });
    }

    loadSchoolsPage() {
        this.dataSource.loadSchools(
          this.paginator.pageIndex+1,
          this.paginator.pageSize,
          this.input.nativeElement.value,
          this.sort.active+ " " + this.sort.direction
        );
    }

    edit(school: School) {
      const dlg = this.dialog.open(SchoolDetailsComponent, { data: { school, isNew: false } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              _.assign(school, res);
              this.updateEvent.emit(res);
          }
      });
    }

    create(){
      const school = new School();
      const err = this.error;
      console.log(err);
      const dlg = this.dialog.open(SchoolDetailsComponent, { data: { school, isNew: true } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              this.createEvent.emit(res);
          }
      });
    }

    delete(school: School){
      const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
        data: {
          title: 'Confirmez la suppression !',
          message: 'Etes-vous certain de vouloir supprimer l\'école: \n' + school.name
        }
      });

      confirmDialog.afterClosed().subscribe(result => {
        if(result == true){
          console.log(result);
          this.deleteEvent.emit(school);
        }
      });
    }

    getNumberOfSchools(){
      this.dataSource.nbrOfSchools$.subscribe((nb:number) => {
        console.log(nb);
        this.nbOfSchools = nb;
      })
    }
}
