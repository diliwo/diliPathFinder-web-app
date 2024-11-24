import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BilanMv, LanguageKnowledgeScore } from '@frontend/api-interface';
import { BilansFacadeService } from '@frontend/core-state';

@Component({
  selector: 'frontend-personal-expectation',
  templateUrl: './personal-expectation.component.html',
  styleUrls: ['./personal-expectation.component.scss']
})
export class PersonalExpectationComponent implements OnInit {
  isLinear = false;
  shortFormGroup: FormGroup;
  middleFormGroup: FormGroup;
  longFormGroup: FormGroup;
  knowledgeOfEmail = false;
  knowledgeOfInternet = false;
  KnowledgeWord = false;
  data: any
  @Input() bilan: BilanMv.Bilan;
  @Output() updateEvent: EventEmitter<any> = new EventEmitter();

  public frm: FormGroup;
  public frmGoals: FormGroup;

  public shortTermFormGroup: FormGroup;
  public middleTermFormGroup: FormGroup;
  public longTermFormGroup: FormGroup;
  public ctlPersonalSituationFamily:FormControl;
  public ctlPersonalSituationHousing:FormControl;
  public ctlPersonalSituationHealth:FormControl;
  public ctlPersonalSituationFinancialSituation:FormControl;
  public ctlPersonalSituationAdministrativeStatus:FormControl;
  public ctlLanguageFormationNote:FormControl;
  public ctlFormationDifficulty:FormControl;
  public ctlFormationOpinion:FormControl;
  public ctlFormationFacilitiesAndStrengths:FormControl;
  public ctlFormationPersonalImprovments:FormControl;
  public ctlFormationConsultantNote:FormControl;
  public ctlProfessionalExperienceProblemEncountered:FormControl;
  public ctlProfessionalExperienceWhatsRewarding:FormControl;
  public ctlProfessionalExperienceKnowledge:FormControl;
  public ctlProfessionalExperienceNote:FormControl;
  public ctlProfessionalExpectationWorkingConditionWhatIWant:FormControl;
  public ctlProfessionalExpectationWorkingConditionWhatIDontWant:FormControl;
  public ctlProfessionalExpectationWorkingConditionWhatMotivatesMe:FormControl;
  public ctlProfessionalExpectationShortTermA:FormControl;
  public ctlProfessionalExpectationShortTermB:FormControl;
  public ctlProfessionalExpectationMediumTerm:FormControl;
  public ctlProfessionalExpectationLongTerm:FormControl;
  public ctlProfessionalExpectationNlOralLanguageScore:FormControl;
  public ctlProfessionalExpectationNlWrittentLanguageScore:FormControl;
  public ctlProfessionalExpectationFrOralLanguageScore:FormControl;
  public ctlProfessionalExpectationFrWrittenLanguageScore:FormControl;
  public ctlProfessionalExpectationItKnowledgeEmail:FormControl;
  public ctlProfessionalExpectationItKnowledgeInternet:FormControl;
  public ctlProfessionalExpectationItKnowledgeWord:FormControl;
  public ctlProExpectationJobTitle:FormControl;
  public ctlProExpectationAcquiredKnowledge:FormControl;
  public ctlProExpectationAcquiredBehaviouralKnowledge:FormControl;
  public ctlProExpectationAcquiredKnowHow:FormControl;
  public ctlProExpectationKnowledgeToDevelop:FormControl;
  public ctlProExpectationBehaviouralKnowledgeToDevelop:FormControl;
  public ctlProExpectationKnowHowToDevelop:FormControl;

  scores: LanguageKnowledgeScore[] = [
    { id: 0, value: 'Pas du tout'},
    { id: 1, value: 'En initiation'},
    { id: 2, value: 'Besoin de soutien'},
    { id: 3, value: 'Autonome'}
  ];

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
  this.ctlPersonalSituationHousing= this.fb.control('', []);
  this.ctlPersonalSituationHealth= this.fb.control('', []);
  this.ctlPersonalSituationFinancialSituation= this.fb.control('', []);
  this.ctlPersonalSituationAdministrativeStatus= this.fb.control('', []);
  this.ctlLanguageFormationNote= this.fb.control('', []);
  this.ctlFormationDifficulty= this.fb.control('', []);
  this.ctlFormationOpinion= this.fb.control('', []);
  this.ctlFormationFacilitiesAndStrengths= this.fb.control('', []);
  this.ctlFormationPersonalImprovments= this.fb.control('', []);
  this.ctlFormationConsultantNote= this.fb.control('', []);
  this.ctlProfessionalExperienceProblemEncountered= this.fb.control('', []);
  this.ctlProfessionalExperienceWhatsRewarding= this.fb.control('', []);
  this.ctlProfessionalExperienceKnowledge= this.fb.control('', []);
  this.ctlProfessionalExperienceNote= this.fb.control('', []);
  this.ctlProfessionalExpectationWorkingConditionWhatIWant= this.fb.control('', []);
  this.ctlProfessionalExpectationWorkingConditionWhatIDontWant= this.fb.control('', []);
  this.ctlProfessionalExpectationWorkingConditionWhatMotivatesMe= this.fb.control('', []);
  this.ctlProfessionalExpectationShortTermA= this.fb.control('', []);
  this.ctlProfessionalExpectationShortTermB= this.fb.control('', []);
  this.ctlProfessionalExpectationMediumTerm= this.fb.control('', []);
  this.ctlProfessionalExpectationLongTerm= this.fb.control('', []);
  this.ctlProfessionalExpectationNlOralLanguageScore= this.fb.control('', []);
  this.ctlProfessionalExpectationNlWrittentLanguageScore= this.fb.control('', []);
  this.ctlProfessionalExpectationFrOralLanguageScore= this.fb.control('', []);
  this.ctlProfessionalExpectationFrWrittenLanguageScore= this.fb.control('', []);
  this.ctlProfessionalExpectationItKnowledgeEmail= this.fb.control('', []);
  this.ctlProfessionalExpectationItKnowledgeInternet= this.fb.control('', []);
  this.ctlProfessionalExpectationItKnowledgeWord= this.fb.control('', []);
  this.ctlProExpectationJobTitle= this.fb.control('', []);
  this.ctlProExpectationAcquiredKnowledge= this.fb.control('', []);
  this.ctlProExpectationAcquiredBehaviouralKnowledge= this.fb.control('', []);
  this.ctlProExpectationAcquiredKnowHow = this.fb.control('',[]);
  this.ctlProExpectationKnowledgeToDevelop= this.fb.control('', []);
  this.ctlProExpectationBehaviouralKnowledgeToDevelop= this.fb.control('', []);
  this.ctlProExpectationKnowHowToDevelop= this.fb.control('', []);
  }


  ngOnInit(): void {
    this.initForms();
    // this.bilansFacadeService.saveDraft$.subscribe((_) => {
    //   const data = this.frm.value;
    //   const dataShortTerm = this.shortTermFormGroup.value;
    //   const dataMiddleTermFormGroup = this.middleTermFormGroup.value;
    //   const dataLongTermFormGroup = this. longTermFormGroup.value;

    //   data.professionalExpectationShortTermA = dataShortTerm.professionalExpectationShortTermA;
    //   data.professionalExpectationShortTermB = dataShortTerm.professionalExpectationShortTermB;
    //   data.professionalExpectationMediumTerm = dataMiddleTermFormGroup.professionalExpectationMediumTerm;
    //   data.professionalExpectationLongTerm = dataLongTermFormGroup.professionalExpectationLongTerm;

    //   this.updateEvent.emit(data);
    // });

    // this.bilansFacadeService.saveFinalProduct$.subscribe((_) => {
    //   const data = this.frm.value;
    //   const dataShortTerm = this.shortTermFormGroup.value;
    //   const dataMiddleTermFormGroup = this.middleTermFormGroup.value;
    //   const dataLongTermFormGroup = this. longTermFormGroup.value;

    //   data.professionalExpectationShortTermA = dataShortTerm.professionalExpectationShortTermA;
    //   data.professionalExpectationShortTermB = dataShortTerm.professionalExpectationShortTermB;
    //   data.professionalExpectationMediumTerm = dataMiddleTermFormGroup.professionalExpectationMediumTerm;
    //   data.professionalExpectationLongTerm = dataLongTermFormGroup.professionalExpectationLongTerm;
    //   data.isFinalized = true;

    //   this.bilansFacadeService.persist(data);
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
      languageFormationNote:this.ctlLanguageFormationNote,
      formationDifficulty:this.ctlFormationDifficulty,
      formationOpinion:this.ctlFormationOpinion,
      formationFacilitiesAndStrengths:this.ctlFormationFacilitiesAndStrengths,
      formationPersonalImprovments:this.ctlFormationPersonalImprovments,
      formationConsultantNote:this.ctlFormationConsultantNote,
      professionalExperienceProblemEncountered:this.ctlProfessionalExperienceProblemEncountered,
      professionalExperienceWhatsRewarding:this.ctlProfessionalExperienceWhatsRewarding,
      professionalExperienceKnowledge:this.ctlProfessionalExperienceKnowledge,
      professionalExperienceNote:this.ctlProfessionalExperienceNote,
      professionalExpectationWorkingConditionWhatIWant:this.ctlProfessionalExpectationWorkingConditionWhatIWant,
      professionalExpectationWorkingConditionWhatIDontWant:this.ctlProfessionalExpectationWorkingConditionWhatIDontWant,
      professionalExpectationWorkingConditionWhatMotivatesMe:this.ctlProfessionalExpectationWorkingConditionWhatMotivatesMe,
      professionalExpectationNlOralLanguageScore:this.ctlProfessionalExpectationNlOralLanguageScore,
      professionalExpectationNlWrittentLanguageScore:this.ctlProfessionalExpectationNlWrittentLanguageScore,
      professionalExpectationFrOralLanguageScore:this.ctlProfessionalExpectationFrOralLanguageScore,
      professionalExpectationFrWrittenLanguageScore:this.ctlProfessionalExpectationFrWrittenLanguageScore,
      professionalExpectationItKnowledgeEmail:this.ctlProfessionalExpectationItKnowledgeEmail,
      professionalExpectationItKnowledgeInternet:this.ctlProfessionalExpectationItKnowledgeInternet,
      professionalExpectationItKnowledgeWord:this.ctlProfessionalExpectationItKnowledgeWord,
      proExpectationJobTitle:this.ctlProExpectationJobTitle,
      proExpectationAcquiredKnowledge:this.ctlProExpectationAcquiredKnowledge,
      proExpectationAcquiredBehaviouralKnowledge:this.ctlProExpectationAcquiredBehaviouralKnowledge,
      proExpectationAcquiredKnowHow:this.ctlProExpectationAcquiredKnowHow,
      proExpectationKnowledgeToDevelop:this.ctlProExpectationKnowledgeToDevelop,
      proExpectationBehaviouralKnowledgeToDevelop:this.ctlProExpectationBehaviouralKnowledgeToDevelop,
      proExpectationKnowHowToDevelop:this.ctlProExpectationKnowHowToDevelop
    });

    this.shortTermFormGroup = this.fb.group({
      professionalExpectationShortTermA:this.ctlProfessionalExpectationShortTermA,
      professionalExpectationShortTermB:this.ctlProfessionalExpectationShortTermB,
    });

    this.middleTermFormGroup = this.fb.group({
      professionalExpectationMediumTerm:this.ctlProfessionalExpectationMediumTerm,
    });

    this.longTermFormGroup = this.fb.group({
      professionalExpectationLongTerm:this.ctlProfessionalExpectationLongTerm,
    });

      this.shortTermFormGroup.get("professionalExpectationShortTermA").patchValue(this.bilan.professionalExpectationShortTermA);
      this.shortTermFormGroup.get("professionalExpectationShortTermB").patchValue(this.bilan.professionalExpectationShortTermB);
      this.middleTermFormGroup.get("professionalExpectationMediumTerm").patchValue(this.bilan.professionalExpectationMediumTerm);
      this.longTermFormGroup.get("professionalExpectationLongTerm").patchValue(this.bilan.professionalExpectationLongTerm);
      this.frm.get("bilanId").patchValue(this.bilan.bilanId);
      this.frm.get("isFinalized").patchValue(this.bilan.isFinalized);
      this.frm.get("beneficiaryId").patchValue(this.bilan.beneficiaryId);
      this.frm.get("userName").patchValue(this.bilan.userName);
      this.frm.get("personalSituationHousing").patchValue(this.bilan.personalSituationHousing);
      this.frm.get("personalSituationHealth").patchValue(this.bilan.personalSituationHealth);
      this.frm.get("personalSituationFinancialSituation").patchValue(this.bilan.personalSituationFinancialSituation);
      this.frm.get("personalSituationFinancialSituation").patchValue(this.bilan.personalSituationFinancialSituation);
      this.frm.get("personalSituationAdministrativeStatus").patchValue(this.bilan.personalSituationAdministrativeStatus);
      this.frm.get("languageFormationNote").patchValue(this.bilan.languageFormationNote);
      this.frm.get("professionalExperienceWhatsRewarding").patchValue(this.bilan.professionalExperienceWhatsRewarding);
      this.frm.get("professionalExperienceKnowledge").patchValue(this.bilan.professionalExperienceKnowledge);
      this.frm.get("professionalExperienceNote").patchValue(this.bilan.professionalExperienceNote);
      this.frm.get("professionalExpectationWorkingConditionWhatIWant").patchValue(this.bilan.professionalExpectationWorkingConditionWhatIWant);
      this.frm.get("professionalExpectationWorkingConditionWhatIDontWant").patchValue(this.bilan.professionalExpectationWorkingConditionWhatIDontWant);
      this.frm.get("professionalExpectationWorkingConditionWhatMotivatesMe").patchValue(this.bilan.professionalExpectationWorkingConditionWhatMotivatesMe);
      this.frm.get("professionalExpectationNlOralLanguageScore").patchValue(this.bilan.professionalExpectationNlOralLanguageScore);
      this.frm.get("professionalExpectationNlWrittentLanguageScore").patchValue(this.bilan.professionalExpectationNlWrittentLanguageScore);
      this.frm.get("professionalExpectationFrOralLanguageScore").patchValue(this.bilan.professionalExpectationFrOralLanguageScore);
      this.frm.get("professionalExpectationFrWrittenLanguageScore").patchValue(this.bilan.professionalExpectationFrWrittenLanguageScore);
      this.frm.get("professionalExpectationItKnowledgeEmail").patchValue(this.bilan.professionalExpectationItKnowledgeEmail);
      this.frm.get("professionalExpectationItKnowledgeInternet").patchValue(this.bilan.professionalExpectationItKnowledgeInternet);
      this.frm.get("professionalExpectationItKnowledgeWord").patchValue(this.bilan.professionalExpectationItKnowledgeWord);
      // this.frm.get("proExpectationJobTitle").patchValue(this.bilan.proExpectationJobTitle);
      // this.frm.get("proExpectationAcquiredKnowledge").patchValue(this.bilan.proExpectationAcquiredKnowledge);
      // this.frm.get("proExpectationAcquiredBehaviouralKnowledge").patchValue(this.bilan.proExpectationAcquiredBehaviouralKnowledge);
      // this.frm.get("proExpectationAcquiredKnowHow").patchValue(this.bilan.proExpectationAcquiredKnowHow);
      // this.frm.get("proExpectationKnowledgeToDevelop").patchValue(this.bilan.proExpectationKnowledgeToDevelop);
      // this.frm.get("proExpectationBehaviouralKnowledgeToDevelop").patchValue(this.bilan.proExpectationBehaviouralKnowledgeToDevelop);
      // this.frm.get("proExpectationKnowHowToDevelop").patchValue(this.bilan.proExpectationKnowHowToDevelop);
  }
}
