import { School } from "./School";

export interface ISchoolListVm {
  schools?: School[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class SchoolListVm implements ISchoolListVm {
  schools?: School[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  constructor(data?: SchoolListVm) {
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
        this.schools = [] as any;
        for (let item of data['items']) this.schools.push(School.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  static fromJS(data: any): SchoolListVm {
    data = typeof data === 'object' ? data : {};
    let result = new SchoolListVm();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.schools)) {
      data['items'] = [];
      for (let item of this.schools) data['items'].push(item.toJSON());
    }
    return data;
  }
}
