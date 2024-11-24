import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BilanMv, LanguageKnowledgeScore, ProfessionnalExperience, ProfessionMv, NatureOfContract } from '@frontend/api-interface';
import { BilansFacadeService, NatureOfContractFacadeService, ProfessionalExperienceFacadeService, ProfessionsFacadeService } from '@frontend/core-state';
import { BilanProfession, BilanProfessions } from 'libs/api-interface/src/lib/Bilans/BilanProfession';
import { debounceTime, distinctUntilChanged, filter, map, Observable, startWith } from 'rxjs';
import { ProfessionalExperienceDetailComponent } from '../../beneficiary-jobs/professional-experience-detail/professional-experience-detail.component';
import { BilanProfessionDetailsComponent } from '../bilan-profession-details/bilan-profession-details.component';

@Component({
  selector: 'frontend-bilan-details',
  templateUrl: './bilan-details.component.html',
  styleUrls: ['./bilan-details.component.scss']
})
export class BilanDetailsComponent implements OnInit{
  contracts: NatureOfContract[] = [];
  public frm: FormGroup;

  get formArray (): FormArray {
		return this.frm.get('bilanProfessions') as FormArray;
	}

  public ctlPersonalSituationFamily:FormControl;
  public ctlPersonalSituationHousing:FormControl;
  public ctlPersonalSituationHealth:FormControl;
  public ctlPersonalSituationFinancialSituation:FormControl;
  public ctlPersonalSituationAdministrativeStatus:FormControl;
  public shortTermFormGroup: FormGroup;
  public middleTermFormGroup: FormGroup;
  public longTermFormGroup: FormGroup;
  public ctlLanguageFormationNote:FormControl;
  public ctlFormationDifficulty:FormControl;
  public ctlFormationOpinion:FormControl;
  public ctlFormationFacilitiesAndStrengths:FormControl;
  public ctlFormationPersonalImprovments:FormControl;
  public ctlFormationConsultantNote:FormControl;
  public ctlFormationConsultantLanguageLearningNote:FormControl;
  public ctlProfessionalExperienceProblemEncountered:FormControl;
  public ctlProfessionalExperienceWhatsRewarding:FormControl;
  public ctlProfessionalExperienceKnowledge:FormControl;
  public ctlProfessionalExperiencePointToImprove:FormControl;
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
  public ctlProfessionalExpectationWorkingConditionConsultantNote:FormControl;
  public beneficiaryId: number;

  public isNew: boolean;
  isLinear = false;
  shortFormGroup: FormGroup;
  middleFormGroup: FormGroup;
  longFormGroup: FormGroup;
  knowledgeOfEmail = false;
  knowledgeOfInternet = false;
  KnowledgeWord = false;
  public professionObjects: BilanProfession[] | null;
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
    public dialogRef: MatDialogRef<BilanDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bilan: BilanMv.Bilan; isNew: boolean; },
    private fb: FormBuilder,
    private bilansFacadeService: BilansFacadeService,
    private professionsFacadeService : ProfessionsFacadeService,
    public dialog: MatDialog,
    private professionalExperienceFacadeService : ProfessionalExperienceFacadeService,
    private natureOfContractFacadeService: NatureOfContractFacadeService,
  ) {
    this.professionObjects = (data.bilan.bilanProfessions != null && data.bilan.bilanProfessions.list != null) ? Object.values(data.bilan.bilanProfessions.list) : null
    this.ctlPersonalSituationFamily = this.fb.control('', []);
    this.ctlPersonalSituationHousing = this.fb.control('', []);
    this.ctlPersonalSituationHealth = this.fb.control('', []);
    this.ctlPersonalSituationAdministrativeStatus = this.fb.control('', []);
    this.ctlPersonalSituationFinancialSituation= this.fb.control('', []);
    this.ctlLanguageFormationNote= this.fb.control('', []);
    this.ctlFormationDifficulty= this.fb.control('', []);
    this.ctlFormationOpinion= this.fb.control('', []);
    this.ctlFormationFacilitiesAndStrengths= this.fb.control('', []);
    this.ctlFormationPersonalImprovments= this.fb.control('', []);
    this.ctlFormationConsultantNote= this.fb.control('', []);
    this.ctlFormationConsultantLanguageLearningNote = this.fb.control('', []);
    this.ctlProfessionalExperienceProblemEncountered= this.fb.control('', []);
    this.ctlProfessionalExperienceWhatsRewarding= this.fb.control('', []);
    this.ctlProfessionalExperienceKnowledge= this.fb.control('', []);
    this.ctlProfessionalExperiencePointToImprove = this.fb.control('', []);
    this.ctlProfessionalExperienceNote= this.fb.control('', []);
    this.ctlProfessionalExpectationWorkingConditionWhatIWant= this.fb.control('', []);
    this.ctlProfessionalExpectationWorkingConditionWhatIDontWant= this.fb.control('', []);
    this.ctlProfessionalExpectationWorkingConditionWhatMotivatesMe=this.fb.control('', []);
    this.ctlProfessionalExpectationWorkingConditionConsultantNote=this.fb.control('', []);
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

  this.frm = this.fb.group({
    bilanId : data.bilan.bilanId,
    isFinalized: data.bilan.isFinalized,
    beneficiaryId: data.bilan.beneficiaryId,
    userName:data.bilan.userName,
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
    formationConsultantLanguageLearningNote:this.ctlFormationConsultantLanguageLearningNote,
    professionalExperienceProblemEncountered:this.ctlProfessionalExperienceProblemEncountered,
    professionalExperienceWhatsRewarding:this.ctlProfessionalExperienceWhatsRewarding,
    professionalExperienceKnowledge:this.ctlProfessionalExperienceKnowledge,
    professionalExperiencePointToImprove: this.ctlProfessionalExperiencePointToImprove,
    professionalExperienceNote:this.ctlProfessionalExperienceNote,
    professionalExpectationWorkingConditionWhatIWant:this.ctlProfessionalExpectationWorkingConditionWhatIWant,
    professionalExpectationWorkingConditionWhatIDontWant:this.ctlProfessionalExpectationWorkingConditionWhatIDontWant,
    professionalExpectationWorkingConditionWhatMotivatesMe:this.ctlProfessionalExpectationWorkingConditionWhatMotivatesMe,
    professionalExpectationWorkingConditionConsultantNote:this.ctlProfessionalExpectationWorkingConditionConsultantNote,
    professionalExpectationNlOralLanguageScore:this.ctlProfessionalExpectationNlOralLanguageScore,
    professionalExpectationNlWrittentLanguageScore:this.ctlProfessionalExpectationNlWrittentLanguageScore,
    professionalExpectationFrOralLanguageScore:this.ctlProfessionalExpectationFrOralLanguageScore,
    professionalExpectationFrWrittenLanguageScore:this.ctlProfessionalExpectationFrWrittenLanguageScore,
    professionalExpectationItKnowledgeEmail:this.ctlProfessionalExpectationItKnowledgeEmail,
    professionalExpectationItKnowledgeInternet:this.ctlProfessionalExpectationItKnowledgeInternet,
    professionalExpectationItKnowledgeWord:this.ctlProfessionalExpectationItKnowledgeWord,
    professionalExpectationShortTermA:this.ctlProfessionalExpectationShortTermA,
    professionalExpectationShortTermB:this.ctlProfessionalExpectationShortTermB,
    professionalExpectationMediumTerm:this.ctlProfessionalExpectationMediumTerm,
    professionalExpectationLongTerm:this.ctlProfessionalExpectationLongTerm,
    bilanProfessions: new FormArray([
      BilanProfessionDetailsComponent.addBilanProfessionItem((data.bilan.bilanProfessions != null && data.bilan.bilanProfessions.list != null) ? Object.values(data.bilan.bilanProfessions.list)[0] : null),
      BilanProfessionDetailsComponent.addBilanProfessionItem((data.bilan.bilanProfessions != null && data.bilan.bilanProfessions.list != null) ? Object.values(data.bilan.bilanProfessions.list)[1] : null),
      BilanProfessionDetailsComponent.addBilanProfessionItem((data.bilan.bilanProfessions != null && data.bilan.bilanProfessions.list != null) ? Object.values(data.bilan.bilanProfessions.list)[2] : null)
    ])
  });

    this.frm.get("professionalExpectationShortTermA").patchValue(data.bilan.professionalExpectationShortTermA);
    this.frm.get("professionalExpectationShortTermB").patchValue(data.bilan.professionalExpectationShortTermB);
    this.frm.get("professionalExpectationMediumTerm").patchValue(data.bilan.professionalExpectationMediumTerm);
    this.frm.get("professionalExpectationLongTerm").patchValue(data.bilan.professionalExpectationLongTerm);
    this.frm.get("bilanId").patchValue(data.bilan.bilanId);
    this.frm.get("isFinalized").patchValue(data.bilan.isFinalized);
    this.frm.get("beneficiaryId").patchValue(data.bilan.beneficiaryId);
    this.frm.get("userName").patchValue(data.bilan.userName);
    this.frm.get("personalSituationFamily").patchValue(data.bilan.personalSituationFamily);
    this.frm.get("personalSituationHousing").patchValue(data.bilan.personalSituationHousing);
    this.frm.get("personalSituationHealth").patchValue(data.bilan.personalSituationHealth);
    this.frm.get("personalSituationFinancialSituation").patchValue(data.bilan.personalSituationFinancialSituation);
    this.frm.get("personalSituationFinancialSituation").patchValue(data.bilan.personalSituationFinancialSituation);
    this.frm.get("personalSituationAdministrativeStatus").patchValue(data.bilan.personalSituationAdministrativeStatus);
    this.frm.get("languageFormationNote").patchValue(data.bilan.languageFormationNote);
    this.frm.get("professionalExperienceProblemEncountered").patchValue(data.bilan.professionalExperienceProblemEncountered);
    this.frm.get("professionalExperienceWhatsRewarding").patchValue(data.bilan.professionalExperienceWhatsRewarding);
    this.frm.get("professionalExperienceKnowledge").patchValue(data.bilan.professionalExperienceKnowledge);
    this.frm.get("professionalExperiencePointToImprove").patchValue(data.bilan.professionalExperiencePointToImprove);
    this.frm.get("professionalExperienceNote").patchValue(data.bilan.professionalExperienceNote);
    this.frm.get("professionalExpectationWorkingConditionWhatIWant").patchValue(data.bilan.professionalExpectationWorkingConditionWhatIWant);
    this.frm.get("professionalExpectationWorkingConditionWhatIDontWant").patchValue(data.bilan.professionalExpectationWorkingConditionWhatIDontWant);
    this.frm.get("professionalExpectationWorkingConditionWhatMotivatesMe").patchValue(data.bilan.professionalExpectationWorkingConditionWhatMotivatesMe);
    this.frm.get("professionalExpectationWorkingConditionConsultantNote").patchValue(data.bilan.professionalExpectationWorkingConditionConsultantNote);
    this.frm.get("professionalExpectationNlOralLanguageScore").patchValue(data.bilan.professionalExpectationNlOralLanguageScore);
    this.frm.get("professionalExpectationNlWrittentLanguageScore").patchValue(data.bilan.professionalExpectationNlWrittentLanguageScore);
    this.frm.get("professionalExpectationFrOralLanguageScore").patchValue(data.bilan.professionalExpectationFrOralLanguageScore);
    this.frm.get("professionalExpectationFrWrittenLanguageScore").patchValue(data.bilan.professionalExpectationFrWrittenLanguageScore);
    this.frm.get("professionalExpectationItKnowledgeEmail").patchValue(data.bilan.professionalExpectationItKnowledgeEmail);
    this.frm.get("professionalExpectationItKnowledgeInternet").patchValue(data.bilan.professionalExpectationItKnowledgeInternet);
    this.frm.get("professionalExpectationItKnowledgeWord").patchValue(data.bilan.professionalExpectationItKnowledgeWord);
    this.frm.get("formationDifficulty").patchValue(data.bilan.formationDifficulty);
    this.frm.get("formationOpinion").patchValue(data.bilan.formationOpinion);
    this.frm.get("formationFacilitiesAndStrengths").patchValue(data.bilan.formationFacilitiesAndStrengths);
    this.frm.get("formationPersonalImprovments").patchValue(data.bilan.formationPersonalImprovments);
    this.frm.get("formationConsultantNote").patchValue(data.bilan.formationConsultantNote);
    this.frm.get("formationConsultantLanguageLearningNote").patchValue(data.bilan.formationConsultantLanguageLearningNote);
    this.beneficiaryId = data.bilan.beneficiaryId;
  }
  ngOnInit(): void {
    this.generateFirstBilanProfessionForm();
    this.getListOfContracts();
  }

  update() {
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

  createExperience(idBenef: number){
    const experience = new ProfessionnalExperience();
    experience.beneficiaryId = idBenef;
    const dlg = this.dialog.open(ProfessionalExperienceDetailComponent, { data: { experience, listOfcontracts: this.contracts, isNew : true }});
    dlg.beforeClosed().subscribe(res => {
        if (res) {
          this.professionalExperienceFacadeService.persist(res);
        }
    });
  }

  generateFirstBilanProfessionForm(){
    //this.formArray?.push( BilanProfessionDetailsComponent.addBilanProfessionItem() );
  }

  public addBilanProfessionItem (): void {
		this.formArray?.push(BilanProfessionDetailsComponent.addBilanProfessionItem());
	}

	public deleteContact ( index: number ): void {
		this.formArray?.removeAt(index);
	}

  public professionTitleValue(index:number) : string {
    return (this.professionObjects != undefined && this.professionObjects[index] != undefined) ? this.professionObjects[index]?.professionTitle : '';
  }

  getListOfContracts(){
    this.natureOfContractFacadeService.load(1,1000,'', 'name asc');
    this.natureOfContractFacadeService.data$.subscribe((data) => {
      this.contracts = data.items;
    });
  }
}
