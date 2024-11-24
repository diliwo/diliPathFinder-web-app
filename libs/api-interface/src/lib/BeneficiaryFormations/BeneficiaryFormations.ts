import { BeneficiaryFormation } from "./BeneficiaryFormation";

// -- Beneficiary-Formation
export interface IBeneficiaryFormationListVm {
  registrations?: BeneficiaryFormation[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class BeneficiaryFormationListVm implements IBeneficiaryFormationListVm {
  registrations?: BeneficiaryFormation[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  static fromJS(data: any): BeneficiaryFormationListVm {
    data = typeof data === 'object' ? data : {};
    let result = new BeneficiaryFormationListVm();
    result.init(data);
    return result;
  }


  constructor(data?: BeneficiaryFormationListVm) {
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
        this.registrations = [] as any;
        for (let item of data['items'])
          this.registrations.push(BeneficiaryFormation.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.registrations)) {
      data['items'] = [];
      for (let item of this.registrations) data['items'].push(item.toJSON());
    }
    return data;
  }
}
