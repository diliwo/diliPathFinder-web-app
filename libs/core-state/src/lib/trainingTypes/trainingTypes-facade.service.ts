import { Injectable } from '@angular/core';
import { TrainingType, Formations, MessageType, TrainingFields, TrainingTypes } from '@frontend/api-interface';
import {TrainingFieldService, TrainingTypeService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingTypesFacadeService {
  private data = new Subject<TrainingTypes>();
  private mutations = new Subject();

  data$ = this.data.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private trainingTypesService : TrainingTypeService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string, orderBy:string){
    this.trainingTypesService.getAll(pageNumber, pageSize, filter, orderBy).subscribe(
      (types:TrainingTypes) =>{
        console.log(types);
        if (types !== undefined && types !== null) {
          this.data.next(types)
        }
      },
    );
  }

  persist(trainingType : TrainingType){
    if(trainingType.id != null){
      this.trainingTypesService.update(trainingType).subscribe((_) =>
      {
        this.reset()
        this.notificationService.showMessage(
          'Type de formation actualisé !',
          MessageType.Information
        );
      });
    } else {
      this.trainingTypesService.insert(trainingType).subscribe((_) =>
      {
        this.reset()
        this.notificationService.showMessage(
          'Type de formation ajouté !',
          MessageType.Information
        );
      });
    }
  }

  delete(id : number){
    this.trainingTypesService.delete(id).subscribe(
      (_) => {
        this.reset()
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      });
  }
}
