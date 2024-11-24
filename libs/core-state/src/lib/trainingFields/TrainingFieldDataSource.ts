import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { TrainingField, TrainingFields } from "@frontend/api-interface";
import { TrainingFieldService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class TrainingFieldDataSource implements DataSource<TrainingField> {

  private trainingFieldSubject = new BehaviorSubject<TrainingField[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfTrainingFields = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfTrainingFields$ = this.numberOfTrainingFields.asObservable();

  constructor(private trainingFieldsService: TrainingFieldService) {}

  connect(collectionViewer: CollectionViewer): Observable<TrainingField[] | readonly TrainingField[]> {
    return this.trainingFieldSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.trainingFieldSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, filter:string= ''){
    this.trainingFieldsService.getAll(pageNumber, pageSize, filter).subscribe(
      (field:TrainingFields) =>{
        console.log(field);
        if (field !== undefined && field !== null) {
          this.trainingFieldSubject.next(field.items)
          this.numberOfTrainingFields.next(field.totalCount);
        }
      },
    );
  }

}
