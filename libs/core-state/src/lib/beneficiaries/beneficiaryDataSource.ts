import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BeneficiariesLookUp, BeneficiaryLookUp, Formations } from "@frontend/api-interface";
import { BeneficiariesService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class BeneficiaryDataSource implements DataSource<BeneficiaryLookUp> {

  private BeneficiariesSubject = new BehaviorSubject<BeneficiaryLookUp[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private nbrOfBeneficiaries = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfBeneficiaries$ = this.nbrOfBeneficiaries.asObservable();

  constructor(private beneficiariesService: BeneficiariesService) {}

  connect(collectionViewer: CollectionViewer): Observable<BeneficiaryLookUp[] | readonly BeneficiaryLookUp[]> {
    return this.BeneficiariesSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.BeneficiariesSubject.complete();
    //this.loadingSubject.complete();
  }
}
