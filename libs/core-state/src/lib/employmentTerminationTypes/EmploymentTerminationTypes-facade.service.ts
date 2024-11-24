import { Injectable } from '@angular/core';
import { Formation, Formations, MessageType, EmploymentTerminationTypes, TrainingFields } from '@frontend/api-interface';
import { FormationsService, EmploymentTerminationTypeService, TrainingFieldService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class EmploymentTerminationTypeFacadeService {
  private data = new Subject<EmploymentTerminationTypes>();
  private mutations = new Subject();

  data$ = this.data.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private employmentTerminationTypeService : EmploymentTerminationTypeService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string, orderBy:string){
    this.employmentTerminationTypeService.getAll(pageNumber, pageSize, filter, orderBy).subscribe(
      (type:EmploymentTerminationTypes) =>{
        console.log(type);
        if (type !== undefined && type !== null) {
          this.data.next(type)
        }
      },
    );
  }
}
