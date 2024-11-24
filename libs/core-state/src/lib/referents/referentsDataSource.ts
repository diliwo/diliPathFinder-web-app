import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Referent, ReferentListVm } from "@frontend/api-interface";
import { ReferentService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class ReferentDataSource implements DataSource<Referent> {

  private referentsSubject = new BehaviorSubject<Referent[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfreferents = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfreferents$ = this.numberOfreferents.asObservable();

  constructor(private referentsService: ReferentService) {}

  connect(collectionViewer: CollectionViewer): Observable<Referent[] | readonly Referent[]> {
    return this.referentsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.referentsSubject.complete();
    //this.loadingSubject.complete();
  }

  loadReferents(pageNumber: number = 1, pageSize: number = 3, filter:string= '', orderby:string=''){
    this.referentsService.getAll(pageNumber, pageSize, filter,orderby).subscribe(
      (ReferentListVm:ReferentListVm) =>{
        console.log(ReferentListVm);
        if (ReferentListVm !== undefined && ReferentListVm !== null) {
          this.referentsSubject.next(ReferentListVm.referents)
          this.numberOfreferents.next(ReferentListVm.totalCount);
        }
      },
    );
  }

}
