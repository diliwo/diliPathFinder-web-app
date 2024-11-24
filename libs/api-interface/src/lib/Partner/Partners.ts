import { Partner } from "./Partner";

export interface IPartnersListVm {
  partners?: Partner[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class PartnersListVm implements IPartnersListVm {
  partners?: Partner[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  constructor(data?: IPartnersListVm) {
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
        this.partners = [] as any;
        for (let item of data['items'])
          this.partners.push(Partner.fromJS(item));
      }
      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  static fromJS(data: any): PartnersListVm {
    data = typeof data === 'object' ? data : {};
    let result = new PartnersListVm();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.partners)) {
      data['partners'] = [];
      for (let item of this.partners) data['partners'].push(item.toJSON());
    }
    data['sortOrder'] = this.sortOrder;
    data['pageNumber'] = this.pageNumber;
    data['pageSize'] = this.pageSize;
    data['totalCount'] = this.totalCount;
    return data;
  }
}
