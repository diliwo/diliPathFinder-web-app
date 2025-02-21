export interface IEmploymentTerminationType {
  id?: number;
  name: string;
}

export class EmploymentTerminationType implements IEmploymentTerminationType {
  id?: number;
  name: string;

  static fromJS(data: any): EmploymentTerminationType {
    data = typeof data === 'object' ? data : {};
    let result = new EmploymentTerminationType();
    result.init(data);
    return result;
  }

  constructor(data?: EmploymentTerminationType) {
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
      this.name = data['name'];
    }
  }


  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['name'] = this.name;
    return data;
  }
}
