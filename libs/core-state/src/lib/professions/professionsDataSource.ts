import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ProfessionMv} from '@frontend/api-interface';
import { ProfessionsService} from '@frontend/core-data';
import { BehaviorSubject, Observable } from 'rxjs';

export class ProfessionsDataSource implements DataSource<ProfessionMv.Profession> {

  private professionsSubject = new BehaviorSubject<ProfessionMv.Profession[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfProfessions = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfProfessions$ = this.numberOfProfessions.asObservable();

  constructor(
    private professionsService: ProfessionsService
    ) {}

  connect(collectionViewer: CollectionViewer): Observable<ProfessionMv.Profession[] | readonly ProfessionMv.Profession[]> {
    return this.professionsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.professionsSubject.complete();
    this.loadingSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 10, filter:string= '', orderBy:string=""){
    this.loadingSubject.next(true);
    this.professionsService.getall(pageNumber, pageSize, filter, orderBy).subscribe(
      (professionList: ProfessionMv.ProfessionList) => {
        if (professionList !== undefined && professionList !== null) {
          this.professionsSubject.next(professionList.professions)
          this.numberOfProfessions.next(professionList.totalCount);
          this.loadingSubject.next(false);
        }
      },
    );
  }
}
