import { Injectable } from '@angular/core';
import { BilanMv, MessageType, RequestStatus,DocumentDetail} from '@frontend/api-interface';
import { BilanService } from '@frontend/core-data';
import { result } from 'lodash-es';
import { BehaviorSubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FileHelperService } from '../common/file-helper.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class BilansFacadeService {

  private bilans = new Subject<BilanMv.BilanListVm>();
  private archivedBilans = new Subject<BilanMv.BilanListVm>();
  private currentBilan = new Subject<BilanMv.Bilan>();
  private lastBilan = new Subject<BilanMv.Bilan>();
  private mutations = new Subject();
  private _isDead$ = new Subject();
  private allBilansAreNotDoneSubject = new BehaviorSubject<boolean>(false);
  public allBilansAreNotDoneSubject$ = this.allBilansAreNotDoneSubject.asObservable();

  bilans$ = this.bilans.asObservable();
  currentBilan$ = this.currentBilan.asObservable()
  lastBilan$ = this.lastBilan.asObservable();
  archivedBilans$ = this.archivedBilans.asObservable();
  mutations$ = this.mutations.asObservable();
  downloadFileRequestStatus: Subject<RequestStatus> = new Subject<RequestStatus>();

  constructor(
    private bilanService : BilanService,
    private notificationService: NotificationService,
    private fileHelper: FileHelperService,
  ) {}

  reset() {
    this.mutations.next(true);
  }

  load(pageNumber: number, pageSize: number, beneficiaryId: number,filter:string=''){
    this.bilanService.getAll(pageNumber, pageSize, beneficiaryId, filter).subscribe(
      (bilanListVm: BilanMv.BilanListVm) =>{
        console.log(bilanListVm);
        if (bilanListVm !== undefined && bilanListVm !== null) {
          this.bilans.next(bilanListVm)
        }
      }
    );
  }

  loadAllBeneficiaryBilans( beneficiaryId: number, pageNumber: number = 1, pageSize: number = 100,filter:string= ''){
    this.bilanService.getAll(pageNumber, pageSize,beneficiaryId, filter).subscribe(
      (bilanListVm:BilanMv.BilanListVm) =>{
        console.log(bilanListVm);
        if (bilanListVm !== undefined && bilanListVm !== null) {
          this.allBilansAreNotDoneSubject.next(bilanListVm.bilans.filter(b => b.isFinalized == false).length > 0 ? true : false);
        }
      },
    );
  }

  loadArchived(pageNumber: number, pageSize: number, filter:string=''){
    this.bilanService.getAllArchived(pageNumber, pageSize, filter).subscribe(
      (bilanListVm: BilanMv.BilanListVm) =>{
        console.log(bilanListVm);
        if (bilanListVm !== undefined && bilanListVm !== null) {
          this.archivedBilans.next(bilanListVm)
        }
      }
    );
  }

  loadCurrrent(beneficiaryId : number){
    this.bilanService.getCurrentBilan(beneficiaryId).subscribe((bilan: BilanMv.Bilan) => {
      this.currentBilan.next(bilan);
    });
  }

  loadLast(beneficiaryId : number){
    return this.bilanService.getLastBilan(beneficiaryId).pipe(takeUntil(this._isDead$));
  }

  killLoadLast(){
    this._isDead$.next(true);
    this._isDead$.complete();
  }

  persist(bilan : BilanMv.Bilan){
    if(bilan.bilanId != null){
      this.bilanService.update(bilan).subscribe((_) =>
      {
        console.log(bilan.bilanId);
        this.reset()
        this.notificationService.showMessage(
          'Bilan actualisé !',
          MessageType.Information
        );
      });
    } else {
      this.bilanService.insert(bilan).subscribe((_) =>
      {
        console.log(bilan.bilanId);
        this.reset()
        this.notificationService.showMessage(
          'Bilan ajouté !',
          MessageType.Information
        );
      },
      (error) => {
        console.log(error);
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      }
      );
    }
  }

  delete(id : number){
    this.bilanService.delete(id).subscribe(
      (_) => {
        this.reset()
      },
      (error) => {
        this.notificationService.showServerErrorNotification(error);
        this.reset()
      });
  }

  finalize(id : number){
    this.bilanService.finalize(id).subscribe(
      (_) => {
        this.notificationService.showMessage(
          'Bilan finalisé !',
          MessageType.Information
        );
        this.reset()
      }
      , (error) => {
        //this.notificationService.showServerErrorNotification(error);
        this.reset()
      }
    );
  }

  getDocument(documentDetail: DocumentDetail){
    this.bilanService.GetDocument(documentDetail.bilanId).subscribe(
      (result: any) => {
        const name = documentDetail.description+'.'+documentDetail.contentType;
        this.fileHelper.openFileOrSaveFromArrayBuffer(result,name);
    },
    (error) => {
      this.notificationService.showServerErrorNotification(error);
      this.downloadFileRequestStatus.next(RequestStatus.Failed);
      this.reset()
    }
    );
    this.downloadFileRequestStatus.next(RequestStatus.Done);
  }
}
