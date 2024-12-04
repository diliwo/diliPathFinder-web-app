import { Injectable } from '@angular/core';
import { ProfessionnalExperience, ProfessionnalExperiences, MessageType } from '@frontend/api-interface';
import { ProfessionalExperiencesService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalExperienceFacadeService {
  private allExperiences = new Subject<ProfessionnalExperiences>();
  private mutations = new Subject();

  allExperiences$ = this.allExperiences.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private ProfessionalExperiencesService : ProfessionalExperiencesService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, client: string, filter:string){
    this.ProfessionalExperiencesService.getAll(pageNumber, pageSize, client, filter).subscribe(
      (ProfessionnalExperiences:ProfessionnalExperiences) =>{
        console.log(ProfessionnalExperiences);
        if (ProfessionnalExperiences !== undefined && ProfessionnalExperiences !== null) {
          this.allExperiences.next(ProfessionnalExperiences)
        }
      },
    );
  }

  persist(ProfessionnalExperience : ProfessionnalExperience){
    if(ProfessionnalExperience.professionalExperienceId != null){
      this.ProfessionalExperiencesService.update(ProfessionnalExperience).subscribe((_) =>
      {
        console.log(ProfessionnalExperience.professionalExperienceId);
        this.reset()
        this.notificationService.showMessage(
          'Expérience actualisée !',
          MessageType.Information
        );
      });
    } else {
      this.ProfessionalExperiencesService.insert(ProfessionnalExperience).subscribe((_) =>
      {
        console.log(ProfessionnalExperience.professionalExperienceId);
        this.reset()
        this.notificationService.showMessage(
          'Expérience ajoutée !',
          MessageType.Information
        );
      });
    }
  }

  delete(id : number){
    this.ProfessionalExperiencesService.delete(id).subscribe(
      (_) => {
        this.reset()
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      });
  }
}
