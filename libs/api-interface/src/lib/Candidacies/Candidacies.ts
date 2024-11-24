import { Candidacy } from "./Candidacy";

export interface ICandidaciesListVm {
  candidacies?: Candidacy[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class CandidaciesListVm implements ICandidaciesListVm {
  candidacies?: Candidacy[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  constructor(data?: CandidaciesListVm) {
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
        this.candidacies = [] as any;
        for (let item of data['items'])
          this.candidacies.push(Candidacy.fromJS(item));
      }
      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];

    }
  }

  static fromJS(data: any): CandidaciesListVm {
    data = typeof data === 'object' ? data : {};
    let result = new CandidaciesListVm();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.candidacies)) {
      data['candidacies'] = [];
      for (let item of this.candidacies)
        data['candidacies'].push(item.toJSON());
    }
    return data;
  }
}
