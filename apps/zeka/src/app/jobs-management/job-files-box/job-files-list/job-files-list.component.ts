import { ChangeDetectorRef, Component, EventEmitter, Input,  Output } from '@angular/core';
import { DocumentDetail } from '@frontend/api-interface';

@Component({
  selector: 'frontend-job-files-list',
  templateUrl: './job-files-list.component.html',
  styleUrls: ['./job-files-list.component.scss']
})
export class JobFilesListComponent {
  @Input() documents : DocumentDetail[] = [];
  @Output() getSelectedDocumentEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteDocumentEvent: EventEmitter<any> = new EventEmitter();

  constructor(private ref: ChangeDetectorRef) { 
    setInterval(() => {
      this.ref.detectChanges();
    }, 500);  
  }

  emitNewFile(document:DocumentDetail){
    console.log(document);
    this.getSelectedDocumentEvent.emit(document);
  }
  emitDeleteFile(document:DocumentDetail){
    if(confirm("Êtes-vous sûr de vouloir supprimer le document "+ document.description+"." + document.contentType + " ?")) {
      this.deleteDocumentEvent.emit(document.documentId);
      const index = this.documents.indexOf(document,0);
      this.documents.splice(index,1);     
    }    
  }
  trackByFn(index, item : DocumentDetail){
    return item.documentId;
  }
}
