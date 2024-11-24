import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BilanMv } from "@frontend/api-interface";
import { BilanService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class BilanDataSource implements DataSource<BilanMv.Bilan> {

  private bilansSubject = new BehaviorSubject<BilanMv.Bilan[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private allBilansAreNotDoneSubject = new BehaviorSubject<boolean>(false);
  private numberOfBilans = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public numberOfBilans$ = this.numberOfBilans.asObservable();
  public allBilansAreNotDoneSubject$ = this.allBilansAreNotDoneSubject.asObservable();

  constructor(private bilanService: BilanService) {}

  connect(collectionViewer: CollectionViewer): Observable<BilanMv.Bilan[] | readonly BilanMv.Bilan[]> {
    return this.bilansSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.bilansSubject.complete();
    //this.loadingSubject.complete();
  }

  loadBilans(pageNumber: number = 1, pageSize: number = 3, beneficiaryId: number, filter:string= ''){
    this.bilanService.getAll(pageNumber, pageSize,beneficiaryId, filter).subscribe(
      (bilanListVm:BilanMv.BilanListVm) =>{
        console.log(bilanListVm);
        if (bilanListVm !== undefined && bilanListVm !== null) {
          this.bilansSubject.next(bilanListVm.bilans)
          this.numberOfBilans.next(bilanListVm.totalCount);
        }
      },
    );
  }
}
