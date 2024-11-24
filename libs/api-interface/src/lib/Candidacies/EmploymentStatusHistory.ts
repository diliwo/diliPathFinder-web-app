import { EmploymentStatusItem } from "./EmploymentStatusItem";

export interface IEmploymentStatusHistory {
  items?: EmploymentStatusItem[] | undefined;
}

export class EmploymentStatusHistory implements IEmploymentStatusHistory {
  items?: EmploymentStatusItem[] | undefined;

  static fromJS(data: any): EmploymentStatusHistory {
    data = typeof data === 'object' ? data : {};
    let result = new EmploymentStatusHistory();
    result.init(data);
    return result;
  }
  constructor(data?: IEmploymentStatusHistory) {
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
          this.items!.push(EmploymentStatusItem.fromJS(item));
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data['employmentStatusHistories'] = [];
      for (let item of this.items)
        data['employmentStatusHistories'].push(item.toJSON());
    }
    return data;
  }
}
