import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Training, Trainings } from "@frontend/api-interface";
import { TrainingsService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class TrainingDataSource implements DataSource<Training> {

  private trainingsSubject = new BehaviorSubject<Training[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOftrainings = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOftrainings$ = this.numberOftrainings.asObservable();

  constructor(private trainingsService: TrainingsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Training[] | readonly Training[]> {
    return this.trainingsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.trainingsSubject.complete();
    //this.loadingSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, filter:string= '', orderby:string=''){
    this.trainingsService.getAll(pageNumber, pageSize, filter,orderby).subscribe(
      (trainings:Trainings) =>{
        console.log(trainings);
        if (trainings !== undefined && trainings !== null) {
          this.trainingsSubject.next(trainings.items)
          this.numberOftrainings.next(trainings.totalCount);
        }
      },
    );
  }

}
