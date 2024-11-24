import { Injectable } from '@angular/core';
import { MessageType, ProfessionMv} from '@frontend/api-interface';
import { ProfessionsService } from '@frontend/core-data';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';
import { NotificationService } from '../notification/notification.service';



@Injectable({
  providedIn: 'root'
})
export class ProfessionsFacadeService {
  private allProfessions = new Subject<ProfessionMv.ProfessionList>();
  private mutations = new Subject();

  allProfessions$ = this.allProfessions.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private professionsService : ProfessionsService,
    private notificationService: NotificationService
    ) { }
  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string, orderBy:string=""){
    this.professionsService.getall(pageNumber, pageSize, filter, orderBy).subscribe(
      (professionList:ProfessionMv.ProfessionList) =>{
        console.log(professionList);
        if (professionList !== undefined && professionList !== null) {
          this.allProfessions.next(professionList)
        }
      },
    );
  }

  persist(profession : ProfessionMv.Profession){
    this.professionsService.upsert(profession).subscribe((_) =>
    {
      const msg = (profession.professionId == null) ? 'Métier ajouté !' : 'Métier actualisé !';
      console.log(profession.professionId);
      this.reset()
      this.notificationService.showMessage(
        msg,
        MessageType.Information
      );
    });
  }

  delete(id : number){
    this.professionsService.delete(id).subscribe(
      (_) => {
        this.reset()
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      }
      );
  }
}
