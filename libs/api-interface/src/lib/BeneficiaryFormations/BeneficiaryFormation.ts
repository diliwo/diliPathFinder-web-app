import { LevelConvertor, ResultConvertor } from "../api-interface.module";

export interface Iclienttraining {
  schoolRegistrationId?: number;
  trainingId: number;
  trainingName: string;
  schoolId: number;
  schoolName: string;
  trainingTypeId: number;
  trainingTypeName: string;
  clientId: number;
  clientName: string;
  startDate: Date;
  enDate: Date;
  courseLevel: number;
  courseLevelName: string;
  schoolResult: number;
  schoolResultName: string;
  note?: string;
}

export class clienttraining implements Iclienttraining {
  schoolRegistrationId?: number;
  trainingId: number;
  trainingName: string;
  schoolId: number;
  schoolName: string;
  trainingTypeId: number;
  trainingTypeName: string;
  clientId: number;
  clientName: string;
  startDate: Date;
  enDate: Date;
  courseLevel: number;
  courseLevelName: string;
  schoolResult: number;
  schoolResultName: string;
  note?: string;

  static fromJS(data: any): clienttraining {
    data = typeof data === 'object' ? data : {};
    let result = new clienttraining();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {
    data['schoolRegistrationId'] = this.schoolRegistrationId;
    data['trainingId'] = this.trainingId;
    data['clientId'] = this.clientId;
    data['startDate'] = this.startDate;
    data['enDate'] = this.enDate;
    data['courseLevel'] = this.courseLevel;
    data['schoolResult'] = this.schoolResult;
    data['note'] = this.note;
    return data;
  }

  constructor(data?: clienttraining) {
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
      this.trainingId = data['trainingId'];
      this.trainingName = data['trainingName'];
      this.schoolId= data['schoolId'];
      this.schoolName= data['schoolName'];
      this.trainingTypeId= data['trainingTypeId'];
      this.trainingTypeName= data['trainingTypeName'];
      this.clientId = data['clientId'];
      this.clientName = data['clientName'];
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
