import { TrainingField } from "./TrainingField";

export interface ITrainingFields {
  items?: TrainingField[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class TrainingFields implements ITrainingFields {
  items?: TrainingField[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  static fromJS(data: any): TrainingFields {
    data = typeof data === 'object' ? data : {};
    let result = new TrainingFields();
    result.init(data);
    return result;
  }

  constructor(data?: TrainingFields) {
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
          this.items.push(TrainingField.fromJS(item));
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
