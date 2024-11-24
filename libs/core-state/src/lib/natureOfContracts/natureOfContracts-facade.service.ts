import { Injectable } from '@angular/core';
import { Formation, Formations, MessageType, NatureOfContracts, TrainingFields } from '@frontend/api-interface';
import { FormationsService, NatureOfContractService, TrainingFieldService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class NatureOfContractFacadeService {
  private data = new Subject<NatureOfContracts>();
  private mutations = new Subject();

  data$ = this.data.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private natureOfContractService : NatureOfContractService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string, orderBy:string){
    this.natureOfContractService.getAll(pageNumber, pageSize, filter, orderBy).subscribe(
      (contract:NatureOfContracts) =>{
        console.log(contract);
        if (contract !== undefined && contract !== null) {
          this.data.next(contract)
        }
      },
    );
  }
}
