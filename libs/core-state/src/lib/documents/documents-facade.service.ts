import { Injectable } from '@angular/core';
import {  DocumentsService } from '@frontend/core-data';
import { JobsListVm, JobDetail, DocumentDetail, DocumentListVm, MessageType, RequestStatus } from '@frontend/api-interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatTableState } from '@frontend/material';
import { NotificationService } from '../notification/notification.service';
import { FileHelperService } from '../common/file-helper.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsFacadeService {
  private mutations = new Subject();
  private allDocumentsByPartnerIdAndJobId = new Subject<DocumentListVm>();
  downloadFileRequestStatus: Subject<RequestStatus> = new Subject<RequestStatus>();

  allDocumentsByPartnerIdAndJobId$ = this.allDocumentsByPartnerIdAndJobId.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
  private documentsService : DocumentsService,
  private fileHelper: FileHelperService,
  private notificationService: NotificationService
  ) {

  }
  reset() {
    this.mutations.next(true);
  }

  save(documentDetail : DocumentDetail){
    this.notificationService.showMessage(
      'Le document ' + documentDetail.description + 'a été enregistré avec succès !',
      MessageType.Information
    );
    this.documentsService.save(documentDetail).subscribe((_) => this.reset());
  }

  loadDocumentsByPartnerIdAndJobId(partnerId : number, jobId: number){
    this.documentsService
    .GetDocumentsByJobIAndPartnerId(partnerId,jobId)
    .subscribe((documentListVm: DocumentListVm) => {
      console.log(documentListVm);
      this.allDocumentsByPartnerIdAndJobId.next(documentListVm)
    }
  );
}

  openSelectedDocument(documentDetail: DocumentDetail){
    console.log(documentDetail);
    this.documentsService.GetDocumentByJobIAndPartnerId(documentDetail.partnerId, documentDetail.jobId, documentDetail.documentId)
    .subscribe(
      (result: any) => {
        console.log(result);
        const name = documentDetail.description+'.'+documentDetail.contentType;
        this.fileHelper.openFileOrSaveFromArrayBuffer(result,name);
        // this.notificationService.showMessage(
        //   'Le fichier ' + name + ' a été téléchargé avec succès',
        //   MessageType.Success
        // );
        this.reset();
    },
    (error) => {
      console.log(error);
      this.notificationService.showServerErrorNotification(error);
      this.downloadFileRequestStatus.next(RequestStatus.Failed);
    }
    );
    this.downloadFileRequestStatus.next(RequestStatus.Done);
  }

  deleteDocument(id : number){
    this.documentsService.deleteDocument(id)
    .subscribe(
      (result: any) => {
        this.notificationService.showMessage("Le document a été supprimé", MessageType.Success);
      },
      (error) => {
        console.log(error);
        this.notificationService.showServerErrorNotification(error);
      });
  }
}
