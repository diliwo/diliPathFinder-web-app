import { NatureOfContract } from "./NatureOfContract";

export interface INatureOfContracts {
  items?: NatureOfContract[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class NatureOfContracts implements INatureOfContracts {
  items?: NatureOfContract[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  static fromJS(data: any): NatureOfContracts {
    data = typeof data === 'object' ? data : {};
    let result = new NatureOfContracts();
    result.init(data);
    return result;
  }

  constructor(data?: NatureOfContracts) {
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
        this.items = [] as any;
        for (let item of data['items'])
          this.items.push(NatureOfContract.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data['items'] = [];
      for (let item of this.items) data['items'].push(item.toJSON());
    }
    return data;
  }
}
