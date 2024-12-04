export interface IStaffMember {
  id?: number | undefined;
  firstname: string;
  lastname: string;
  serviceId?: number;
  servicename: string;
  serviceAcronymName: string;
  username:string;
}

export class StaffMember implements IStaffMember {
  id?: number;
  firstname: string;
  lastname: string;
  fullname: string;
  serviceId?: number;
  servicename: string;
  serviceAcronymName: string;
  username:string;

  constructor(data?: IStaffMember) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.id = data['id'];
      this.firstname = data['firstName'];
      this.lastname = data['lastName'];
      this.serviceId = data['serviceId'];
      this.servicename = data['serviceName'];
      this.serviceAcronymName = data['serviceAcronymName'];
      this.username = data['userName'];
      this.fullname = this.lastname +" "+this.firstname;
    }
  }

  static fromJS(data: any): StaffMember {
    data = typeof data === 'object' ? data : {};
    let result = new StaffMember();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['firstName'] = this.firstname;
    data['lastName'] = this.lastname;
    data['serviceId'] = this.serviceId;
    data['serviceName'] = this.servicename;
    data['serviceAcronymName'] = this.serviceAcronymName;
    data['userName'] = this.username;
    return data;
  }
}
