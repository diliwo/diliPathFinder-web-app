export interface ISchool {
  schoolId?: number;
  name: string;
  locality: string;
}

export class School implements ISchool {
  schoolId?: number;
  name: string;
  locality: string;

  constructor(data?: School) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.schoolId = data['schoolId'];
      this.name = data['name'];
      this.locality = data['locality'];
    }
  }

  static fromJS(data: any): School {
    data = typeof data === 'object' ? data : {};
    let result = new School();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {
    data['schoolId'] = this.schoolId;
    data['name'] = this.name;
    data['locality'] = this.locality;
    return data;
  }
}
