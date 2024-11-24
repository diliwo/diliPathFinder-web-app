import { Component, OnDestroy, OnInit } from '@angular/core';
import { BeneficiaryDetail, BeneficiaryLookUp, BeneficiariesLookUp } from '@frontend/api-interface';
import { BeneficiariesFacade, PositionFacadeService } from '@frontend/core-state';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { first } from 'lodash';

@Component({
  selector: 'frontend-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit {
  selectedBeneficiary$: Observable<BeneficiaryDetail> = this.beneficiariesFacade.selectedBeneficiary$;
  globalNiss:string;

  constructor(
      private beneficiariesFacade: BeneficiariesFacade,
      private actRoute: ActivatedRoute,
      private positionFacadeServices: PositionFacadeService
    ) { }

  ngOnInit(): void {
    this.refreshBeneficiaryPage(true);

    this.beneficiariesFacade.mutations$.subscribe((_) => {
      console.log("Beneficiary Updated !");
      this.beneficiariesFacade.selectBeneficiary(this.globalNiss);
     });
  }

  refreshBeneficiaryPage(result : boolean){
    if(result){
      this.actRoute.paramMap.subscribe(params => {
        let niss = '';
        niss = params.get('niss');
        this.globalNiss = niss;
        this.beneficiariesFacade.selectBeneficiary(niss);
        this.positionFacadeServices.getPosition(niss);
      });
    }
  }
}
