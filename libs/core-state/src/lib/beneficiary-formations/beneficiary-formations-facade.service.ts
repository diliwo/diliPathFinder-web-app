import { Injectable } from '@angular/core';
import { BeneficiaryFormation, BeneficiaryFormationListVm, MessageType } from '@frontend/api-interface';
import { BeneficiaryFormationsService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryFormationsFacadeService {
  private allFormations = new Subject<BeneficiaryFormationListVm>();
  private mutations = new Subject();

  allFormations$ = this.allFormations.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private beneficiaryFormationsService : BeneficiaryFormationsService,
    private notificationService: NotificationService
  ) {}

  reset() {
    console.log('Notification send !');
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, beneficiaryId: number){
    this.beneficiaryFormationsService.getAll(pageNumber, pageSize, beneficiaryId).subscribe(
      (beneficiaryFormation:BeneficiaryFormationListVm) =>{
        console.log(beneficiaryFormation);
        if (beneficiaryFormation !== undefined && beneficiaryFormation !== null) {
          this.allFormations.next(beneficiaryFormation)
        }
      },
    );
  }

  persist(beneficiaryFormation : BeneficiaryFormation){
    if(beneficiaryFormation.schoolRegistrationId != null){
      this.beneficiaryFormationsService.update(beneficiaryFormation).subscribe((_) =>
      {
        this.reset()
        this.notificationService.showMessage(
          'Inscription actualisée !',
          MessageType.Information
        );
      });
    } else {
      this.beneficiaryFormationsService.insert(beneficiaryFormation).subscribe((_) =>
      {
        console.log(beneficiaryFormation);
        this.reset()
        this.notificationService.showMessage(
          'Inscription ajoutée !',
          MessageType.Information
        );
      });
    }
  }

  delete(id : number){
    this.beneficiaryFormationsService.delete(id).subscribe((_) =>
    {
        this.reset()
        this.notificationService.showMessage(
          'Inscription supprimée !',
          MessageType.Information
        );
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      });
  }
}
