import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BilanMv } from '@frontend/api-interface';
import { BilansFacadeService } from '@frontend/core-state';

@Component({
  selector: 'frontend-personal-situation',
  templateUrl: './personal-situation.component.html',
  styleUrls: ['./personal-situation.component.scss']
})
export class PersonalSituationComponent implements OnInit {
  @Input() bilansList :any[] = [];
  public frm: FormGroup;
  @Input() bilan: BilanMv.Bilan;
  @Output() updateEvent: EventEmitter<any> = new EventEmitter();
  public ctlPersonalSituationFamily:FormControl;
  public ctlPersonalSituationHousing:FormControl;
  public ctlPersonalSituationHealth:FormControl;
  public ctlPersonalSituationFinancialSituation:FormControl;
  public ctlPersonalSituationAdministrativeStatus:FormControl;

  step = 0;
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor(
    private fb: FormBuilder,
    private bilansFacadeService: BilansFacadeService,
  ) {
    this.ctlPersonalSituationFamily = this.fb.control('', []);
    this.ctlPersonalSituationHousing = this.fb.control('', []);
    this.ctlPersonalSituationHealth = this.fb.control('', []);
    this.ctlPersonalSituationFinancialSituation = this.fb.control('', []);
    this.ctlPersonalSituationAdministrativeStatus = this.fb.control('', []);
  }

  ngOnInit(): void {
    this.initForms();
    // this.bilansFacadeService.saveDraft$.subscribe((_) => {
    //   const data = this.frm.value;
    //   this.updateEvent.emit(data);
    // });
  }

  initForms(){
    this.frm = this.fb.group({
      bilanId : this.bilan.bilanId,
      isFinalized: this.bilan.isFinalized,
      beneficiaryId: this.bilan.beneficiaryId,
      userName:this.bilan.userName,
      personalSituationFamily:this.ctlPersonalSituationFamily,
      personalSituationHousing:this.ctlPersonalSituationHousing,
      personalSituationHealth:this.ctlPersonalSituationHealth,
      personalSituationFinancialSituation:this.ctlPersonalSituationFinancialSituation,
      personalSituationAdministrativeStatus:this.ctlPersonalSituationAdministrativeStatus,
      languageFormationNote:this.bilan.languageFormationNote,
      formationDifficulty:this.bilan.formationDifficulty,
      formationOpinion:this.bilan.formationOpinion,
      formationFacilitiesAndStrengths:this.bilan.formationFacilitiesAndStrengths,
      formationPersonalImprovments:this.bilan.formationPersonalImprovments,
      formationConsultantNote:this.bilan.formationConsultantNote,
      professionalExperienceProblemEncountered:this.bilan.professionalExperienceProblemEncountered,
      professionalExperienceWhatsRewarding:this.bilan.professionalExperienceWhatsRewarding,
      professionalExperienceKnowledge:this.bilan.professionalExperienceKnowledge,
      professionalExperienceNote:this.bilan.professionalExperienceNote,
      professionalExpectationWorkingConditionWhatIWant:this.bilan.professionalExpectationWorkingConditionWhatIWant,
      professionalExpectationWorkingConditionWhatIDontWant:this.bilan.professionalExpectationWorkingConditionWhatIDontWant,
      professionalExpectationWorkingConditionWhatMotivatesMe:this.bilan.professionalExpectationWorkingConditionWhatMotivatesMe,
      professionalExpectationNlOralLanguageScore:this.bilan.professionalExpectationNlOralLanguageScore,
      professionalExpectationNlWrittentLanguageScore:this.bilan.professionalExpectationNlWrittentLanguageScore,
      professionalExpectationFrOralLanguageScore:this.bilan.professionalExpectationFrOralLanguageScore,
      professionalExpectationFrWrittenLanguageScore:this.bilan.professionalExpectationFrWrittenLanguageScore,
      professionalExpectationItKnowledgeEmail:this.bilan.professionalExpectationItKnowledgeEmail,
      professionalExpectationItKnowledgeInternet:this.bilan.professionalExpectationItKnowledgeInternet,
      professionalExpectationItKnowledgeWord:this.bilan.professionalExpectationItKnowledgeWord,
      // proExpectationJobTitle:this.bilan.proExpectationJobTitle,
      // proExpectationAcquiredKnowledge:this.bilan.proExpectationAcquiredKnowledge,
      // proExpectationAcquiredBehaviouralKnowledge:this.bilan.proExpectationAcquiredBehaviouralKnowledge,
      // proExpectationAcquiredKnowHow:this.bilan.proExpectationAcquiredKnowHow,
      // proExpectationKnowledgeToDevelop:this.bilan.proExpectationKnowledgeToDevelop,
      // proExpectationBehaviouralKnowledgeToDevelop:this.bilan.proExpectationBehaviouralKnowledgeToDevelop,
      // proExpectationKnowHowToDevelop:this.bilan.proExpectationKnowHowToDevelop
    });

    if(this.bilan != null){
      this.frm.get("bilanId").patchValue(this.bilan.bilanId);
      this.frm.get("personalSituationFamily").patchValue(this.bilan.personalSituationFamily);
      this.frm.get("personalSituationHousing").patchValue(this.bilan.personalSituationHousing);
      this.frm.get("personalSituationHealth").patchValue(this.bilan.personalSituationHealth);
      this.frm.get("personalSituationFinancialSituation").patchValue(this.bilan.personalSituationFinancialSituation);
      this.frm.get("personalSituationAdministrativeStatus").patchValue(this.bilan.personalSituationAdministrativeStatus);
    }
  }
}
