import { CreateQuarterlyMonitoringCommand, MessageType, UpdateQuarterlyMonitoringCommand } from '@frontend/api-interface';
import { Injectable } from '@angular/core';
import { PaginatedListOfQuarterlyMonitoringDto } from '@frontend/api-interface'
import { BeneficiarySuivisService, MonitoringActionsService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { MonitoringActionDto } from '../../../../api-interface/src/lib/api-interface.module';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarySuivisFacadeService {

  private allsuivis = new Subject<PaginatedListOfQuarterlyMonitoringDto>();
  private actions = new Subject<MonitoringActionDto[]>();
  private mutations = new Subject();

  allsuivis$ = this.allsuivis.asObservable();
  actions$ = this.actions.asObservable();
  mutation$ = this.mutations.asObservable();

  constructor(private suivisService : BeneficiarySuivisService,
    private actionsService : MonitoringActionsService,
    private notificationService: NotificationService) { }

    reset() {
      console.log('Notification send !');
      this.mutations.next(true);
    }

    load(pageNumber: number, pageSize: number, beneficiaryId: number, filter : string){
      this.suivisService.getAllByBeneficiaryId(beneficiaryId, filter ,false , pageNumber, pageSize ).subscribe(
        (beneficiarySuivi:PaginatedListOfQuarterlyMonitoringDto) =>{
          console.log(beneficiarySuivi);
          if (beneficiarySuivi !== undefined && beneficiarySuivi !== null) {
            this.allsuivis.next(beneficiarySuivi)
          }
        },
      );
    }

    create(beneficiarySuivi : CreateQuarterlyMonitoringCommand){
       this.suivisService.create(beneficiarySuivi).subscribe((_) =>
        {
          console.log(beneficiarySuivi);
          this.reset()
          this.notificationService.showMessage(
            'Le suivi a bien été ajouté !',
            MessageType.Information
          );
        });
      }

      update(beneficiarySuivi : UpdateQuarterlyMonitoringCommand){
        this.suivisService.update(beneficiarySuivi).subscribe((_) =>
          {
            console.log(beneficiarySuivi);
            this.reset()
            this.notificationService.showMessage(
              'Le suivi a bien été modifié !',
              MessageType.Information
            );
          });
      }

      delete(id : number){
        this.suivisService.delete(id).subscribe((_) =>
        {
            this.reset()
            this.notificationService.showMessage(
              'Suivi supprimé !',
              MessageType.Information
            );
          },
          (error) => {
            this.notificationService.showServerErrorNotification(error);
            this.reset()
          });
      }

      getActionsList(){
        this.actionsService.getAll().subscribe(
          (actions:MonitoringActionDto[]) =>{
            console.log(actions);
            if (actions !== undefined && actions !== null) {
              this.actions.next(actions)
            }
          },
        );
      }

    }
