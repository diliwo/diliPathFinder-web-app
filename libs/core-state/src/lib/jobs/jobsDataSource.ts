import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { JobDetail, JobsListVm } from '@frontend/api-interface';
import { JobsService } from '@frontend/core-data';
import { BehaviorSubject, Observable } from 'rxjs';

export class JobsDataSource implements DataSource<JobDetail> {

  private jobsSubject = new BehaviorSubject<JobDetail[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfJobs = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfJobs$ = this.numberOfJobs.asObservable();

  constructor(private jobsService: JobsService) {}

  connect(collectionViewer: CollectionViewer): Observable<JobDetail[] | readonly JobDetail[]> {
    return this.jobsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.jobsSubject.complete();
    this.loadingSubject.complete();
  }

  loadJobs(pageNumber: number = 1, pageSize: number = 3, filter:string= '', orderBy:string=""){
    this.loadingSubject.next(true);
    this.jobsService.allJobs(pageNumber, pageSize, filter,false, orderBy).subscribe(
      (jobsListVm:JobsListVm) =>{
        console.log(jobsListVm);
        if (jobsListVm !== undefined && jobsListVm !== null) {
          this.jobsSubject.next(jobsListVm.jobs)
          this.numberOfJobs.next(jobsListVm.totalCount);
          this.loadingSubject.next(false);
        }
      },
    );
  }

  loadJobsFilteredByStatus(status: string = 'active',pageNumber: number = 1, pageSize: number = 3, filter:string= '', orderBy:string=""){
    this.loadingSubject.next(true);
    this.jobsService.getJobsFilteredByStatus(status,pageNumber, pageSize, filter, orderBy).subscribe(
      (jobsListVm:JobsListVm) =>{
        console.log(jobsListVm);
        if (jobsListVm !== undefined && jobsListVm !== null) {
          this.jobsSubject.next(jobsListVm.jobs)
          this.numberOfJobs.next(jobsListVm.totalCount);
          this.loadingSubject.next(false);
        }
      },
    );
  }

}
