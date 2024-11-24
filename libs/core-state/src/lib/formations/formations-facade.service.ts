import { Injectable } from '@angular/core';
import { Formation, Formations, MessageType } from '@frontend/api-interface';
import { FormationsService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class FormationsFacadeService {
  private allFormations = new Subject<Formations>();
  private mutations = new Subject();

  allFormations$ = this.allFormations.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private formationsService : FormationsService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string, orderby:string){
    this.formationsService.getAll(pageNumber, pageSize, filter, orderby).subscribe(
      (formationListVm:Formations) =>{
        console.log(formationListVm);
        if (formationListVm !== undefined && formationListVm !== null) {
          this.allFormations.next(formationListVm)
        }
      },
    );
  }

  persist(formation : Formation){
    if(formation.formationId != null){
      this.formationsService.update(formation).subscribe((_) =>
      {
        console.log(formation.formationId);
        this.reset()
        this.notificationService.showMessage(
          'Formation actualisée !',
          MessageType.Information
        );
      });
    } else {
      this.formationsService.insert(formation).subscribe((_) =>
      {
        console.log(formation.formationId);
        this.reset()
        this.notificationService.showMessage(
          'Formation ajoutée !',
          MessageType.Information
        );
      });
    }
  }

  delete(id : number){
    this.formationsService.delete(id).subscribe(
      (_) => {
        this.reset()
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      });
  }
}
