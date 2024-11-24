import { Component, OnInit } from '@angular/core';
import { BeneficiaryDetail, CandidaciesListVm, Candidacy,EmploymentTerminationReason,EmploymentTerminationType,JobOfferDetail,JobOffersListVm, NatureOfContract, ProfessionnalExperience } from '@frontend/api-interface';
import { JobOffersFacadeService, CandidaciesFacadeService, BeneficiariesFacade, PositionFacadeService, ProfessionalExperienceFacadeService, NatureOfContractFacadeService, EmploymentTerminationReasonFacadeService, EmploymentTerminationTypeFacadeService } from '@frontend/core-state';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BeneficiaryJobDetailComponent } from './beneficiary-job-detail/beneficiary-job-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfessionalExperienceDetailComponent } from './professional-experience-detail/professional-experience-detail.component';

@Component({
  selector: 'frontend-beneficiary-jobs',
  templateUrl: './beneficiary-jobs.component.html',
  styleUrls: ['./beneficiary-jobs.component.scss']
})
export class BeneficiaryJobsComponent implements OnInit {
  allJobOffersBenefificary$: Observable<CandidaciesListVm> = this.candidaciesFacadeService.allCandidaciesListVm$
  selectedBeneficiary$: Observable<BeneficiaryDetail> = this.beneficiariesFacade.selectedBeneficiary$;
  allJobOffers$: Observable<JobOffersListVm> = this.jobOffersFacadeService.allJobOffersListVm$
  allCandidacy$: Observable<CandidaciesListVm> = this.candidaciesFacadeService.allCandidaciesListVm$
  allCandidaciesByBeneficiary$: Observable<CandidaciesListVm> = this.candidaciesFacadeService.allCandidaciesByBeneficiary$

  selected = 0;
  contracts: NatureOfContract[] = [];

  constructor(
    private candidaciesFacadeService:CandidaciesFacadeService,
    private jobOffersFacadeService:JobOffersFacadeService,
    private beneficiariesFacade:BeneficiariesFacade,
    private actRoute: ActivatedRoute,
    private positionFacadeServices: PositionFacadeService,
    private professionalExperienceFacadeService : ProfessionalExperienceFacadeService,
    private natureOfContractFacadeService: NatureOfContractFacadeService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.loadBeneficiary();
    this.getListOfContracts();
    this.reset();
    // this.jobOffersFacadeService.mutations$.subscribe((_) => this.reset());
    this.candidaciesFacadeService.mutations$.subscribe((_) => {
      this.reset()
    });

    this.beneficiariesFacade.mutations$.subscribe((_) => {
      this.reset()
    });

    this.jobOffersFacadeService.mutations$.subscribe((_) => {
      this.reset();
    });
  }

  reset(){
    //this.loadBeneficiary();
    this.loadJobOffers();
  }

  loadBeneficiary(){
    this.actRoute.paramMap.subscribe(params => {
      let niss = '';
      niss = params.get('niss');
      this.beneficiariesFacade.selectBeneficiary(niss);
      this.positionFacadeServices.getPosition(niss);
    });
  }
  loadJobOffers(){
    this.jobOffersFacadeService.loadJobOffers();
  }
  persistCandidacy(candidacyDetail: Candidacy){
    this.candidaciesFacadeService.persist(candidacyDetail);
  }

  persistHistory(item : any){
    this.candidaciesFacadeService.addToHistory(item);
  }

  deleteCandidacy(candidacyDetail : Candidacy){
    this.candidaciesFacadeService.delete(candidacyDetail.candidacyId);
  }

  persistJobOffer(jobOfferDetail: JobOfferDetail){
    this.jobOffersFacadeService.persist(jobOfferDetail);
  }
  setValue(selectedTab : number){
    this.selected = selectedTab;
  }
  terminateEmployment(item: any){
    this.candidaciesFacadeService.terminateEmployment(item);
  }

  createJobCandidacy(joboffers : JobOfferDetail, idBenef: any){
    const candidacyDetail = new Candidacy();
    const dlg = this.dialog.open(BeneficiaryJobDetailComponent, { data: { candidacyDetail, isNew: true, joboffers, idBenef } ,
      maxWidth: '100%',
      width: '30%'});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          console.log(res);
            this.persistCandidacy(res);
        }
    });
  }

  createJobExperience(idBenef:number){
    const exp = new ProfessionnalExperience();
    exp.beneficiaryId = idBenef;
    const dlg = this.dialog.open(ProfessionalExperienceDetailComponent,
       {
        data: {
          experience: exp,
          listOfcontracts: this.contracts,
          isNew : true
        }});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          this.professionalExperienceFacadeService.persist(res);
        }
    });
  }

  getListOfContracts(){
    this.natureOfContractFacadeService.load(1,1000,'', 'name asc');
    this.natureOfContractFacadeService.data$.subscribe((data) => {
      this.contracts = data.items;
    });
  }
}
