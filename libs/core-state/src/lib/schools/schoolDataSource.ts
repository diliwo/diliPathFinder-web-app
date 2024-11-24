import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { School, SchoolListVm } from "@frontend/api-interface";
import { SchoolsService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class SchoolDataSource implements DataSource<School> {

  private schoolsSubject = new BehaviorSubject<School[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfSchools = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfSchools$ = this.numberOfSchools.asObservable();

  constructor(private schoolsService: SchoolsService) {}

  connect(collectionViewer: CollectionViewer): Observable<School[] | readonly School[]> {
    return this.schoolsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.schoolsSubject.complete();
    //this.loadingSubject.complete();
  }

  loadSchools(pageNumber: number = 1, pageSize: number = 3, filter:string= '', orderby:string=''){
    this.schoolsService.allSchools(pageNumber, pageSize, filter,orderby).subscribe(
      (schoolListVm:SchoolListVm) =>{
        console.log(schoolListVm);
        if (schoolListVm !== undefined && schoolListVm !== null) {
          this.schoolsSubject.next(schoolListVm.schools)
          this.numberOfSchools.next(schoolListVm.totalCount);
        }
      },
    );
  }

}
