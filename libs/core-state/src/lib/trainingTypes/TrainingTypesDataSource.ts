import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { TrainingField, TrainingFields, TrainingType, TrainingTypes } from "@frontend/api-interface";
import { TrainingTypeService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class TrainingTypeDataSource implements DataSource<TrainingType> {

  private trainingTypeSubject = new BehaviorSubject<TrainingType[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfTrainingTypes = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public numberOfTrainingTypes$ = this.numberOfTrainingTypes.asObservable();

  constructor(private trainingTypeService: TrainingTypeService) {}

  connect(collectionViewer: CollectionViewer): Observable<TrainingType[] | readonly TrainingType[]> {
    return this.trainingTypeSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.trainingTypeSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, filter:string= '', orderBy:string=''){
    this.trainingTypeService.getAll(pageNumber, pageSize, filter, orderBy).subscribe(
      (type:TrainingTypes) =>{
        console.log(type);
        if (type !== undefined && type !== null) {
          this.trainingTypeSubject.next(type.items)
          this.numberOfTrainingTypes.next(type.totalCount);
        }
      },
    );
  }
}
