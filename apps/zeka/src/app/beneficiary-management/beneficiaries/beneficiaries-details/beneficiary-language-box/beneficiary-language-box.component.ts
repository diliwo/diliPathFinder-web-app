import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  Beneficiary,
  BeneficiaryService,
  NativeLanguage,
  NativeLanguageService,
} from '@cpas/sociabili-gateway-ng-lib';

@Component({
  selector: 'frontend-beneficiary-language-box',
  templateUrl: './beneficiary-language-box.component.html',
  styleUrls: ['./beneficiary-language-box.component.scss'],
})
export class BeneficiaryLanguageBoxComponent implements OnInit {
  public control = new FormControl();
  public nativeLanguages: NativeLanguage[] = [];
  public frm: FormGroup;
  public options: string[] = [];
  public ctlNativeLanguage: FormControl = new FormControl('');
  public currentLanguage: string = '';
  filteredOptions: Observable<string[]>;
  isloading = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BeneficiaryLanguageBoxComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { niss: string; nativeLanguage: string },
    private fb: FormBuilder,
    private nativeLanguageService: NativeLanguageService,
    public beneficiaryService: BeneficiaryService
  ) {
    this.ctlNativeLanguage = this.fb.control('');
    this.frm = this.fb.group({
      nativeLanguage: this.ctlNativeLanguage,
      niss: data.niss,
    });
    this.currentLanguage = data.nativeLanguage;
    this.frm.patchValue(data);
  }

  ngOnInit() {
    this.nativeLanguageService.getAll().subscribe((languages) => {
      if (languages) {
        this.nativeLanguages = languages;
        this.options = languages
          .filter((language) => language.label! != this.currentLanguage)
          .sort((a, b) => a.label!.localeCompare(b.label!))
          .map((o) => o.label);
        this.ctlNativeLanguage.addValidators(
          this.autocompleteStringValidator(this.options)
        );
        this.filteredOptions = this.ctlNativeLanguage.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || ''))
        );
      } else {
        this.options = [];
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  create(): void {
    this.isloading = true;
    const result = this.frm.value;
    const selectedLanguage = this.nativeLanguages.find(
      (l) => l.label == result?.nativeLanguage
    );
    if (selectedLanguage && result?.nativeLanguage != this.currentLanguage) {
      const selectedLanguageId = Number(selectedLanguage.id);
      this.beneficiaryService
        .getBeneficiaryByNISS(result.niss)
        .subscribe((data: Beneficiary[]) => {
          if (data && data.length > 0) {
            const individuId = Number(data[0].id);
            this.beneficiaryService
              .updateContactInfo(individuId, '', '', '', selectedLanguageId)
              .subscribe(
                (data: any) => {
                  this.currentLanguage = selectedLanguage.label;
                  this.dialogRef.close(result);
                },
                (error: any) => {
                  console.error(error);
                }
              );
          }
        }),
        (error: any) => {
          console.error(error);
        },
        () => {
          this.isloading = false;
        };
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  autocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (validOptions.indexOf(control.value) !== -1) {
        return null;
      }
      return { invalidAutocompleteString: { value: control.value } };
    };
  }

  public validation_msgs = {
    languageAutocompleteControl: [
      {
        type: 'invalidAutocompleteString',
        message: "La langue sélectionnée n'a pas été reconnue.",
      },
      { type: 'required', message: 'La séléction est obligatoire.' },
    ],
  };
}
