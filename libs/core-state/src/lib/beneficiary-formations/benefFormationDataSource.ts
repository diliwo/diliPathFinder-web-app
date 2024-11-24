import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BeneficiaryFormation, BeneficiaryFormationListVm } from "@frontend/api-interface";
import { BeneficiaryFormationsService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class BenefFormationDataSource implements DataSource<BeneficiaryFormation> {

  private registrationsSubject = new BehaviorSubject<BeneficiaryFormation[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfFormations = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfFormations$ = this.numberOfFormations.asObservable();

  constructor(private beneficiaryFormationsService: BeneficiaryFormationsService) {}

  connect(collectionViewer: CollectionViewer): Observable<BeneficiaryFormation[] | readonly BeneficiaryFormation[]> {
    return this.registrationsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.registrationsSubject.complete();
    //this.loadingSubject.complete();
  }

  loadRegistrations(pageNumber: number = 1, pageSize: number = 3, beneficiaryId:number,filter:string='', orderBy:string=''){
    this.beneficiaryFormationsService.getAll(pageNumber, pageSize, beneficiaryId, filter,orderBy).subscribe(
      (beneficiaryFormation:BeneficiaryFormationListVm) =>{
        console.log(beneficiaryFormation);
        if (beneficiaryFormation !== undefined && beneficiaryFormation !== null) {
          this.registrationsSubject.next(beneficiaryFormation.registrations)
          this.numberOfFormations.next(beneficiaryFormation.totalCount);
        }
      },
    );
  }

}
