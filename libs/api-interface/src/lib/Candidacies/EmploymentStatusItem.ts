
export interface IEmploymentStatusItem {
  employmentStatusName?: string;
  employmentStatus: number;
  startDate: Date;
  threeMonthHasPassed: boolean;
}

export class EmploymentStatusItem implements IEmploymentStatusItem {
  employmentStatusName?: string;
  employmentStatus: number;
  startDate: Date;
  threeMonthHasPassed: boolean;

  static fromJS(data: any): EmploymentStatusItem {
    data = typeof data === 'object' ? data : {};
    let result = new EmploymentStatusItem();
    result.init(data);
    return result;
  }

  constructor(data?: IEmploymentStatusItem) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.employmentStatus = data['employmentStatus']
      this.employmentStatusName = data['employmentStatusName'];
      this.startDate = new Date(data['startDate']);
      this.threeMonthHasPassed = data['threeMonthHasPassed'];
    }
  }


  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['employmentStatus'] = this.employmentStatus;
    data['startDate'] = this.startDate;
    return data;
  }
}
