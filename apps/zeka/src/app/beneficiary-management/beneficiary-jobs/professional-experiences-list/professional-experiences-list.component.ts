import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NatureOfContract, ProfessionnalExperience, ProfessionnalExperiences} from '@frontend/api-interface';
import { ProfessionalExperiencesService } from '@frontend/core-data';
import { ProfessionalExperienceFacadeService, ProfessionalExperienceDataSourceService, NatureOfContractFacadeService} from '@frontend/core-state';
import { Console } from 'console';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConfirmationBoxComponent } from '@frontend/shared';
import * as _ from 'lodash-es';
//import { FormationDetailsComponent } from '../../../management-console/formations-management/formation-details/formation-details.component';
import { ProfessionalExperienceDetailComponent } from '../professional-experience-detail/professional-experience-detail.component';

@Component({
  selector: 'frontend-professional-expectations-list',
  templateUrl: './professional-experiences-list.component.html',
  styleUrls: ['./professional-experiences-list.component.scss']
})
export class ProfessionalExperiencesListComponent implements OnInit {

  dataSource : ProfessionalExperienceDataSourceService;
  displayedColumns = ['startDate','endDate', 'function','typeOfContract','companyName', 'actions'];
  nbOfExperiences:number;

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
  @Input() beneficiaryId;
  contracts: NatureOfContract[] = [];
  constructor(
    private professionalExperiencesService : ProfessionalExperiencesService,
    private professionalExperienceFacadeService : ProfessionalExperienceFacadeService,
    private natureOfContractFacadeService: NatureOfContractFacadeService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.dataSource = new ProfessionalExperienceDataSourceService(this.professionalExperiencesService);
    this.dataSource.load(1, 3, this.beneficiaryId, '');
    this.getNumberOfExperience();
    this.getListOfContracts();
  }

  ngAfterViewInit(): void {
        // on paginate events, load a new page
        this.paginator.page
        .pipe(
            tap(() => {
              console.log('paginated');
              this.loadExperiencesPage()
            })
        )
        .subscribe();

        // one create or update, load new page
        this.professionalExperienceFacadeService.mutations$.subscribe((_) => {
          this.loadExperiencesPage();
          this.getNumberOfExperience();
        });

        this.natureOfContractFacadeService.mutations$.subscribe((_) => {
            this.getListOfContracts();
        });
    }

    loadExperiencesPage() {
        this.dataSource.load(
          this.paginator.pageIndex+1,
          this.paginator.pageSize,
          this.beneficiaryId,
          '',
        );
    }

    edit(exp: ProfessionnalExperience) {
      console.log(exp);
      const dlg = this.dialog.open(ProfessionalExperienceDetailComponent, {
        data: {
          experience: exp,
           listOfcontracts: this.contracts,
            isNew: false
        } });
      dlg.beforeClosed().subscribe(res => {
          if (res) {
              _.assign(exp, res);
              console.log(res);
              this.professionalExperienceFacadeService.persist(res);
          }
      });
    }

    create(){
      const exp = new ProfessionnalExperience();
      exp.beneficiaryId = this.beneficiaryId;
      const dlg = this.dialog.open(ProfessionalExperienceDetailComponent, {
        data: {
          experience: exp,
          listOfcontracts: this.contracts,
          isNew: true
        }});
      dlg.beforeClosed().subscribe(res => {
          if (res) {
            this.professionalExperienceFacadeService.persist(res);
          }
      });
    }

    delete(experience: ProfessionnalExperience){
      const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
        data: {
          title: 'Confirmez la suppression !',
          message: 'Etes-vous certain de vouloir supprimer cet élément ?'
        }
      });

      confirmDialog.afterClosed().subscribe(result => {
        if(result == true){
          console.log(result);
          this.professionalExperienceFacadeService.delete(experience.professionalExperienceId);
        }
      });
    }

    getNumberOfExperience(){
      this.dataSource.numberOfExperiences$.subscribe((nb:number) => {
        this.nbOfExperiences = nb;
      })
    }

    getListOfContracts(){
      this.natureOfContractFacadeService.load(1,1000,'', 'name asc');
      this.natureOfContractFacadeService.data$.subscribe((data) => {
        this.contracts = data.items;
      });
    }
}
