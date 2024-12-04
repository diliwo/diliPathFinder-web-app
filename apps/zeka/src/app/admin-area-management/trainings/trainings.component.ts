import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Training, School, SchoolListVm, TrainingField } from '@frontend/api-interface';
import { Console } from 'console';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { trainingDetailsComponent } from './training-details/training-details.component';
import { ConfirmationBoxComponent } from '@frontend/shared';
import * as _ from 'lodash-es';
import { TrainingDataSource, TrainingFieldsFacadeService, TrainingsFacadeService } from '@frontend/core-state';
import { TrainingsService } from '@frontend/core-data';

@Component({
  selector: 'frontend-training-list',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class trainingsComponent implements OnInit {
  displayedColumns = ["name", "trainingFieldName","actions"];
  dataSource : TrainingDataSource;
  nbOftrainings:number;

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
    private trainingService : TrainingsService,
    private trainingsFacadeService : TrainingsFacadeService,
    private trainingFieldsFacadeService : TrainingFieldsFacadeService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.dataSource = new TrainingDataSource(this.trainingService);
    this.dataSource.load(1, 10, '','name asc');
    this.getNumberOftrainings();
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

        //one create or update, load new page
        this.trainingsFacadeService.mutations$.subscribe((_) => {
          this.loadPage();
          this.getNumberOftrainings();
        });

        this.trainingFieldsFacadeService.mutations$.subscribe((_) => {
          this.listOfFields();
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


    listOfFields(){
      this.fields = null;
      this.trainingFieldsFacadeService.load(1,1000,'', 'name asc');
      this.trainingFieldsFacadeService.data$.subscribe((data) => {
        this.fields = data.items;
      });
    }

    edit(training: Training) {
      console.log(training);
      const dlg = this.dialog.open(trainingDetailsComponent, { data: { training, fields:this.fields, isNew: false } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              _.assign(training, res);
              console.log(res);
              this.trainingsFacadeService.persist(res);
          }
      });
    }

    create(){
      const training = new Training();
      const err = this.error;
      console.log(err);
      const dlg = this.dialog.open(trainingDetailsComponent, { data: { training, fields:this.fields, isNew : true } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
            this.trainingsFacadeService.persist(res);
          }
      });
    }

    delete(training: Training){
      const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
        data: {
          title: 'Confirm the surppression !',
          message: 'Are you sure about deleting the training : \n' + training.name
        }
      });

      confirmDialog.afterClosed().subscribe(result => {
        if(result == true){
          console.log(result);
          this.trainingsFacadeService.delete(training.id);
        }
      });
    }

    getNumberOftrainings(){
      this.dataSource.nbrOftrainings$.subscribe((nb:number) => {
        console.log(nb);
        this.nbOftrainings = nb;
      })
    }
}

