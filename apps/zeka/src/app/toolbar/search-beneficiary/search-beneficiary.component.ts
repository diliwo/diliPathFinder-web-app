import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { BeneficiaryLookUp, BeneficiariesLookUp } from '@frontend/api-interface';
import { BeneficiariesFacade, NotificationService } from '@frontend/core-state';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'frontend-search-beneficiary',
  templateUrl: './search-beneficiary.component.html',
  styleUrls: ['./search-beneficiary.component.scss']
})
export class SearchBeneficiaryComponent implements OnInit {
  @Input() beneficiaries: any[] = [];
  allBeneficiariesLookUp$: Observable<BeneficiariesLookUp> = this.beneficiariesFacade.allBeneficiariesLookUp$;
  myControl = new FormControl();
  filteredOptions: Observable<BeneficiaryLookUp[]>;
  options : BeneficiaryLookUp[];
  component:string;
  public beneficiaryLoading = false;

  constructor(
    private beneficiariesFacade : BeneficiariesFacade,
    private router: Router,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.beneficiariesFacade.spinner$.subscribe((_) => {
      this.stopSpinner();
    });

    this.myControl.valueChanges
     .pipe (
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter ((value) => value.length > 2)
     ).subscribe((value) => {
       console.log(value);
       this.beneficiaryLoading = true;
      this.beneficiariesFacade.beneficiaryBySearch(value);
     });
  }

  displayFn(beneficiary: BeneficiaryLookUp): string {
    return beneficiary && beneficiary.niss ? beneficiary.niss : '';
  }

  stopSpinner(){
    this.beneficiaryLoading = false;
  }

  onSelectBeneficiary() {
    this.router.navigate(['/beneficiary',this.myControl.value.niss]);
    this.myControl.setValue('');
  }
}
