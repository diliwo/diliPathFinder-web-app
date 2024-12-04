import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { StaffMember, StaffMembers } from "@frontend/api-interface";
import { StaffMemberService } from "@frontend/core-data";
import { BehaviorSubject, Observable } from "rxjs";

export class StaffMemberDataSource implements DataSource<StaffMember> {

  private staffMembersSubject = new BehaviorSubject<StaffMember[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfStaffMembers = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfStaffMembers$ = this.numberOfStaffMembers.asObservable();

  constructor(private StaffMembersService: StaffMemberService) {}

  connect(collectionViewer: CollectionViewer): Observable<StaffMember[] | readonly StaffMember[]> {
    return this.staffMembersSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.staffMembersSubject.complete();
    //this.loadingSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 3, filter:string= '', orderby:string=''){
    this.StaffMembersService.getAll(pageNumber, pageSize, filter,orderby).subscribe(
      (staffMembers:StaffMembers) =>{
        console.log(staffMembers);
        if (staffMembers !== undefined && staffMembers !== null) {
          this.staffMembersSubject.next(staffMembers.StaffMembers)
          this.numberOfStaffMembers.next(staffMembers.totalCount);
        }
      },
    );
  }

}
