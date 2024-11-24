import { Injectable } from '@angular/core';
import { MessageType, Referent, ReferentListVm, UpsertReferenceCommand, Users } from '@frontend/api-interface';
import { ReferentService } from '@frontend/core-data';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ReferentFacadeService {
  private allReferents = new Subject<ReferentListVm>();
  private mutations = new Subject();
  private users = new Subject<Users>();
  private spinner = new Subject();

  allReferents$ = this.allReferents.asObservable();
  mutations$ = this.mutations.asObservable();
  users$ = this.users.asObservable();
  spinner$ = this.spinner.asObservable();

  public referentsListState = new MatTableState('firstName', 'asc', 5);

  constructor(
    private referentService : ReferentService,
    private notificationService: NotificationService
    ) { }
  reset() {
    this.mutations.next(true);
  }

  loadReferents(pageNumber: number, pageSize: number, filter:string= '', orderby:string=''){
    this.referentService
    .getAll(pageNumber,pageSize,filter, orderby)
    .subscribe((referentListVm: ReferentListVm) => {
      this.allReferents.next(referentListVm)
    }
    );
  }

  persist(upsertReferenceCommand : UpsertReferenceCommand){
    this.referentService.upsert(upsertReferenceCommand).subscribe((_) => {
      this.reset()
      const msg = (upsertReferenceCommand.referentId == null) ? 'Référent ajouté !' : 'Réferent mis à jour !';
      this.reset()
      this.notificationService.showMessage(
        msg,
        MessageType.Information
      );
    },
    (error) => {
      console.log(error);
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    });
  }

  delete(id : number){
    this.referentService.delete(id).subscribe((_) => this.reset());
  }

  referentBySearch(text:string){
    this.referentService.getReferentBySearch(text).subscribe(
      (users:Users) =>{
        if (users !== undefined && users !== null) {
          this.users.next(users);
          this.usersFounded();
        } else {
          const msg = 'Utilisateur introuvable !';
          this.notificationService.emitMessage({ Type: 'ERROR', Text: msg });
        }
      },
    );
  }

  usersFounded(){
    this.spinner.next(true);
  }
}
