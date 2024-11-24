import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { IntegrationWorkers, IntegrationWorker } from "@frontend/api-interface";
import { CandidaciesService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class IntegrationWorkersDataSource implements DataSource<IntegrationWorker> {

  private integrationWorkersSubject = new BehaviorSubject<IntegrationWorker[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfIntegrationWorkers = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public numberOfIntegrationWorkers$ = this.numberOfIntegrationWorkers.asObservable();

  constructor(private candidaciesService: CandidaciesService) {}

  connect(collectionViewer: CollectionViewer): Observable<IntegrationWorker[] | readonly IntegrationWorker[]> {
    return this.integrationWorkersSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.integrationWorkersSubject.complete();
    this.loadingSubject.complete();
  }

  load(pageNumber: number, pageSize: number, filter: string, isInProgress: boolean, orderBy:string=""){
    this.loadingSubject.next(true);
    this.candidaciesService.getIntegrationsWorkers(pageNumber, pageSize,filter,isInProgress,orderBy).subscribe(
      (integrationWorkers:IntegrationWorkers) =>{
        console.log(integrationWorkers);
        if (integrationWorkers !== undefined && integrationWorkers !== null) {
          this.integrationWorkersSubject.next(integrationWorkers.integrationWorkers)
          this.numberOfIntegrationWorkers.next(integrationWorkers.totalCount);
          this.loadingSubject.next(false);
        }
      },
    );
  }
}
