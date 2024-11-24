import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { QuarterlyMonitoringDto, PaginatedListOfQuarterlyMonitoringDto } from "@frontend/api-interface";
import { BeneficiarySuivisService, MonitoringActionsService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";
import { MonitoringActionDto } from '../../../../api-interface/src/lib/api-interface.module';

export class BenefSuiviDataSource implements DataSource<QuarterlyMonitoringDto> {

  private suiviSubject = new BehaviorSubject<QuarterlyMonitoringDto[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfSuivis = new BehaviorSubject<number>(0);
  private actionsList = new BehaviorSubject<MonitoringActionDto[]>([]);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfSuivis$ = this.numberOfSuivis.asObservable();

  constructor(private beneficiarySuivisService: BeneficiarySuivisService,
    private actionsService : MonitoringActionsService) {}

  connect(collectionViewer: CollectionViewer): Observable<QuarterlyMonitoringDto[] | readonly QuarterlyMonitoringDto[]> {
    return this.suiviSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.suiviSubject.complete();
    //this.loadingSubject.complete();
  }

  loadSuivis(pageNumber: number = 1, pageSize: number = 3, beneficiaryId:number, filter: string = "") {
    this.beneficiarySuivisService.getAllByBeneficiaryId(beneficiaryId, filter, false, pageNumber, pageSize).subscribe(
      (beneficiarySuivi:PaginatedListOfQuarterlyMonitoringDto) =>{
        console.log(beneficiarySuivi);
        if (beneficiarySuivi !== undefined && beneficiarySuivi !== null) {
          this.suiviSubject.next(beneficiarySuivi.items)
          this.numberOfSuivis.next(beneficiarySuivi.totalCount);
        }
      },
    );
  }
  getActionsList(){
    this.actionsService.getAll().subscribe(
      (actions:MonitoringActionDto[]) =>{
        console.log(actions);
        if (actions !== undefined && actions !== null) {
          this.actionsList.next(actions);
        }
      },
    );
  }


}
