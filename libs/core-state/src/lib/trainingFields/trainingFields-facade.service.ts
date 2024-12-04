import { Injectable } from '@angular/core';
import { Training, Trainings, MessageType, TrainingFields } from '@frontend/api-interface';
import { TrainingsService, TrainingFieldService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingFieldsFacadeService {
  private data = new Subject<TrainingFields>();
  private mutations = new Subject();

  data$ = this.data.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private trainingFieldsService : TrainingFieldService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string, orderBy:string){
    this.trainingFieldsService.getAll(pageNumber, pageSize, filter, orderBy).subscribe(
      (fields:TrainingFields) =>{
        console.log(fields);
        if (fields !== undefined && fields !== null) {
          this.data.next(fields)
        }
      },
    );
  }
}
