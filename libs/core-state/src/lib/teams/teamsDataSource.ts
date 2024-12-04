import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MessageType, Team, Teams} from '@frontend/api-interface';
import { TeamsService } from '@frontend/core-data';
import { BehaviorSubject, Observable } from 'rxjs';

export class TeamsDataSource implements DataSource<Team> {

  private teamsSubject = new BehaviorSubject<Team[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private numberOfServices = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public nbrOfTeams$ = this.numberOfServices.asObservable();

  constructor(
    private teamsService: TeamsService
    ) {}

  connect(collectionViewer: CollectionViewer): Observable<Team[] | readonly Team[]> {
    return this.teamsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.teamsSubject.complete();
    this.loadingSubject.complete();
  }

  load(pageNumber: number = 1, pageSize: number = 10, filter:string= '', orderby:string=''){
    this.loadingSubject.next(true);
    this.teamsService.allTeams(pageNumber, pageSize, filter,orderby).subscribe(
      (teams:Teams) => {
        if (teams !== undefined && teams !== null) {
          this.teamsSubject.next(teams.teams);
          this.numberOfServices.next(teams.totalCount);
          this.loadingSubject.next(false);
        }
      },
    );
  }
}
