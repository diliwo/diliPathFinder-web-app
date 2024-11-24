import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeneficiaryDetail } from '@frontend/api-interface';
import { BeneficiariesFacade } from '@frontend/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'frontend-beneficiary-suivis',
  templateUrl: './beneficiary-suivis.component.html',
  styleUrls: ['./beneficiary-suivis.component.scss']
})
export class BeneficiarySuivisComponent implements OnInit {

  selectedBeneficiary$: Observable<BeneficiaryDetail> = this.beneficiariesFacade.selectedBeneficiary$
  constructor(private beneficiariesFacade:BeneficiariesFacade,
    private actRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.loadBeneficiary();
    this.beneficiariesFacade.mutations$.subscribe((_) => {
      this.loadBeneficiary();
    });
  }
  loadBeneficiary(){
    this.actRoute.paramMap.subscribe(params => {
      let niss = '';
      niss = params.get('niss');
      this.beneficiariesFacade.selectBeneficiary(niss);
    });
  }
}
