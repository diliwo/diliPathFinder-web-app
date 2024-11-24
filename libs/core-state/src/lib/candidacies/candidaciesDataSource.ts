import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Candidacy, CandidaciesListVm } from "@frontend/api-interface";
import { CandidaciesService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class CandidacyDataSource implements DataSource<Candidacy> {

  private candidaciesSubject = new BehaviorSubject<Candidacy[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfCandidacies = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public numberOfCandidacies$ = this.numberOfCandidacies.asObservable();

  constructor(private candidaciesService: CandidaciesService) {}

  connect(collectionViewer: CollectionViewer): Observable<Candidacy[] | readonly Candidacy[]> {
    return this.candidaciesSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.candidaciesSubject.complete();
    //this.loadingSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, beneficiaryId: number){
    this.candidaciesService.getAll(pageNumber, pageSize, beneficiaryId).subscribe(
      (candidaciesListVm:CandidaciesListVm) =>{
        console.log(candidaciesListVm);
        if (candidaciesListVm !== undefined && candidaciesListVm !== null) {
          this.candidaciesSubject.next(candidaciesListVm.candidacies)
          this.numberOfCandidacies.next(candidaciesListVm.totalCount);
        }
      },
    );
  }

}
