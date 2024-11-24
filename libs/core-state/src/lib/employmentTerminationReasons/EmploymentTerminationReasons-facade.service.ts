import { Injectable } from '@angular/core';
import { Formation, Formations, MessageType, EmploymentTerminationReasons, TrainingFields } from '@frontend/api-interface';
import { FormationsService, EmploymentTerminationReasonService, TrainingFieldService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class EmploymentTerminationReasonFacadeService {
  private data = new Subject<EmploymentTerminationReasons>();
  private mutations = new Subject();

  data$ = this.data.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private employmentTerminationReasonService : EmploymentTerminationReasonService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string, orderBy:string){
    this.employmentTerminationReasonService.getAll(pageNumber, pageSize, filter, orderBy).subscribe(
      (contract:EmploymentTerminationReasons) =>{
        console.log(contract);
        if (contract !== undefined && contract !== null) {
          this.data.next(contract)
        }
      },
    );
  }
}
