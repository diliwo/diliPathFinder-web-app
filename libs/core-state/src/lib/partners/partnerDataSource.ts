import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Partner, PartnersListVm } from '@frontend/api-interface';
import { PartnersService } from '@frontend/core-data';
import { BehaviorSubject, Observable } from 'rxjs';

export class PartnerDataSource implements DataSource<Partner> {

  private partnersSubject = new BehaviorSubject<Partner[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfPartners = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfParters$ = this.numberOfPartners.asObservable();

  constructor(
    private partnersService: PartnersService
    ) {}

  connect(collectionViewer: CollectionViewer): Observable<Partner[] | readonly Partner[]> {
    return this.partnersSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.partnersSubject.complete();
    this.loadingSubject.complete();
  }

  loadPartners(pageNumber: number = 1, pageSize: number = 3, filter:string= '', orderBy:string=""){
    this.loadingSubject.next(true);
    this.partnersService.allPartners(pageNumber, pageSize, filter, orderBy).subscribe(
      (PartnersListVm:PartnersListVm) => {
        if (PartnersListVm !== undefined && PartnersListVm !== null) {
          this.partnersSubject.next(PartnersListVm.partners)
          this.numberOfPartners.next(PartnersListVm.totalCount);
          this.loadingSubject.next(false);
        }
      },
    );
  }
}
