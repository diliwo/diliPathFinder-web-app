import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MessageType, ServiceDetail, ServiceListVm, UpsertServiceDetailCommand} from '@frontend/api-interface';
import { ServicesIspService } from '@frontend/core-data';
import { BehaviorSubject, Observable } from 'rxjs';

export class ServicesDataSource implements DataSource<ServiceDetail> {

  private servicesSubject = new BehaviorSubject<ServiceDetail[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfServices = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfServices$ = this.numberOfServices.asObservable();

  constructor(
    private servicesIspService: ServicesIspService
    ) {}

  connect(collectionViewer: CollectionViewer): Observable<ServiceDetail[] | readonly ServiceDetail[]> {
    return this.servicesSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.servicesSubject.complete();
    this.loadingSubject.complete();
  }

  loadServices(pageNumber: number = 1, pageSize: number = 10, filter:string= '', orderby:string=''){
    this.loadingSubject.next(true);
    this.servicesIspService.allServices(pageNumber, pageSize, filter,orderby).subscribe(
      (serviceListVm:ServiceListVm) => {
        if (serviceListVm !== undefined && serviceListVm !== null) {
          this.servicesSubject.next(serviceListVm.services)
          this.numberOfServices.next(serviceListVm.totalCount);
          this.loadingSubject.next(false);
        }
      },
    );
  }
}
