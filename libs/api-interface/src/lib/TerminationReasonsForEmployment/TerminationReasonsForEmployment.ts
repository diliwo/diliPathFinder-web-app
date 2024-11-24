import { TerminationReasonForEmployment } from "./TerminationReasonForEmployment";

export interface ITerminationReasonsForEmployment {
  items?: TerminationReasonForEmployment[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class TerminationReasonsForEmployment implements ITerminationReasonsForEmployment {
  items?: TerminationReasonForEmployment[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  static fromJS(data: any): TerminationReasonsForEmployment {
    data = typeof data === 'object' ? data : {};
    let result = new TerminationReasonsForEmployment();
    result.init(data);
    return result;
  }

  constructor(data?: TerminationReasonsForEmployment) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data)) {
        this.items = [] as any;
        for (let item of data)
          this.items.push(TerminationReasonForEmployment.fromJS(item));
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
      for (let item of this.items) data['terminationReasonsForEmployment'].push(item.toJSON());
    }
    return data;
  }
}
