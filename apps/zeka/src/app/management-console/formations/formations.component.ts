import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Formation, School, SchoolListVm, TrainingField } from '@frontend/api-interface';
import { FormationsService } from '@frontend/core-data';
import { FormationDataSource, FormationsFacadeService,SchoolsFacadeService, TrainingFieldsFacadeService } from '@frontend/core-state';
import { Console } from 'console';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { FormationDetailsComponent } from './formation-details/formation-details.component';
import { ConfirmationBoxComponent } from '@frontend/shared';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-formation-list',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationListComponent implements OnInit {
  displayedColumns = ["name", "trainingFieldName","actions"];
  dataSource : FormationDataSource;
  nbOfFormations:number;

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
  fields: TrainingField[] = [];

  constructor(
    private formationService : FormationsService,
    private formationsFacadeService : FormationsFacadeService,
    private trainingFieldsFacadeService : TrainingFieldsFacadeService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.dataSource = new FormationDataSource(this.formationService);
    this.dataSource.loadFormations(1, 10, '','name asc');
    this.getNumberOfFormations();
    this.listOfFields();
  }

  ngAfterViewInit(): void {
            // server-side search
            fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadFormationsPage();
                })
            )
            .subscribe();

              // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadFormationsPage())
      )
      .subscribe();

        // one create or update, load new page
        this.formationsFacadeService.mutations$.subscribe((_) => {
          this.loadFormationsPage();
          this.getNumberOfFormations();
        });

        this.trainingFieldsFacadeService.mutations$.subscribe((_) => {
          this.listOfFields();
        });
    }

    loadFormationsPage() {
        this.dataSource.loadFormations(
          this.paginator.pageIndex+1,
          this.paginator.pageSize,
          this.input.nativeElement.value,
          this.sort.active+ " " + this.sort.direction
        );
    }


    listOfFields(){
      this.fields = null;
      this.trainingFieldsFacadeService.load(1,1000,'', 'name asc');
      this.trainingFieldsFacadeService.data$.subscribe((data) => {
        this.fields = data.items;
      });
    }

    edit(formation: Formation) {
      console.log(formation);
      const dlg = this.dialog.open(FormationDetailsComponent, { data: { formation, fields:this.fields, isNew: false } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              _.assign(formation, res);
              console.log(res);
              this.formationsFacadeService.persist(res);
          }
      });
    }

    create(){
      const formation = new Formation();
      const err = this.error;
      console.log(err);
      const dlg = this.dialog.open(FormationDetailsComponent, { data: { formation, fields:this.fields, isNew : true } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
            this.formationsFacadeService.persist(res);
          }
      });
    }

    delete(formation: Formation){
      const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
        data: {
          title: 'Confirmez la suppression !',
          message: 'Etes-vous certain de vouloir supprimer l\'école: \n' + formation.name
        }
      });

      confirmDialog.afterClosed().subscribe(result => {
        if(result == true){
          console.log(result);
          this.formationsFacadeService.delete(formation.formationId);
        }
      });
    }

    getNumberOfFormations(){
      this.dataSource.nbrOfFormations$.subscribe((nb:number) => {
        console.log(nb);
        this.nbOfFormations = nb;
      })
    }
}

