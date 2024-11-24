import { JobOccupant } from "./JobOccupant";

export interface IJobOccupants {
  occuppants?: JobOccupant[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class JobOccupants implements IJobOccupants {
  occuppants?: JobOccupant[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  static fromJS(data: any): JobOccupants {
    data = typeof data === 'object' ? data : {};
    let result = new JobOccupants();
    result.init(data);
    return result;
  }

  constructor(data?: JobOccupants) {
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
        this.occuppants = [] as any;
        for (let item of data['items']) this.occuppants.push(JobOccupant.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.occuppants)) {
      data['items'] = [];
      for (let item of this.occuppants) data['items'].push(item.toJSON());
    }
    return data;
  }
}
