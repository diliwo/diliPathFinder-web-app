import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validators,FormBuilder,FormControl } from '@angular/forms';
import { JobDetail, JobsListVm, Reward, StatusOfJobOffer, CategoryOfJob,TypeOfJob, DocumentDetail, DocumentListVm } from '@frontend/api-interface';
import { DocumentsFacadeService, JobsFacadeService, NotificationService } from '@frontend/core-state';
import * as _ from 'lodash-es';
import { Observable } from 'rxjs';

export function fileSizeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tooBig = control.value.size > (5 * 1024 * 1024);
    return tooBig ? { fileSizeTooBig: true } : null;
  };
}

@Component({
  selector: 'frontend-job-files-box',
  templateUrl: './job-files-box.component.html',
  styleUrls: ['./job-files-box.component.scss']
})
export class JobFilesBoxComponent implements OnInit {
  allDocumentsJob$: Observable<DocumentListVm> = this.documentsFacadeService.allDocumentsByPartnerIdAndJobId$

  selectedFile: any;
  newFileName: any;
  documentFile: DocumentDetail;
  fileIsTooBig: boolean;
  pdfSrc: any;

  public frm: FormGroup;
  ctlselectedFile:FormControl;
  ctldescription:FormControl;

  // ctlselectedFile = new FormControl('', [Validators.required, fileSizeValidator()]);
  // ctldescription = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<JobFilesBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { documentDetail: DocumentDetail },
    private fb: FormBuilder,
    private documentsFacadeService : DocumentsFacadeService,
    private notificationService : NotificationService
  ) {
    this.ctlselectedFile = this.fb.control('',[Validators.required, fileSizeValidator()]);
    this.ctldescription = this.fb.control('',[Validators.required]);

    this.selectedFile = { name: '', type: 'none' };
    this.newFileName = { partnerId: '', jobId: '' }
    this.frm = this.fb.group({
      documentId: data.documentDetail.documentId,
      jobId: data.documentDetail.jobId,
      partnerId: data.documentDetail.partnerId,
      name: data.documentDetail.name,
      description: this.ctldescription,
      contentType: data.documentDetail.contentType,
      contentFile: data.documentDetail.contentFile
    });

    this.newFileName.partnerId = data.documentDetail.partnerId;
    this.newFileName.jobId = data.documentDetail.jobId;

    this.frm.get("name").patchValue(data.documentDetail.name);
    this.frm.get("description").patchValue(data.documentDetail.description);
    this.frm.get("contentType").patchValue(data.documentDetail.contentType);
    this.frm.get("contentFile").patchValue(data.documentDetail.contentFile);
  }
  ngOnInit(): void {
    this.reset()
    this.documentsFacadeService.mutations$.subscribe((_) => this.reset());
  }

  reset(){
    console.log(this.newFileName.partnerId+" - "+this.newFileName.jobId);
    this.loadDocumentsByPartnerIdAndJobId(this.newFileName.partnerId,this.newFileName.jobId);
  }

  onFileChange(event) {
    this.ctlselectedFile.setValue(event.target.files[0]);
    const filesType = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']; //Seuls formats acceptés: jpeg, jpg, png et pdf

    const fileType = event.target.files[0].type;
    if (filesType.includes(fileType)) {
      this.selectedFile = event.target.files[0];
      this.frm.get("name").setValue('Document-'+ this.newFileName.partnerId + '-' + this.newFileName.jobId+'-0');
      this.convertToBase64(this.selectedFile).subscribe(fileBase64 => {
        this.frm.get("contentFile").setValue(fileBase64.base64Content);
      });
    }
    else {
      this.notificationService.emitMessage({ Type: 'ERROR', Text: "Ce type de fichier n'est pas autorisé !" });
      console.log(">>> onFileChange - Ce type de fichier ( " + fileType + ") n'est pas autorisé.");
    }
  }

  convertToBase64(file: any): Observable<any> {
    return Observable.create(observer => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convertir vers base64
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        const fileType = file.type.split('/')[1];
        console.log(fileType);
        this.frm.get("contentType").setValue(fileType);
        const fileContent = reader.result.toString().split(',')[1];
        const docFile = {
          fileType: fileType, base64Content: fileContent
        };
        observer.next(docFile);
      };
    });
  }

  getErrorMessage() {
    if (this.ctlselectedFile.hasError('required')) {
      return 'Vous devez choisir un fichier';
    }
    if (this.ctlselectedFile.hasError('fileSizeTooBig')) {
      return 'ce fichier est trop gros, veuillez en choisir un plus petit !';
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    console.log(controlName);
    return this.frm.controls[controlName].hasError(errorName);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  SaveDocument() {
    if (this.selectedFile) {
      this.dialogRef.close(this.frm.value);
    }else {
      console.log('No document selected or no binary --> can\'t save document !');
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  loadDocumentsByPartnerIdAndJobId(partnerId : number, jobId: number){
    this.documentsFacadeService.loadDocumentsByPartnerIdAndJobId(partnerId, jobId);
  }

  openSelectedDocument(documentDetail:DocumentDetail){
    this.documentsFacadeService.openSelectedDocument(documentDetail);
  }

  deleteDocument(id: number){
    this.documentsFacadeService.deleteDocument(id);
  }
}
