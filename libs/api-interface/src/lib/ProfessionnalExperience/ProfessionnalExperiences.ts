import { ProfessionnalExperience } from "./ProfessionnalExperience";

export interface IProfessionnalExperiences {
  professionnalExperiences?: ProfessionnalExperience[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class ProfessionnalExperiences implements IProfessionnalExperiences {
  professionnalExperiences?: ProfessionnalExperience[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  static fromJS(data: any): ProfessionnalExperiences {
    data = typeof data === 'object' ? data : {};
    let result = new ProfessionnalExperiences();
    result.init(data);
    return result;
  }


  constructor(data?: ProfessionnalExperiences) {
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
        this.professionnalExperiences = [] as any;
        for (let item of data['items'])
          this.professionnalExperiences.push(ProfessionnalExperience.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.professionnalExperiences)) {
      data['items'] = [];
      for (let item of this.professionnalExperiences) data['items'].push(item.toJSON());
    }
    return data;
  }
}
