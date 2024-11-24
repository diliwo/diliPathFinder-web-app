import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Support, SupportListVm } from "@frontend/api-interface";
import { SupportsService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class SupportDataSource implements DataSource<Support> {

  private supportsSubject = new BehaviorSubject<Support[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfSupports = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public numberOfSupports$ = this.numberOfSupports.asObservable();

  constructor(private supportsService: SupportsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Support[] | readonly Support[]> {
    return this.supportsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.supportsSubject.complete();
    //this.loadingSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, beneficiaryId: number){
    this.supportsService.getAll(pageNumber, pageSize, beneficiaryId).subscribe(
      (supportListVm:SupportListVm) =>{
        console.log(supportListVm);
        if (supportListVm !== undefined && supportListVm !== null) {
          this.supportsSubject.next(supportListVm.supports)
          this.numberOfSupports.next(supportListVm.totalCount);
        }
      },
    );
  }

}
