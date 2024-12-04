import { Injectable } from '@angular/core';
import { MessageType, StaffMember, StaffMembers,Users } from '@frontend/api-interface';
import { StaffMemberService } from '@frontend/core-data';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class StaffMembersFacadeService {
  private allStaffMembers = new Subject<StaffMembers>();
  private mutations = new Subject();
  private users = new Subject<Users>();
  private spinner = new Subject();

  allStaffMembers$ = this.allStaffMembers.asObservable();
  mutations$ = this.mutations.asObservable();
  users$ = this.users.asObservable();
  spinner$ = this.spinner.asObservable();

  public StaffMembersListState = new MatTableState('firstName', 'asc', 5);

  constructor(
    private StaffMemberService : StaffMemberService,
    private notificationService: NotificationService
    ) { }
  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, filter:string= '', orderby:string=''){
    this.StaffMemberService
    .getAll(pageNumber,pageSize,filter, orderby)
    .subscribe((StaffMembers: StaffMembers) => {
      this.allStaffMembers.next(StaffMembers)
    }
    );
  }

  persist(staffMember : StaffMember){
    this.StaffMemberService.upsert(staffMember).subscribe((_) => {
      this.reset()
      const msg = (staffMember.id == null) ? 'Staff member added !' : 'Staff member updated !';
      this.reset()
      this.notificationService.showMessage(
        msg,
        MessageType.Information
      );
    },
    (error) => {
      console.log(error);
      this.notificationService.showServerErrorNotification(error);
      this.reset()
    });
  }

  delete(id : number){
    this.StaffMemberService.delete(id).subscribe((_) => this.reset());
  }

  StaffMemberBySearch(text:string){
    this.StaffMemberService.getStaffMemberBySearch(text).subscribe(
      (users:Users) =>{
        if (users !== undefined && users !== null) {
          this.users.next(users);
          this.usersFounded();
        } else {
          const msg = 'User  doesn\'t !';
          this.notificationService.emitMessage({ Type: 'ERROR', Text: msg });
        }
      },
    );
  }

  usersFounded(){
    this.spinner.next(true);
  }
}
