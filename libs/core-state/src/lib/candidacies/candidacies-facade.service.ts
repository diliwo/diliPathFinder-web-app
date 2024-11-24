import { Injectable } from '@angular/core';
import {  CandidaciesService } from '@frontend/core-data';
import { CandidaciesListVm, Candidacy, EmploymentStatusItem, IntegrationWorkers, MessageType } from '@frontend/api-interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CandidaciesFacadeService {

  private allCandidaciesListVm = new Subject<CandidaciesListVm>();
  private allCandidaciesByBeneficiary = new Subject<CandidaciesListVm>();
  private mutations = new Subject();

  allCandidaciesListVm$ = this.allCandidaciesListVm.asObservable();
  allCandidaciesByBeneficiary$ = this.allCandidaciesByBeneficiary.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(private candidaciesService : CandidaciesService,private notificationService: NotificationService) { }
  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, beneficiaryId: number){
    this.candidaciesService
    .getAll(pageNumber,pageSize,beneficiaryId)
    .subscribe((candidaciesListVm: CandidaciesListVm) => {
      console.log(candidaciesListVm);
      this.allCandidaciesByBeneficiary.next(candidaciesListVm)
    }

  );
}
loadIntegrationWorkers(pageNumber: number, pageSize: number, filter: string, isInProgress: boolean, orderBy:string=""){
  this.candidaciesService
  .getIntegrationsWorkers(pageNumber,pageSize,filter,isInProgress,orderBy)
  .subscribe((integrationWorkers: IntegrationWorkers) => {
    console.log(integrationWorkers);
    this.allCandidaciesByBeneficiary.next(integrationWorkers)
  }

);
}
  persist(candidacyDetail : Candidacy){
    this.candidaciesService.upsert(candidacyDetail).subscribe((_) => this.reset());
  }

  addToHistory(EmploymentStatusItem : any){
    this.candidaciesService.addToHistory(EmploymentStatusItem).subscribe((_) => {
      this.reset()
      const msg = "Régime horaire ajouté !";

      this.notificationService.showMessage(
        msg,
        MessageType.Information
      );
    },
    (error) => {
      console.log(error);
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    }
    );
  }

  terminateEmployment(employment: any){
    this.candidaciesService.terminateEmployment(employment).subscribe((candidaciesListVm: CandidaciesListVm) => {
      this.allCandidaciesByBeneficiary.next(candidaciesListVm);
      this.reset()
      const msg = "Fin de contrat enregistrée !";

      this.notificationService.showMessage(
        msg,
        MessageType.Information
      );
    },
    (error) => {
      console.log(error);
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    }
    );
  }

  delete(id : number){
    this.candidaciesService.delete(id).subscribe((_) => this.reset());
  }
}
