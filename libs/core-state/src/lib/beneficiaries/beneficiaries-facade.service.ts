import { Injectable } from '@angular/core';
import { BeneficiariesService } from '@frontend/core-data';
import { BeneficiariesLookUp, BeneficiaryDetail, BeneficiaryLookUp, MessageType } from '@frontend/api-interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';
import { MatTableState } from '@frontend/material';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesFacade {
  private allBeneficiariesLookUp = new Subject<BeneficiariesLookUp>();
  private selectedBeneficiary = new Subject<BeneficiaryDetail>();
  private mutations = new Subject();
  private imported = new Subject();
  private newNiss = new Subject<string>();
  private spinner = new Subject();
  public beneficiaryState = new MatTableState('name', 'asc', 5);

  allBeneficiariesLookUp$ = this.allBeneficiariesLookUp.asObservable();
  selectedBeneficiary$ = this.selectedBeneficiary.asObservable();
  mutations$ = this.mutations.asObservable().pipe(take(1));
  imported$ = this.imported.asObservable();
  newNiss$ = this.newNiss.asObservable();
  spinner$ = this.spinner.asObservable();

  constructor(
    private beneficiariesService: BeneficiariesService,
    private notificationService: NotificationService
    ) { }
  reset() {
    this.mutations.next(true);
  }

beneficiariesFounded(){
  this.spinner.next(true);
}

  import(){
    this.imported.next(true);
  }

  getNewNiss(niss: string){
    this.newNiss.next(niss);
  }
  loadBeneficiaries(){
    this.beneficiariesService
    .allBeneficiariesLookUp()
    .subscribe((beneficiariesLookUp: BeneficiariesLookUp) =>
      this.allBeneficiariesLookUp.next(beneficiariesLookUp)
    );
  }

  selectBeneficiary(niss: string) {
    let nissApi : string = null;
    nissApi = niss;
    this.beneficiariesService.getBeneficiaryByNiss(nissApi).subscribe((beneficiaryDetail : BeneficiaryDetail) =>
      this.selectedBeneficiary.next(beneficiaryDetail)
    );
  }

  beneficiaryBySearch(text:string){
    this.beneficiariesService.getBeneficiaryBySearch(text).subscribe(
      (beneficiariesLookUp:BeneficiariesLookUp) =>{
        console.log(beneficiariesLookUp);
        if (beneficiariesLookUp !== undefined && beneficiariesLookUp !== null) {
          this.allBeneficiariesLookUp.next(beneficiariesLookUp)
          this.beneficiariesFounded();
        } else {
          const msg = 'Bénéficiaire introuvable !';
          this.notificationService.emitMessage({ Type: 'ERROR', Text: msg });
        }
      },
    );
  }

  importBeneficiary(niss: string, newBeneficiary: boolean){
    this.beneficiariesService.import(niss).subscribe((id:number) =>
    {
      let msg = "Bénéficiaire mis à jour !";
      if(id > 0){
        if(newBeneficiary){
            this.import();
            this.getNewNiss(niss);
            msg = "Bénéficiaire importé !";
        }else {
          this.reset();
        }
      } else {
        msg = "Le bénéficiaire n'existe pas !";
      }

      this.notificationService.showMessage(
        msg,
        MessageType.Information
      );
    },
    (error) => {
      this.notificationService.showServerErrorNotification(error);
    }
    );
  }

  updateNativeLanguage(data : any){
    this.beneficiariesService.updateLanguage(data.niss, data.nativeLanguage).subscribe(
      (_) => {
        this.reset()
        this.notificationService.showMessage(
          'Langue maternelle modifiée !',
          MessageType.Information
        );
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
      }
      );
  }

  updateIbisNumber(data : any, niss: string){
    this.beneficiariesService.updateIbisNumber(data, niss).subscribe(
      (_) => {
        this.reset()
        this.notificationService.showMessage(
          'Nouveau numéro IBIS ajouté !',
          MessageType.Information
        );
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
      }
      );
  }

  detroy(){
   this.mutations.unsubscribe();
  }

  load(pageNumber: number, pageSize: number, filter:string){
    this.beneficiariesService.getAll(pageNumber, pageSize, filter).subscribe(
      (beneficiariesLookUp:BeneficiariesLookUp) =>{
        console.log(beneficiariesLookUp);
        if (beneficiariesLookUp !== undefined && beneficiariesLookUp !== null) {
          this.allBeneficiariesLookUp.next(beneficiariesLookUp)
        }
      },
    );
  }

  refreshMyBeneficiaries(data : string[]){
    this.beneficiariesService.refreshBeneficiaries(data).subscribe((_) => {
      this.reset()
      const msg = "Dossiers mis à jour !";
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
}
