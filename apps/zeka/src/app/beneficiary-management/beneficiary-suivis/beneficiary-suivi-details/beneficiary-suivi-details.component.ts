import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MonitoringActionDto } from '@frontend/api-interface';
import { QuarterlyMonitoringDto, Referent } from '@frontend/api-interface';
import { take } from 'rxjs/operators';
import { tools } from '@frontend/shared';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'frontend-beneficiary-suivi-details',
  templateUrl: './beneficiary-suivi-details.component.html',
  styleUrls: ['./beneficiary-suivi-details.component.scss']
})
export class BeneficiarySuiviDetailsComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  public frm: FormGroup;
  public benefSuivi : QuarterlyMonitoringDto;
  public isNew: boolean;
  public isReadonly : boolean = false;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  listOfActions : MonitoringActionDto[] = [];
  listOfRefernts : Referent[];
  filteredlistOfRefernts : Referent[];
  myReferentId : number;
  constructor(public dialogRef: MatDialogRef<BeneficiarySuiviDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { benefSuivi: QuarterlyMonitoringDto; benefReferentId: number, actions: MonitoringActionDto[],referents : Referent[], isNew: boolean; isReadonly : boolean },
    private fb: FormBuilder,private _ngZone: NgZone,) {
      if(data) {
        this.benefSuivi = data.benefSuivi;
        this.myReferentId = data.benefReferentId;
        this.listOfActions = this.data.actions;
        this.listOfRefernts = this.data.referents;
        this.filteredlistOfRefernts = this.listOfRefernts;
        this.isNew = data.isNew;
        this.isReadonly = data.isReadonly ?? false;
        this.frm = this.fb.group({
        beneficiaryId: this.benefSuivi.beneficiaryId,
        qMonitoringId: this.benefSuivi.qMonitoringId,
        monitoringActionId: this.fb.control({value:this.benefSuivi.monitoringActionId, disabled:this.isReadonly}, [Validators.required]),
        referentId: this.fb.control({value : this.benefSuivi.referentId > 0 ? this.benefSuivi.referentId : this.myReferentId, disabled : this.isReadonly}, [Validators.required]),
        actionComment: this.fb.control({ value: this.benefSuivi.actionComment ? this.benefSuivi.actionComment : '', disabled: this.isReadonly }, []),
        actionDate: this.fb.control(this.benefSuivi.actionDate ? tools.formatDate(this.benefSuivi.actionDate) : tools.formatDate(new Date()), [this.dateValidator.bind(this)]),
      });

    }
    }
  ngOnInit(): void {
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

    triggerResize() {
      // Wait for changes to be applied, then trigger textarea resize.
      this._ngZone.onStable
        .pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
    }

  update() {
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

  dateValidator(control: AbstractControl): ValidationErrors | null
  {
    let date = new Date(control.value);
    const isDateValid = this.isDateValid(date);
    return isDateValid ? null : { invalidDate: control.value };
  }

  isDateValid(date: any){
    if (Object.prototype.toString.call(date) === '[object Date]') {
      // it is a date
      if (isNaN(date)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  get f() {
    return this.frm.controls;
  }

  onSearch(value: string) {
    this.filteredlistOfRefernts = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.listOfRefernts.filter(option =>
      option.fullname.toLowerCase().includes(value)
    );
  }

}
