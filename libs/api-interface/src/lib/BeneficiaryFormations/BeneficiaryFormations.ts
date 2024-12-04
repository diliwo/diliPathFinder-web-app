import { clienttraining } from "./clienttraining";

// -- client-training
export interface IclienttrainingListVm {
  registrations?: clienttraining[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class clienttrainingListVm implements IclienttrainingListVm {
  registrations?: clienttraining[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  static fromJS(data: any): clienttrainingListVm {
    data = typeof data === 'object' ? data : {};
    let result = new clienttrainingListVm();
    result.init(data);
    return result;
  }


  constructor(data?: clienttrainingListVm) {
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
          this.registrations.push(clienttraining.fromJS(item));
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
