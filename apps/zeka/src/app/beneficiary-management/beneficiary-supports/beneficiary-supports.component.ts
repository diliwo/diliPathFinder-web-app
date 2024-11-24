import { Component, OnInit } from '@angular/core';
import {
  BeneficiaryDetail,
   SupportDetail,
   ServiceListVm,
    Support,
     SupportListVm,ReferentListVm, Referent } from '@frontend/api-interface';
import { BeneficiariesFacade, SupportsFacadeService,ReferentFacadeService, PositionFacadeService } from '@frontend/core-state';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'frontend-supports',
  templateUrl: './beneficiary-supports.component.html',
  styleUrls: ['./beneficiary-supports.component.scss']
})
export class BeneficiarySupportsComponent implements OnInit {
  selectedBeneficiary$: Observable<BeneficiaryDetail> = this.beneficiariesFacade.selectedBeneficiary$;
  allSupportsByBeneficiary$: Observable<SupportListVm> = this.supportsFacadeService.allSupportsByBeneficiary$;
  allReferences$: Observable<ReferentListVm> = this.referentFacadeService.allReferents$
  allSupports$: Observable<SupportListVm> = this.supportsFacadeService.allSupports$

  niss: string = '';
  cpt: number;

  constructor(
    private beneficiariesFacade: BeneficiariesFacade,
    private actRoute: ActivatedRoute,
    private supportsFacadeService: SupportsFacadeService,
    private referentFacadeService:ReferentFacadeService,
    private positionFacadeServices: PositionFacadeService
    ) { }

    ngOnInit(): void {
      this.cpt = 1;
      console.log('Supports here !')
      this.loadBeneficiary();
      //this.loadReferents();
      this.loadSupportsByBeneficiaryId();
      this.supportsFacadeService.mutations$.subscribe((_) => {
        if(this.cpt == 1){
          console.log('Support updated !');
          this.loadSupportsByBeneficiaryId();
          this.cpt = 0;
        }
      });
    }

    reset(){
      this.loadReferents();
      //this.loadSupports();
      this.loadSupportsByBeneficiaryId();
    }


    loadSupportsByBeneficiaryId(){
      this.actRoute.paramMap.subscribe(params => {
        let id = '';
        id = params.get('id');

        console.log('Id : ' + id);
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

    loadReferents(){
      this.referentFacadeService.loadReferents(1,100);
    }

    loadSupports(){
      this.supportsFacadeService.loadSupports();
    }

    persistSupport(support: Support){
      this.supportsFacadeService.persist(support);
    }

    closeSupport(support: Support){
      this.supportsFacadeService.close(support);
    }

    deleteSupport(support: Support){
      this.supportsFacadeService.delete(support.supportId);
    }
}
