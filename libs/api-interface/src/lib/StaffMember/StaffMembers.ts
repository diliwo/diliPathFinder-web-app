import { StaffMember } from "./StaffMember";

export interface StaffMembers {
  staffMembers?: StaffMember[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class StaffMembers implements StaffMembers {
  StaffMembers?: StaffMember[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  constructor(data?: StaffMembers) {
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
        this.StaffMembers = [] as any;
        for (let item of data['items'])
          this.StaffMembers.push(StaffMember.fromJS(item));
      }
      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  static fromJS(data: any): StaffMembers {
    data = typeof data === 'object' ? data : {};
    let result = new StaffMembers();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.StaffMembers)) {
      data['staffMembes'] = [];
      for (let item of this.StaffMembers) data['staffMembes'].push(item.toJSON());
    }
    return data;
  }
}
