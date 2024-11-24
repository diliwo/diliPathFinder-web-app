import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { EmploymentTerminationReason, TrainingFields } from "@frontend/api-interface";
import { EmploymentTerminationReasonService, TrainingFieldService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class EmploymentTerminationReasonDataSource implements DataSource<EmploymentTerminationReason> {

  private EmploymentTerminationReasonSubject = new BehaviorSubject<EmploymentTerminationReason[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfReasons = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfTrainingFields$ = this.numberOfReasons.asObservable();

  constructor(private employmentTerminationReasonService: EmploymentTerminationReasonService) {}

  connect(collectionViewer: CollectionViewer): Observable<EmploymentTerminationReason[] | readonly EmploymentTerminationReason[]> {
    return this.EmploymentTerminationReasonSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.EmploymentTerminationReasonSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, filter:string= ''){
    this.employmentTerminationReasonService.getAll(pageNumber, pageSize, filter).subscribe(
      (contract:TrainingFields) =>{
        console.log(contract);
        if (contract !== undefined && contract !== null) {
          this.EmploymentTerminationReasonSubject.next(contract.items)
          this.numberOfReasons.next(contract.totalCount);
        }
      },
    );
  }
}
