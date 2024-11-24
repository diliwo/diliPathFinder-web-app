import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BeneficiaryFormation, Formation, School, SchoolListVm, TrainingType } from '@frontend/api-interface';
import { BeneficiaryFormationsService, FormationsService } from '@frontend/core-data';
import {
  BenefFormationDataSource,
  BeneficiaryFormationsFacadeService,
  FormationDataSource,
  FormationsFacadeService,
  SchoolsFacadeService,
  TrainingTypesFacadeService
} from '@frontend/core-state';
import { BeneficiaryFormationDetailsComponent }
from '../beneficiary-formation-details/beneficiary-formation-details.component';
import { ConfirmationBoxComponent } from '@frontend/shared';
import * as _ from 'lodash-es';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

@Component({
  selector: 'frontend-beneficiary-formations-list',
  templateUrl: './beneficiary-formations-list.component.html',
  styleUrls: ['./beneficiary-formations-list.component.scss']
})
export class BeneficiaryFormationsListComponent implements OnInit {
  dataSource : BenefFormationDataSource;
  displayedColumns = ["SchoolName", "formation","trainingType","note","courseLevel","result","startdate","endate","actions"];
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
  @Input() beneficiaryId;

  error: any;
  formations: Formation[] = [];
  schools: School[] = [];
  trainingTypes: TrainingType[] = [];

  constructor(
    private benefFormationService : BeneficiaryFormationsService,
    private formationsFacadeService : FormationsFacadeService,
    private beneficiaryFormationsFacadeService: BeneficiaryFormationsFacadeService,
    private schoolsFacadeService : SchoolsFacadeService,
    private trainingTypesFacadeService : TrainingTypesFacadeService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.dataSource = new BenefFormationDataSource(this.benefFormationService);
    this.dataSource.loadRegistrations(1, 25, this.beneficiaryId);
    this.getNumberOfFormations();
    this.loadFormations();
    this.loadSchools();
    this.loadTrainingtypes();
  }

  ngAfterViewInit(): void {
        fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
            this.paginator.pageIndex = 0;
            this.loadBeneficiaryFormationsPage();
          })
        )
        .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadBeneficiaryFormationsPage())
      )
      .subscribe();


        // one create or update, load new page
        this.beneficiaryFormationsFacadeService.mutations$.subscribe((_) => {
          console.log(_);
          console.log('Notification received !');
          this.loadBeneficiaryFormationsPage();
          this.getNumberOfFormations();
        });

        this.formationsFacadeService.mutations$.subscribe((_) => {
          this.loadFormations();
        });

        this.schoolsFacadeService.mutations$.subscribe((_) => {
          this.loadSchools();
        });

        this.trainingTypesFacadeService.mutations$.subscribe((_) => {
          this.loadTrainingtypes();
        });
    }

    loadBeneficiaryFormationsPage() {
        this.dataSource.loadRegistrations(
          this.paginator.pageIndex+1,
          this.paginator.pageSize,
          this.beneficiaryId,
          this.input.nativeElement.value,
          this.sort.active+ " " + this.sort.direction
        );
    }


    loadFormations(){
      this.formations = null;
      this.formationsFacadeService.load(1,1000,'','name asc');
      this.formationsFacadeService.allFormations$.subscribe((formationsApi) => {
        this.formations = formationsApi.items;
      });
    }

    loadSchools(){
      this.schools = null;
      this.schoolsFacadeService.loadSchools(1,1000,'','name asc');
      this.schoolsFacadeService.allSchools$.subscribe((data) => {
        this.schools = data.schools;
      });
    }

    loadTrainingtypes(){
      this.trainingTypes = null;
      this.trainingTypesFacadeService.load(1,1000,'','name asc');
      this.trainingTypesFacadeService.data$.subscribe((data) => {
        this.trainingTypes = data.items;
      });
    }

    edit(benefFormation: BeneficiaryFormation) {
      benefFormation.beneficiaryId = this.beneficiaryId;
      const dlg = this.dialog.open(BeneficiaryFormationDetailsComponent,
        { data: { benefFormation, schools:this.schools, formations:this.formations, trainingTypes: this.trainingTypes, isNew: false },
        maxWidth: '30vw',
        width: '30%'});
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              _.assign(benefFormation, res);
              console.log(res);
              this.beneficiaryFormationsFacadeService.persist(res);
          }
      });
    }

    create(){
      const benefFormation = new BeneficiaryFormation();
      benefFormation.beneficiaryId = this.beneficiaryId;
      const err = this.error;
      console.log(err);
      const dlg = this.dialog.open(BeneficiaryFormationDetailsComponent,
        { data: { benefFormation, schools:this.schools, formations:this.formations, trainingTypes:this.trainingTypes, isNew : true },
        maxWidth: '30vw',
        width: '30%'});
      dlg.beforeClosed().subscribe(res => {
          if (res) {
            console.log(res);
            this.beneficiaryFormationsFacadeService.persist(res);
          }
      });
    }

    delete(formation: BeneficiaryFormation){
      const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
        data: {
          title: 'Confirmer la suppression !',
          message: 'Etes-vous certain de vouloir supprimer l\'inscription :',
          object : formation.formationName
        }
      });

      confirmDialog.afterClosed().subscribe(result => {
        if(result == true){
          console.log(result);
          this.beneficiaryFormationsFacadeService.delete(formation.schoolRegistrationId);
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
