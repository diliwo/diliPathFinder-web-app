import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeneficiaryDetail, BeneficiaryFormation } from '@frontend/api-interface';
import { BeneficiariesFacade, PositionFacadeService } from '@frontend/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'frontend-beneficiary-formations',
  templateUrl: './beneficiary-formations.component.html',
  styleUrls: ['./beneficiary-formations.component.scss']
})
export class BeneficiaryFormationsComponent implements OnInit {
  selectedBeneficiary$: Observable<BeneficiaryDetail> = this.beneficiariesFacade.selectedBeneficiary$

  constructor(
    private beneficiariesFacade:BeneficiariesFacade,
    private actRoute: ActivatedRoute,
    private positionFacadeServices: PositionFacadeService
  ) { }

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
      this.positionFacadeServices.getPosition(niss);
    });
  }

}
