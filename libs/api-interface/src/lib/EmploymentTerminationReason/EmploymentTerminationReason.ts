export interface IEmploymentTerminationReason {
  id?: number;
  name: string;
}

export class EmploymentTerminationReason implements IEmploymentTerminationReason {
  id?: number;
  name: string;

  static fromJS(data: any): EmploymentTerminationReason {
    data = typeof data === 'object' ? data : {};
    let result = new EmploymentTerminationReason();
    result.init(data);
    return result;
  }

  constructor(data?: EmploymentTerminationReason) {
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
