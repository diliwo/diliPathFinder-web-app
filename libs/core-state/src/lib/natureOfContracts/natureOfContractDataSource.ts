import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { NatureOfContract, TrainingFields } from "@frontend/api-interface";
import { TrainingFieldService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class TrainingFieldDataSource implements DataSource<NatureOfContract> {

  private NatureOfContractSubject = new BehaviorSubject<NatureOfContract[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfContracts = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfTrainingFields$ = this.numberOfContracts.asObservable();

  constructor(private trainingFieldsService: TrainingFieldService) {}

  connect(collectionViewer: CollectionViewer): Observable<NatureOfContract[] | readonly NatureOfContract[]> {
    return this.NatureOfContractSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.NatureOfContractSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, filter:string= ''){
    this.trainingFieldsService.getAll(pageNumber, pageSize, filter).subscribe(
      (contract:TrainingFields) =>{
        console.log(contract);
        if (contract !== undefined && contract !== null) {
          this.NatureOfContractSubject.next(contract.items)
          this.numberOfContracts.next(contract.totalCount);
        }
      },
    );
  }

}
