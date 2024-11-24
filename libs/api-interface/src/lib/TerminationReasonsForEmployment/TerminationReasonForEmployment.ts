export interface ITerminationReasonForEmployment {
  id?: number;
  name: string;
}

export class TerminationReasonForEmployment implements ITerminationReasonForEmployment {
  id: number;
  name: string;

  static fromJS(data: any): TerminationReasonForEmployment {
    data = typeof data === 'object' ? data : {};
    let result = new TerminationReasonForEmployment();
    result.init(data);
    return result;
  }

  constructor(data?: TerminationReasonForEmployment) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.id = data['employmentTerminationReasonId'];
      this.name = data['employmentTerminationReasonName'];
    }
  }


  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['employmentTerminationReasonId'] = this.id;
    data['employmentTerminationReasonName'] = this.name;
    return data;
  }
}
