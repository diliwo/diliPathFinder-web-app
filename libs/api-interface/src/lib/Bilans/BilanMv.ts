import { BilanProfession, BilanProfessions } from "./BilanProfession";

interface IBilanListVm {
  bilans?: Bilan[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class BilanListVm implements IBilanListVm {
  bilans?: Bilan[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  constructor(data?: BilanListVm) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['items'])) {
        this.bilans = [] as any;
        for (let item of data['items'])
          this.bilans.push(Bilan.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  static fromJS(data: any): BilanListVm {
    console.log(data);
    data = typeof data === 'object' ? data : {};
    let result = new BilanListVm();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.bilans)) {
      data['items'] = [];
      for (let item of this.bilans) data['items'].push(item.toJSON());
    }
    return data;
  }
}

export class Bilan implements IBilan {
  bilanId?: number;
  isFinalized: boolean;
  clientId: number;
  userName: string;
  creationDate: Date;
  personalSituationFamily: string;
  personalSituationHousing: string;
  personalSituationHealth: string;
  personalSituationFinancialSituation: string;
  personalSituationAdministrativeStatus: string;
  languagetrainingNote: string;
  trainingDifficulty: string;
  trainingOpinion: string;
  trainingFacilitiesAndStrengths: string;
  trainingPersonalImprovments: string;
  trainingConsultantNote: string;
  trainingConsultantLanguageLearningNote: string;
  professionalExperienceProblemEncountered: string;
  professionalExperienceWhatsRewarding: string;
  professionalExperienceKnowledge: string;
  professionalExperiencePointToImprove: string;
  professionalExperienceNote: string;
  professionalExpectationWorkingConditionWhatIWant: string;
  professionalExpectationWorkingConditionWhatIDontWant: string;
  professionalExpectationWorkingConditionWhatMotivatesMe: string;
  professionalExpectationWorkingConditionConsultantNote:string;
  professionalExpectationShortTermA: string;
  professionalExpectationShortTermB: string;
  professionalExpectationMediumTerm: string;
  professionalExpectationLongTerm: string;
  professionalExpectationNlOralLanguageScore: number;
  professionalExpectationNlWrittentLanguageScore: number;
  professionalExpectationFrOralLanguageScore: number;
  professionalExpectationFrWrittenLanguageScore: number;
  professionalExpectationItKnowledgeEmail: boolean;
  professionalExpectationItKnowledgeInternet: boolean;
  professionalExpectationItKnowledgeWord: boolean;
  bilanProfessions?: BilanProfessions;

  constructor(data?: Bilan) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.bilanId = data['bilanId'];
      this.isFinalized = data['isFinalized'];
      this.clientId = data['clientId'];
      this.userName = data['userName'];
      this.creationDate = data['creationDate'];
      this.personalSituationFamily = data['personalSituationFamily'];
      this.personalSituationHousing = data['personalSituationHousing'];
      this.personalSituationHealth = data['personalSituationHealth'];
      this.personalSituationFinancialSituation = data['personalSituationFinancialSituation'];
      this.personalSituationAdministrativeStatus = data['personalSituationAdministrativeStatus'];
      this.languagetrainingNote = data['languagetrainingNote'];
      this.trainingDifficulty = data['trainingDifficulty'];
      this.trainingOpinion = data['trainingOpinion'];
      this.trainingFacilitiesAndStrengths = data['trainingFacilitiesAndStrengths'];
      this.trainingPersonalImprovments = data['trainingPersonalImprovments'];
      this.trainingConsultantNote = data['trainingConsultantNote'];
      this.trainingConsultantLanguageLearningNote = data['trainingConsultantLanguageLearningNote'];
      this.professionalExperienceProblemEncountered = data['professionalExperienceProblemEncountered'];
      this.professionalExperienceWhatsRewarding = data['professionalExperienceWhatsRewarding'];
      this.professionalExperienceKnowledge = data['professionalExperienceKnowledge'];
      this.professionalExperiencePointToImprove = data['professionalExperiencePointToImprove'];
      this.professionalExperienceNote = data['professionalExperienceNote'];
      this.professionalExpectationWorkingConditionWhatIWant = data['professionalExpectationWorkingConditionWhatIWant'];
      this.professionalExpectationWorkingConditionWhatIDontWant = data['professionalExpectationWorkingConditionWhatIDontWant'];
      this.professionalExpectationWorkingConditionWhatMotivatesMe = data['professionalExpectationWorkingConditionWhatMotivatesMe'];
      this.professionalExpectationWorkingConditionConsultantNote = data['professionalExpectationWorkingConditionConsultantNote'];
      this.professionalExpectationShortTermA = data['professionalExpectationShortTermA'];
      this.professionalExpectationShortTermB = data['professionalExpectationShortTermB'];
      this.professionalExpectationMediumTerm = data['professionalExpectationMediumTerm'];
      this.professionalExpectationLongTerm = data['professionalExpectationLongTerm'];
      this.professionalExpectationNlOralLanguageScore = data['professionalExpectationNlOralLanguageScore'];
      this.professionalExpectationNlWrittentLanguageScore = data['professionalExpectationNlWrittentLanguageScore'];
      this.professionalExpectationFrOralLanguageScore = data['professionalExpectationFrOralLanguageScore'];
      this.professionalExpectationFrWrittenLanguageScore = data['professionalExpectationFrWrittenLanguageScore'];
      this.professionalExpectationItKnowledgeEmail = data['professionalExpectationItKnowledgeEmail'];
      this.professionalExpectationItKnowledgeInternet = data['professionalExpectationItKnowledgeInternet'];
      this.professionalExpectationItKnowledgeWord = data['professionalExpectationItKnowledgeWord'];
      this.bilanProfessions = BilanProfessions.fromJS(data['bilanProfessions']);
    }
  }

  static fromJS(data: any): Bilan {
    data = typeof data === 'object' ? data : {};
    let result = new Bilan();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {
    data['bilanId'] = this.bilanId;
    data['isFinalized'] = this.isFinalized;
    data['clientId'] = this.clientId;
    data['userName'] = this.userName;
    data['creationDate'] = this.creationDate;
    data['personalSituationFamily'] = this.personalSituationFamily;
    data['personalSituationHousing'] = this.personalSituationHousing;
    data['personalSituationHealth'] = this.personalSituationHealth;
    data['personalSituationAdministrativeStatus'] = this.personalSituationFinancialSituation;
    data['personalSituationAdministrativeStatus'] = this.personalSituationAdministrativeStatus;
    data['languagetrainingNote'] = this.languagetrainingNote;
    data['trainingDifficulty'] = this.trainingDifficulty;
    data['trainingOpinion'] = this.trainingOpinion;
    data['trainingFacilitiesAndStrengths'] = this.trainingFacilitiesAndStrengths;
    data['trainingPersonalImprovments'] = this.trainingPersonalImprovments;
    data['trainingConsultantNote'] = this.trainingConsultantNote;
    data['trainingConsultantLanguageLearningNote'] = this.trainingConsultantLanguageLearningNote;
    data['professionalExperienceProblemEncountered'] = this.professionalExperienceProblemEncountered;
    data['professionalExperienceWhatsRewarding'] = this.professionalExperienceWhatsRewarding;
    data['professionalExperienceKnowledge'] = this.professionalExperienceKnowledge;
    data['professionalExperiencePointToImprove'] = this.professionalExperiencePointToImprove
    data['professionalExperienceNote'] = this.professionalExperienceNote;
    data['professionalExpectationWorkingConditionWhatIWant'] = this.professionalExpectationWorkingConditionWhatIWant;
    data['professionalExpectationWorkingConditionWhatIDontWant'] = this.professionalExpectationWorkingConditionWhatIDontWant;
    data['professionalExpectationWorkingConditionWhatMotivatesMe'] = this.professionalExpectationWorkingConditionWhatMotivatesMe;
    data['professionalExpectationWorkingConditionConsultantNote'] = this.professionalExpectationWorkingConditionConsultantNote;
    data['professionalExpectationShortTermA'] = this.professionalExpectationShortTermA;
    data['professionalExpectationShortTermB'] = this.professionalExpectationShortTermB;
    data['professionalExpectationMediumTerm'] = this.professionalExpectationMediumTerm;
    data['professionalExpectationLongTerm'] = this.professionalExpectationLongTerm;
    data['professionalExpectationNlOralLanguageScore'] = this.professionalExpectationNlOralLanguageScore;
    data['professionalExpectationNlWrittentLanguageScore'] = this.professionalExpectationNlWrittentLanguageScore;
    data['professionalExpectationFrOralLanguageScore'] = this.professionalExpectationFrOralLanguageScore;
    data['professionalExpectationFrWrittenLanguageScore'] = this.professionalExpectationFrWrittenLanguageScore;
    data['professionalExpectationItKnowledgeEmail'] = this.professionalExpectationItKnowledgeEmail;
    data['professionalExpectationItKnowledgeInternet'] = this.professionalExpectationItKnowledgeInternet;
    data['professionalExpectationItKnowledgeWord'] = this.professionalExpectationItKnowledgeWord;
    return data;
  }
}

interface IBilan {
  bilanId?: number;
  isFinalized: boolean;
  clientId: number;
  userName: string;
  creationDate: Date;
  personalSituationFamily: string;
  personalSituationHousing: string;
  personalSituationHealth: string;
  personalSituationFinancialSituation: string;
  personalSituationAdministrativeStatus: string;
  languagetrainingNote: string;
  trainingDifficulty: string;
  trainingOpinion: string;
  trainingFacilitiesAndStrengths: string;
  trainingPersonalImprovments: string;
  trainingConsultantNote: string;
  trainingConsultantLanguageLearningNote:string;
  professionalExperienceProblemEncountered: string;
  professionalExperienceWhatsRewarding: string;
  professionalExperienceKnowledge: string;
  professionalExperiencePointToImprove: string;
  professionalExperienceNote: string;
  professionalExpectationWorkingConditionWhatIWant: string;
  professionalExpectationWorkingConditionWhatIDontWant: string;
  professionalExpectationWorkingConditionWhatMotivatesMe: string;
  professionalExpectationWorkingConditionConsultantNote: string;
  professionalExpectationShortTermA: string;
  professionalExpectationShortTermB: string;
  professionalExpectationMediumTerm: string;
  professionalExpectationLongTerm: string;
  professionalExpectationNlOralLanguageScore: number;
  professionalExpectationNlWrittentLanguageScore: number;
  professionalExpectationFrOralLanguageScore: number;
  professionalExpectationFrWrittenLanguageScore: number;
  professionalExpectationItKnowledgeEmail: boolean;
  professionalExpectationItKnowledgeInternet: boolean;
  professionalExpectationItKnowledgeWord: boolean;
  bilanProfessions?: BilanProfessions;
}
