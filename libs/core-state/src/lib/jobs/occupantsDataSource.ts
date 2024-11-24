import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { JobOccupant, JobOccupants } from '@frontend/api-interface';
import { JobsService } from '@frontend/core-data';
import { BehaviorSubject, Observable } from 'rxjs';

export class JobOccupantsDataSource implements DataSource<JobOccupant> {

  private occupantsSubject = new BehaviorSubject<JobOccupant[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfOccupants = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public numberOfOccupants$ = this.numberOfOccupants.asObservable();

  constructor(private jobsService: JobsService) {}

  connect(collectionViewer: CollectionViewer): Observable<JobOccupant[] | readonly JobOccupant[]> {
    return this.occupantsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.occupantsSubject.complete();
    this.loadingSubject.complete();
  }

  loadOccupants(pageNumber: number = 1, pageSize: number = 3, jobid:number, filter:string= ''){
    this.loadingSubject.next(true);
    this.jobsService.getOccupants(pageNumber, pageSize, jobid, filter).subscribe(
      (jobOccupants:JobOccupants) =>{
        console.log(jobOccupants);
        if (jobOccupants !== undefined && jobOccupants !== null) {
          this.occupantsSubject.next(jobOccupants.occuppants)
          this.numberOfOccupants.next(jobOccupants.totalCount);
          this.loadingSubject.next(false);
        }
      },
    );
  }

}
