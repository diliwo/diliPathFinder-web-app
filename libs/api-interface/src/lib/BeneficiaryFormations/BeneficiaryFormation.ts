import { LevelConvertor, ResultConvertor } from "../api-interface.module";

export interface IBeneficiaryFormation {
  schoolRegistrationId?: number;
  formationId: number;
  formationName: string;
  schoolId: number;
  schoolName: string;
  trainingTypeId: number;
  trainingTypeName: string;
  beneficiaryId: number;
  beneficiaryName: string;
  startDate: Date;
  enDate: Date;
  courseLevel: number;
  courseLevelName: string;
  schoolResult: number;
  schoolResultName: string;
  note?: string;
}

export class BeneficiaryFormation implements IBeneficiaryFormation {
  schoolRegistrationId?: number;
  formationId: number;
  formationName: string;
  schoolId: number;
  schoolName: string;
  trainingTypeId: number;
  trainingTypeName: string;
  beneficiaryId: number;
  beneficiaryName: string;
  startDate: Date;
  enDate: Date;
  courseLevel: number;
  courseLevelName: string;
  schoolResult: number;
  schoolResultName: string;
  note?: string;

  static fromJS(data: any): BeneficiaryFormation {
    data = typeof data === 'object' ? data : {};
    let result = new BeneficiaryFormation();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {
    data['schoolRegistrationId'] = this.schoolRegistrationId;
    data['formationId'] = this.formationId;
    data['beneficiaryId'] = this.beneficiaryId;
    data['startDate'] = this.startDate;
    data['enDate'] = this.enDate;
    data['courseLevel'] = this.courseLevel;
    data['schoolResult'] = this.schoolResult;
    data['note'] = this.note;
    return data;
  }

  constructor(data?: BeneficiaryFormation) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.schoolRegistrationId = data['schoolRegistrationId'];
      this.formationId = data['formationId'];
      this.formationName = data['formationName'];
      this.schoolId= data['schoolId'];
      this.schoolName= data['schoolName'];
      this.trainingTypeId= data['trainingTypeId'];
      this.trainingTypeName= data['trainingTypeName'];
      this.beneficiaryId = data['beneficiaryId'];
      this.beneficiaryName = data['beneficiaryName'];
      this.startDate = data['startDate'];
      this.enDate = data['enDate'];
      this.courseLevel = data['courseLevel'];
      this.courseLevelName = LevelConvertor(data['courseLevel']);
      this.schoolResult = data['result'];
      this.schoolResultName = ResultConvertor(data['result']);
      this.note = data['note'];
    }
  }
}
