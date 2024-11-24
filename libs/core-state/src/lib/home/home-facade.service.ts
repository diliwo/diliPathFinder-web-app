import { Injectable } from '@angular/core';
import {  HomeService } from '@frontend/core-data';
import { Home } from '@frontend/api-interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';

@Injectable({
  providedIn: 'root'
})
export class HomeFacadeService {
  private getHomData = new Subject<Home>();
  private mutations = new Subject();
  private spinner = new Subject();
  getHomData$ = this.getHomData.asObservable();
  mutations$ = this.mutations.asObservable();
  spinner$ = this.spinner.asObservable();

  constructor(
    private homeService:HomeService
  ) { }
  reset() {
    this.mutations.next(true);
  }

  loadData(){
    this.homeService.get()
    .subscribe((homeData: Home) => {
      this.getHomData.next(homeData)
      this.dataLoaded();
      }
    );
  }


dataLoaded(){
    this.spinner.next(false);
  }
}
