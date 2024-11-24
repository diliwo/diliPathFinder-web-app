import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Formation, Formations } from "@frontend/api-interface";
import { FormationsService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class FormationDataSource implements DataSource<Formation> {

  private formationsSubject = new BehaviorSubject<Formation[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfFormations = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfFormations$ = this.numberOfFormations.asObservable();

  constructor(private formationsService: FormationsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Formation[] | readonly Formation[]> {
    return this.formationsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.formationsSubject.complete();
    //this.loadingSubject.complete();
  }

  loadFormations(pageNumber: number = 1, pageSize: number = 3, filter:string= '', orderby:string=''){
    this.formationsService.getAll(pageNumber, pageSize, filter,orderby).subscribe(
      (formationListVm:Formations) =>{
        console.log(formationListVm);
        if (formationListVm !== undefined && formationListVm !== null) {
          this.formationsSubject.next(formationListVm.items)
          this.numberOfFormations.next(formationListVm.totalCount);
        }
      },
    );
  }

}
