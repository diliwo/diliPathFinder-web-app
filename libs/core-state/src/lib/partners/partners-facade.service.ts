import { Injectable } from '@angular/core';
import {  PartnersService } from '@frontend/core-data';
import { PartnersListVm, Partner, MessageType, PartnerSelections } from '@frontend/api-interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PartnersFacadeService {

  private allPartnersListVm = new Subject<PartnersListVm>();
  private partnersSelection = new Subject<PartnerSelections>();
  private selectedBeneficiary = new Subject<Partner>();
  private mutations = new Subject();

  public partnersListState = new MatTableState('name', 'asc', 5);

  allPartnersListVm$ = this.allPartnersListVm.asObservable();
  partnersSelection$ = this.partnersSelection.asObservable();

  mutations$ = this.mutations.asObservable();

  constructor(
    private partnersService: PartnersService,
    private notificationService: NotificationService
    ) { }

  loadPartners(pageNumber: number, pageSize: number, filter:string="", orderBy:string=""){
      this.partnersService
      .allPartners(pageNumber, pageSize, filter, orderBy)
      .subscribe((partnersListVm: PartnersListVm) => {
        if (partnersListVm !== undefined && partnersListVm !== null) {
          this.allPartnersListVm.next(partnersListVm);
        }
      }
    );
  }

  loadSelectionList(pageNumber: number, pageSize: number, filter:string="", orderBy:string=""){
    this.partnersService
    .GetPartnersSelection(pageNumber, pageSize, filter, orderBy)
    .subscribe((partnersname: PartnerSelections) => {
      if (partnersname !== undefined && partnersname !== null) {
        this.partnersSelection.next(partnersname);
      }
    }
  );
}

  persist(partner : Partner){
    this.partnersService.create(partner).subscribe((_) => {
      this.reset()
      console.log(partner.partnerId);
      this.reset()
      this.notificationService.showMessage(
        'Partenaire ajouté !',
        MessageType.Information
      );
    },
    (error) => {
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    });
  }

  update(partner : Partner){
    this.partnersService.update(partner).subscribe((_) => {
      this.reset()
      console.log(partner.partnerId);
      this.reset()
      this.notificationService.showMessage(
        'Partenaire mis à jour !',
        MessageType.Information
      );
    },
    (error) => {
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    });
  }


  delete(id : number){
    this.partnersService.delete(id).subscribe((_) => this.reset());
    //this.referentService.delete(id).subscribe((_) => this.reset());
  }

  reset() {
    this.mutations.next(true);
  }
}
