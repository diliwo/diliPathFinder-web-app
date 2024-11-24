import { Injectable } from '@angular/core';
import {  JobsService } from '@frontend/core-data';
import { JobsListVm, JobDetail, Rewards, JobOccupants } from '@frontend/api-interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';
import { ConstantPool } from '@angular/compiler';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class JobsFacadeService {

  private allJobsListVm = new Subject<JobsListVm>();
  private jobOccupants = new Subject<JobOccupants>();
  private rewards = new Subject<Rewards>();
  private mutations = new Subject();
  private numberOfJobs = new BehaviorSubject<number>(0);
  private spinner = new Subject();

  allJobsListVm$ = this.allJobsListVm.asObservable();
  jobOccupants$ = this.jobOccupants.asObservable();
  rewards$ = this.rewards.asObservable();
  mutations$ = this.mutations.asObservable();
  spinner$ = this.spinner.asObservable();

  public jobsState = new MatTableState('jobId', 'asc', 5);

  constructor(
    private jobsService : JobsService,
    private notificationService: NotificationService
    ) { }
  reset() {
    this.mutations.next(true);
  }

  loadJobs(pageNumber: number, pageSize: number, filter: string = '',getOnlyjobWithOpenjobOffer: boolean = false, orderBy:string='PartnerName asc'){
    this.jobsService
    .allJobs(pageNumber,pageSize,filter,getOnlyjobWithOpenjobOffer, orderBy)
    .subscribe((jobsListVm: JobsListVm) => {
      console.log(jobsListVm);
      this.allJobsListVm.next(jobsListVm)
      this.dataLoaded();
      }
    );
  }

  loadOccupants(pageNumber: number, pageSize: number, filter: string = '',jobid: number){
    this.jobsService
    .getOccupants(pageNumber,pageSize,jobid,filter)
    .subscribe((jobOccupants: JobOccupants) => {
      console.log(jobOccupants);
      this.jobOccupants.next(jobOccupants)
      this.dataLoaded();
      }
    );
  }

  persist(jobDetail : JobDetail){
    this.jobsService.upsert(jobDetail).subscribe((_) => {this.reset()},
    (error) => {
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    });
  }

  updateDate(jobDetail : JobDetail){
    this.jobsService.updateDates(jobDetail).subscribe((_) => {this.reset()},
    (error) => {
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    });
  }

  loadRewards(){
    this.jobsService.rewards().subscribe((listOfrewards: Rewards) => {
      this.rewards.next(listOfrewards)
    });
  }

  dataLoaded(){
    this.spinner.next(true);
  }

  delete(id : number){
    this.jobsService.delete(id).subscribe(
      (_) => {
        this.reset()
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        //this.reset()
      });
  }
}
