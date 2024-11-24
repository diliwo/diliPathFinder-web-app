import { Injectable } from '@angular/core';
import { MessageType, ServiceDetail, ServiceListVm, UpsertServiceDetailCommand} from '@frontend/api-interface';
import { ServicesIspService } from '@frontend/core-data';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';
import { NotificationService } from '../notification/notification.service';



@Injectable({
  providedIn: 'root'
})
export class ServicesIspFacadeService {
  private allServices = new Subject<ServiceListVm>();
  private mutations = new Subject();

  allServices$ = this.allServices.asObservable();
  mutations$ = this.mutations.asObservable();

  public servicesIspListState = new MatTableState('name', 'asc', 5);

  constructor(
    private servicesIspService : ServicesIspService,
    private notificationService: NotificationService
    ) { }
  reset() {
    this.mutations.next(true);
  }

  loadServices(){
    this.servicesIspService
    .allServices(1,10,'')
    .subscribe((serviceListVm: ServiceListVm) =>
      this.allServices.next(serviceListVm)
    );
  }

  persist(upsertServiceDetailCommand : UpsertServiceDetailCommand){
    this.servicesIspService.upsert(upsertServiceDetailCommand).subscribe((_) =>
    {
      const msg = (upsertServiceDetailCommand.serviceId == null) ? 'Service ajouté !' : 'Service mis à jour !';
      console.log(upsertServiceDetailCommand.serviceId);
      this.reset()
      this.notificationService.showMessage(
        msg,
        MessageType.Information
      );
    });
  }

  delete(id : number){
    this.servicesIspService.delete(id).subscribe(
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
