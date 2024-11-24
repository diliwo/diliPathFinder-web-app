import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { MyJobCoachSupport, MyJobCoachSupportsList, MySupport, MySupportsList, SupportListVm } from "@frontend/api-interface";
import { SupportsService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class MyJobCoachSupportDataSource implements DataSource<MyJobCoachSupport> {

  private supportsSubject = new BehaviorSubject<MyJobCoachSupport[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfSupports = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public numberOfSupports$ = this.numberOfSupports.asObservable();

  constructor(private supportsService: SupportsService) {}

  connect(collectionViewer: CollectionViewer): Observable<MyJobCoachSupport[] | readonly MyJobCoachSupport[]> {
    return this.supportsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.supportsSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, filter: string, isActive = true, sortStatus:string=""){
    this.supportsService.getMyJoabCoachSupports(pageNumber, pageSize, filter,isActive, sortStatus).subscribe(
      (mySupportsList:MyJobCoachSupportsList) =>{
        console.log(mySupportsList);
        if (mySupportsList !== undefined && mySupportsList !== null) {
          this.supportsSubject.next(mySupportsList.myJobCoachSupportsList)
          this.numberOfSupports.next(mySupportsList.totalCount);
        }
      },
    );
  }

}
