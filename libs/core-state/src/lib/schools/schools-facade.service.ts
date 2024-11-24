import { Injectable } from '@angular/core';
import { School, SchoolListVm,MessageType } from '@frontend/api-interface';
import { SchoolsService } from '@frontend/core-data';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})

export class SchoolsFacadeService {
  private allSchools = new Subject<SchoolListVm>();
  private mutations = new Subject();

  allSchools$ = this.allSchools.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private schoolsService : SchoolsService,
    private notificationService: NotificationService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  loadSchools(pageNumber: number, pageSize: number, filter:string, order:string){
    this.schoolsService.allSchools(pageNumber, pageSize, filter,order).subscribe(
      (schoolListVm:SchoolListVm) =>{
        console.log(schoolListVm);
        if (schoolListVm !== undefined && schoolListVm !== null) {
          this.allSchools.next(schoolListVm)
        }
      },
    );
  }

  persist(school : School){
    if(school.schoolId != null){
      this.schoolsService.update(school).subscribe((_) =>
      {
        console.log(school.schoolId);
        this.reset()
        this.notificationService.showMessage(
          'Ecole actualisée !',
          MessageType.Information
        );
      });
    } else {
      this.schoolsService.insert(school).subscribe((_) =>
      {
        console.log(school.schoolId);
        this.reset()
        this.notificationService.showMessage(
          'Ecole ajoutée !',
          MessageType.Information
        );
      });
    }
  }

  delete(id : number){
    this.schoolsService.delete(id).subscribe(
      (_) => {
        this.reset()
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      }
      );
  }
}
