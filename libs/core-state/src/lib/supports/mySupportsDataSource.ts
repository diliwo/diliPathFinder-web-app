import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { MySupport, MySupportsList, SupportListVm } from "@frontend/api-interface";
import { SupportsService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class MySupportDataSource implements DataSource<MySupport> {

  private supportsSubject = new BehaviorSubject<MySupport[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfSupports = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public numberOfSupports$ = this.numberOfSupports.asObservable();
  public supportsSubject$ = this.supportsSubject.asObservable();

  constructor(private supportsService: SupportsService) {}

  connect(collectionViewer: CollectionViewer): Observable<MySupport[] | readonly MySupport[]> {
    return this.supportsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.supportsSubject.complete();
    //this.loadingSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, filter: string, isActive: boolean, sortStatus:string=""){
    console.log(sortStatus);
    this.supportsService.getMySupports(pageNumber, pageSize, filter,isActive,sortStatus).subscribe(
      (mySupportsList:MySupportsList) =>{
        console.log(mySupportsList);
        if (mySupportsList !== undefined && mySupportsList !== null) {
          this.supportsSubject.next(mySupportsList.mySupportsList)
          this.numberOfSupports.next(mySupportsList.totalCount);
        }
      },
    );
  }

}
