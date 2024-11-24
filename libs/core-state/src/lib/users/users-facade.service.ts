import { Injectable } from '@angular/core';
import { UserService } from '@frontend/core-data';
import { User } from '@frontend/api-interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';

@Injectable({
  providedIn: 'root'
})
export class UsersFacadeService {
  private getUsersData = new Subject<User[]>();
  private mutations = new Subject();
  private spinner = new Subject();
  getUsersData$ = this.getUsersData.asObservable();
  mutations$ = this.mutations.asObservable();
  spinner$ = this.spinner.asObservable();

  constructor(
    private usersService:UserService
  ) { }
  reset() {
    this.mutations.next(true);
  }

  getUsers(searchText: string){
    this.usersService.getUsers(searchText).subscribe((users:User[])=>{
      if(users != null){
        this.getUsersData.next(users);
      }
    });
  }


dataLoaded(){
    this.spinner.next(false);
  }
}
