import { Injectable } from '@angular/core';
import { MessageType, Team, Teams} from '@frontend/api-interface';
import { TeamsService } from '@frontend/core-data';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';
import { NotificationService } from '../notification/notification.service';



@Injectable({
  providedIn: 'root'
})
export class TeamsFacadeService {
  private allTeams = new Subject<Teams>();
  private mutations = new Subject();

  allTeams$ = this.allTeams.asObservable();
  mutations$ = this.mutations.asObservable();

  public teamsListState = new MatTableState('name', 'asc', 5);

  constructor(
    private teamsService : TeamsService,
    private notificationService: NotificationService
    ) { }
  reset() {
    this.mutations.next(true);
  }

  loadServices(){
    this.teamsService
    .allTeams(1,10,'')
    .subscribe((teams: Teams) =>
      this.allTeams.next(teams)
    );
  }

  persist(team : Team){
    this.teamsService.upsert(team).subscribe((_) =>
    {
      const msg = (team.id == null) ? 'Team added !' : 'Team updated !';
      console.log(team.id);
      this.reset()
      this.notificationService.showMessage(
        msg,
        MessageType.Information
      );
    });
  }

  delete(id : number){
    this.teamsService.delete(id).subscribe(
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
