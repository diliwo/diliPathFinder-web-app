import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { EmploymentTerminationReason, EmploymentTerminationType, TrainingFields } from "@frontend/api-interface";
import { EmploymentTerminationTypeService, TrainingFieldService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class EmploymentTerminationTypeDataSource implements DataSource<EmploymentTerminationType> {

  private employmentTerminationTypeSubject = new BehaviorSubject<EmploymentTerminationType[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfTypes = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfTrainingFields$ = this.numberOfTypes.asObservable();

  constructor(private employmentTerminationTypeService: EmploymentTerminationTypeService) {}

  connect(collectionViewer: CollectionViewer): Observable<EmploymentTerminationType[] | readonly EmploymentTerminationType[]> {
    return this.employmentTerminationTypeSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.employmentTerminationTypeSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, filter:string= ''){
    this.employmentTerminationTypeService.getAll(pageNumber, pageSize, filter).subscribe(
      (contract:TrainingFields) =>{
        console.log(contract);
        if (contract !== undefined && contract !== null) {
          this.employmentTerminationTypeSubject.next(contract.items)
          this.numberOfTypes.next(contract.totalCount);
        }
      },
    );
  }

}
