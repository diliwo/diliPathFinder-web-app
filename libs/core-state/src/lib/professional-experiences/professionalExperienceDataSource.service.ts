import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { ProfessionnalExperience, ProfessionnalExperiences } from "@frontend/api-interface";
import { ProfessionalExperiencesService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProfessionalExperienceDataSourceService implements DataSource<ProfessionnalExperience> {
  private professionnalExperienceSubject = new BehaviorSubject<ProfessionnalExperience[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfExperiences = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public numberOfExperiences$ = this.numberOfExperiences.asObservable();

  constructor(private professionalExperiencesService: ProfessionalExperiencesService) {}

  connect(collectionViewer: CollectionViewer): Observable<ProfessionnalExperience[] | readonly ProfessionnalExperience[]> {
    return this.professionnalExperienceSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.professionnalExperienceSubject.complete();
    this.loadingSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, client:string,filter:string= ''){
    this.loadingSubject.next(true);
    this.professionalExperiencesService.getAll(pageNumber, pageSize,client, filter).subscribe(
      (ProfessionnalExperiences: ProfessionnalExperiences) =>{
        if (ProfessionnalExperiences !== undefined && ProfessionnalExperiences !== null) {
          this.professionnalExperienceSubject.next(ProfessionnalExperiences.professionnalExperiences)
          this.numberOfExperiences.next(ProfessionnalExperiences.totalCount);
          this.loadingSubject.next(false);
        }
      },
    );
  }
}
