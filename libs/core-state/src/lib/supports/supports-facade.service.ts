import { Injectable } from '@angular/core';
import { SupportsService, BeneficiariesService } from '@frontend/core-data';
import { SupportListVm, SupportDetail, Support, MessageType, MySupport, MySupportsList, MyJobCoachSupportsList, ReasonOfClosures } from '@frontend/api-interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';
import { NotificationService } from '../notification/notification.service';


@Injectable({
  providedIn: 'root'
})
export class SupportsFacadeService {
  private allSupportsByclient = new Subject<SupportListVm>();
  private reasons = new Subject<ReasonOfClosures>();
  private supportsByStaffMembers = new Subject<MySupportsList>();
  private supportsByJobCoach = new Subject<MyJobCoachSupportsList>();
  private allSupports = new Subject<SupportListVm>();

  private mutations = new Subject();
  public supportsState = new MatTableState('startdate', 'asc', 5);

  allSupportsByclient$ = this.allSupportsByclient.asObservable();
  reasons$ = this.reasons.asObservable();
  supportsByStaffMembers$ = this.supportsByStaffMembers.asObservable();
  supportsByJobCoach$ = this.supportsByJobCoach.asObservable();
  allSupports$ = this.allSupports.asObservable();

  mutations$ = this.mutations.asObservable();

  constructor(
    private supportsService: SupportsService,
    private notificationService: NotificationService
    ) { }
  reset() {
    this.mutations.next(true);
  }

    load(pageNumber: number, pageSize: number, clientId: number){
      this.supportsService
      .getAll(pageNumber, pageSize, clientId)
      .subscribe((supportListVm: SupportListVm) => {
        console.log(supportListVm);
        this.allSupportsByclient.next(supportListVm)
      }

    );
  }

  loadMySupports(pageNumber: number, pageSize: number, filter: string){
    this.supportsService
    .getMySupports(pageNumber, pageSize, filter)
    .subscribe((mySupportsList: MySupportsList) => {
      console.log(mySupportsList);
      this.supportsByStaffMembers.next(mySupportsList)
    }

  );
}

loadMyJobCoachSupports(pageNumber: number, pageSize: number, filter: string){
    this.supportsService
    .getMyJoabCoachSupports(pageNumber, pageSize, filter)
    .subscribe((myJobCoachSupportsList: MyJobCoachSupportsList) => {
      console.log(myJobCoachSupportsList);
      this.supportsByJobCoach.next(myJobCoachSupportsList)
    }
  );
}

  loadSupports(){
    this.supportsService
    .allSupports()
    .subscribe((supportListVm: SupportListVm) => {
      this.allSupports.next(supportListVm)
    });
  }

  persist(support : Support){
    this.supportsService.upsert(support).subscribe((_) => {
      console.log('Support saved');
      this.reset()

      let msg = "Accompagnement ajouté !";

      if(support.supportId){
        msg = "Accompagnement modifié !";
      }
      this.notificationService.showMessage(
        msg,
        MessageType.Information
      );
    },
    (error) => {
      console.log(error);
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    }
    );
  }

  close(support : Support){
    this.supportsService.close(support).subscribe((_) => {
      console.log('Support saved');
      this.reset()

      this.notificationService.showMessage(
        "Aide clôturée !",
        MessageType.Information
      );
    },
    (error) => {
      console.log(error);
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    }
    );
  }

  delete(id : number){
    this.supportsService.delete(id).subscribe((_) => {
      this.reset()
    },
    (error) => {
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    });
  }

  loadreasons(){
    this.supportsService.getReasons().subscribe((listOfreasons: ReasonOfClosures) => {
      this.reasons.next(listOfreasons)
    });
  }
}
