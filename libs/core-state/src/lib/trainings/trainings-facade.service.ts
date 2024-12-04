import { Injectable } from '@angular/core';
import { Training, Trainings, MessageType } from '@frontend/api-interface';
import { TrainingsService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingsFacadeService {
  private alltrainings = new Subject<Trainings>();
  private mutations = new Subject();

  alltrainings$ = this.alltrainings.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private trainingsService : TrainingsService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string, orderby:string){
    this.trainingsService.getAll(pageNumber, pageSize, filter, orderby).subscribe(
      (trainingListVm:Trainings) =>{
        console.log(trainingListVm);
        if (trainingListVm !== undefined && trainingListVm !== null) {
          this.alltrainings.next(trainingListVm)
        }
      },
    );
  }

  persist(training : Training){
    if(training.id != null){
      this.trainingsService.update(training).subscribe((_) =>
      {
        console.log(training.id);
        this.reset()
        this.notificationService.showMessage(
          'training actualisée !',
          MessageType.Information
        );
      });
    } else {
      this.trainingsService.insert(training).subscribe((_) =>
      {
        console.log(training.id);
        this.reset()
        this.notificationService.showMessage(
          'training added !',
          MessageType.Information
        );
      });
    }
  }

  delete(id : number){
    this.trainingsService.delete(id).subscribe(
      (_) => {
        this.reset()
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      });
  }
}
