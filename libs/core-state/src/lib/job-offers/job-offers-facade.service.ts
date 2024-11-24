import { Injectable } from '@angular/core';

import {  JobOffersService } from '@frontend/core-data';
import { JobOfferDetail, JobOffersListVm } from '@frontend/api-interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class JobOffersFacadeService {

  private allJobOffersListVm = new Subject<JobOffersListVm>();
  private mutations = new Subject();
  private spinner = new Subject();

  allJobOffersListVm$ = this.allJobOffersListVm.asObservable();
  mutations$ = this.mutations.asObservable();
  spinner$ = this.spinner.asObservable();

  constructor(
    private jobOffersService : JobOffersService,
    private notificationService: NotificationService
    ) { }
  reset() {
    this.mutations.next(true);
  }

  loadJobOffers(){
    this.jobOffersService
    .allJobOffers()
    .subscribe((jobOffersListVm: JobOffersListVm) => {
      this.allJobOffersListVm.next(jobOffersListVm)
      }
    );
  }

  jobOffersBySearch(text:string){
    this.jobOffersService.getJobOffersBySearch(text).subscribe(
      (jobOffersListVm: JobOffersListVm) =>{
        if (jobOffersListVm !== undefined && jobOffersListVm !== null) {
          this.allJobOffersListVm.next(jobOffersListVm)
        } else {
          const msg = 'Offres introuvables !';
          this.notificationService.emitMessage({ Type: 'ERROR', Text: msg });
        }
      },
    );
  }

  persist(jobOfferDetail : JobOfferDetail){
    this.jobOffersService.upsert(jobOfferDetail).subscribe((_) => {this.reset()},
    (error) => {
      console.log(error);
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    });
  }

  dataLoaded(){
    this.spinner.next(false);
  }
}
