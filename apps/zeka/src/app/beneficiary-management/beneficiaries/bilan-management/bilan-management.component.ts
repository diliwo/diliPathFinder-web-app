import { AfterViewInit, Component, DoCheck, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BeneficiaryDetail, BilanMv, ProfessionnalExperience, BilanProfessionVm } from '@frontend/api-interface';
import { BeneficiariesFacade, BilansFacadeService, PositionFacadeService, ProfessionalExperienceFacadeService } from '@frontend/core-state';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash-es';
import { BilanDetailsComponent } from '../bilan-details/bilan-details.component';
import { takeUntil, tap } from 'rxjs/operators';
import { ConfirmationBoxComponent } from '@frontend/shared';
import { ProfessionalExperienceDetailComponent } from '../../beneficiary-jobs/professional-experience-detail/professional-experience-detail.component';

@Component({
  selector: 'frontend-bilan-management',
  templateUrl: './bilan-management.component.html',
  styleUrls: ['./bilan-management.component.scss'],
})
export class BilanManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribre: Subject<void> = new Subject();
  selectedBeneficiary$: Observable<BeneficiaryDetail> = this.beneficiariesFacade
    .selectedBeneficiary$;
  // bilans$: Observable<BilanListVm> = this.bilansFacadeService.archivedBilans$
  currentBilan$: Observable<BilanMv.Bilan> = this.bilansFacadeService.currentBilan$;
  allBilansAreNotDoneSubject$: Observable<boolean> = this.bilansFacadeService.allBilansAreNotDoneSubject$

  // lastBilan$ : Observable<Bilan> = this.bilansFacadeService.lastBilan$
  bilansData: BilanMv.BilanListVm;
  beneficiary: BeneficiaryDetail;
  lastBilan: BilanMv.Bilan;
  allBilansNotDone: boolean;
  beneficiaryId: number;

  constructor(
    private beneficiariesFacade: BeneficiariesFacade,
    private bilansFacadeService: BilansFacadeService,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog,
    private positionFacadeServices: PositionFacadeService,
    private professionalExperienceFacadeService : ProfessionalExperienceFacadeService,
  ) {}
  ngOnInit(): void {
    this.loadBeneficiary();
    this.bilansFacadeService.mutations$.subscribe((_) => {
      this.loadCurrent();
    });
    this.bilansFacadeService.allBilansAreNotDoneSubject$.subscribe((result: boolean) => {
      this.allBilansNotDone = result;
    });
  }

  ngAfterViewInit(){
    this.loadCurrent();
  }

  loadBeneficiaryId(){
    this.selectedBeneficiary$.pipe(takeUntil(this.unsubscribre)).subscribe((beneficiary) => {
      this.beneficiaryId = parseInt(beneficiary.beneficiaryId);

      if(this.beneficiaryId != null){
        this.loadAllBeneficiaryBilans(this.beneficiaryId);
      }
    });
  }

  loadCurrent() {
    if(this.beneficiaryId == undefined){
      this.selectedBeneficiary$.pipe(takeUntil(this.unsubscribre)).subscribe((beneficiary) => {
        this.beneficiaryId = parseInt(beneficiary.beneficiaryId);
        this.bilansFacadeService.loadCurrrent(this.beneficiaryId);
        this.loadAllBeneficiaryBilans(this.beneficiaryId);
      });
    } else {
      this.bilansFacadeService.loadCurrrent(this.beneficiaryId)
      this.loadAllBeneficiaryBilans(this.beneficiaryId);
    }
  }

  loadLastBilan(beneficiaryId: number) {
    this.bilansFacadeService.loadLast(beneficiaryId).subscribe((last) => {
      this.lastBilan = last;
    });
  }

  loadBeneficiary() {
    this.actRoute.paramMap.subscribe((params) => {
      let niss = '';
      niss = params.get('niss');
      console.log('loadBeneficiary : ' + niss);
      this.beneficiariesFacade.selectBeneficiary(niss);
      this.positionFacadeServices.getPosition(niss);
    });
  }

  refresh(data: any) {
    this.bilansFacadeService.persist(data);
  }

  finalize(id: number) {
    const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
      data: {
        title: 'Confirmez la finalisation !',
        message: 'Êtes-vous certain de vouloir finaliser cette version ?',
      },
    });

    confirmDialog.afterClosed().subscribe((result) => {
      if (result == true) {
        this.bilansFacadeService.finalize(id);
      }
    });
  }

  create(beneficiaryId: number) {
    //this.lastBilan;
    this.bilansFacadeService.loadLast(beneficiaryId).subscribe((last) => {
      const bilan = new BilanMv.Bilan();
      this.lastBilan = last;
      if (this.lastBilan != null || this.lastBilan != undefined) {
        bilan.personalSituationFamily = this.lastBilan.personalSituationFamily;
        bilan.personalSituationHousing = this.lastBilan.personalSituationHousing;
        bilan.personalSituationHealth = this.lastBilan.personalSituationHealth;
        bilan.personalSituationFinancialSituation = this.lastBilan.personalSituationFinancialSituation;
        bilan.personalSituationAdministrativeStatus = this.lastBilan.personalSituationAdministrativeStatus;
        bilan.languageFormationNote = this.lastBilan.languageFormationNote;
        bilan.formationDifficulty = this.lastBilan.formationDifficulty;
        bilan.formationOpinion = this.lastBilan.formationOpinion;
        bilan.formationFacilitiesAndStrengths = this.lastBilan.formationFacilitiesAndStrengths;
        bilan.formationPersonalImprovments = this.lastBilan.formationPersonalImprovments;
        bilan.formationConsultantNote = this.lastBilan.formationConsultantNote;
        bilan.formationConsultantLanguageLearningNote = this.lastBilan.formationConsultantLanguageLearningNote;
        bilan.professionalExperienceProblemEncountered = this.lastBilan.professionalExperienceProblemEncountered;
        bilan.professionalExperienceWhatsRewarding = this.lastBilan.professionalExperienceWhatsRewarding;
        bilan.professionalExperienceKnowledge = this.lastBilan.professionalExperienceKnowledge;
        bilan.professionalExperienceNote = this.lastBilan.professionalExperienceNote;
        bilan.professionalExperiencePointToImprove = this.lastBilan.professionalExperiencePointToImprove;
        bilan.professionalExpectationWorkingConditionWhatIWant = this.lastBilan.professionalExpectationWorkingConditionWhatIWant;
        bilan.professionalExpectationWorkingConditionWhatIDontWant = this.lastBilan.professionalExpectationWorkingConditionWhatIDontWant;
        bilan.professionalExpectationWorkingConditionWhatMotivatesMe = this.lastBilan.professionalExpectationWorkingConditionWhatMotivatesMe;
        bilan.professionalExpectationWorkingConditionConsultantNote = this.lastBilan.professionalExpectationWorkingConditionConsultantNote;
        bilan.professionalExpectationShortTermA = this.lastBilan.professionalExpectationShortTermA;
        bilan.professionalExpectationShortTermB = this.lastBilan.professionalExpectationShortTermB;
        bilan.professionalExpectationMediumTerm = this.lastBilan.professionalExpectationMediumTerm;
        bilan.professionalExpectationLongTerm = this.lastBilan.professionalExpectationLongTerm;
        bilan.professionalExpectationNlOralLanguageScore = this.lastBilan.professionalExpectationNlOralLanguageScore;
        bilan.professionalExpectationNlWrittentLanguageScore = this.lastBilan.professionalExpectationNlWrittentLanguageScore;
        bilan.professionalExpectationFrOralLanguageScore = this.lastBilan.professionalExpectationFrOralLanguageScore;
        bilan.professionalExpectationFrWrittenLanguageScore = this.lastBilan.professionalExpectationFrWrittenLanguageScore;
        bilan.professionalExpectationFrWrittenLanguageScore = this.lastBilan.professionalExpectationFrWrittenLanguageScore;
        bilan.professionalExpectationItKnowledgeInternet = this.lastBilan.professionalExpectationItKnowledgeInternet;
        bilan.professionalExpectationItKnowledgeWord = this.lastBilan.professionalExpectationItKnowledgeWord;
        bilan.professionalExpectationItKnowledgeEmail = this.lastBilan.professionalExpectationItKnowledgeEmail;
        bilan.bilanProfessions = this.lastBilan.bilanProfessions;
        //this.populateBilanProfessions(this.lastBilan.bilanProfessions,bilan.bilanProfessions)
      }
      bilan.beneficiaryId = beneficiaryId;
      const dlg = this.dialog.open(BilanDetailsComponent, {
        data: { bilan, isNew: true },
        // maxWidth: '100vw',
        // maxHeight: '100vh',
        height: '92%',
        width: '65%',
        disableClose: true,
      });
      dlg.beforeClosed().subscribe((res) => {
        if (res) {
          _.assign(bilan, res);
          console.log(res);
          this.bilansFacadeService.persist(res);
        }
      });
    });
  }

  populateBilanProfessions(sources: BilanProfessionVm.BilanProfessions, dests: BilanProfessionVm.BilanProfessions){
    if((sources != null && sources.list != null) &&(dests != null && dests.list != null)){
      sources.list?.forEach((bilanProfession: BilanProfessionVm.BilanProfession) => {dests.list.push(bilanProfession)});
    }
  }

  areAllBilansNotDone(result: boolean) {
    this.allBilansNotDone = result;
  }

  loadAllBeneficiaryBilans(beneficiaryId: number){
    this.bilansFacadeService.loadAllBeneficiaryBilans(beneficiaryId);
  }

  ngOnDestroy() {
    this.bilansFacadeService.killLoadLast();
    this.unsubscribre.next();
    this.unsubscribre.complete();
  }

  createExperience(idBenef: number){
    const experience = new ProfessionnalExperience();
    experience.beneficiaryId = idBenef;
    const dlg = this.dialog.open(ProfessionalExperienceDetailComponent, { data: { experience, isNew : true },
      maxWidth: '40%',
      width: '30%'});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          this.professionalExperienceFacadeService.persist(res);
        }
    });
  }
}
