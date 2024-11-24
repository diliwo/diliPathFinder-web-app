export interface IJobOccupant {
  firstName: string;
  lastName: string;
  fullName: string;
  referenceNumber: string;
  startOccupationDate: Date;
  endOccupationDate: Date;
}

export class JobOccupant implements IJobOccupant {
  firstName: string;
  lastName: string;
  fullName: string;
  referenceNumber: string;
  startOccupationDate: Date;
  endOccupationDate: Date;

  static fromJS(data: any): JobOccupant {
    data = typeof data === 'object' ? data : {};
    let result = new JobOccupant();
    result.init(data);

    return result;
  }

  constructor(data?: JobOccupant) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.firstName = data['firstName'];
      this.lastName = data['lastName'];
      this.fullName = data['fullName'];
      this.referenceNumber = data['referenceNumber'];
      this.startOccupationDate = data['startOccupationDate'];
      this.endOccupationDate = data['endOccupationDate'];
    }
  }

  toJSON(data?: any) {
    data['firstName'] = this.firstName;
    data['lastName'] = this.lastName;
    data['fullName'] = this.fullName;
    data['referenceNumber'] = this.referenceNumber;
    data['startOccupationDate'] = this.startOccupationDate;
    data['endOccupationDate'] = this.endOccupationDate;
    return data;
  }
}
