export interface IFormation {
  formationId?: number;
  name: string;
  trainingFieldId: number;
  fieldName: string;
}

export class Formation implements IFormation {
  formationId?: number;
  name: string;
  trainingFieldId: number;
  fieldName: string;

  static fromJS(data: any): Formation {
    data = typeof data === 'object' ? data : {};
    let result = new Formation();
    result.init(data);
    return result;
  }

  constructor(data?: Formation) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.formationId = data['formationId'];
      this.name = data['name'];
      this.trainingFieldId = data['trainingFieldId'];
      this.fieldName = data['trainingFieldName'];
    }
  }


  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['formationId'] = this.formationId;
    data['name'] = this.name;
    data['trainingFieldId'] = this.trainingFieldId;
    data['trainingFieldName'] = this.fieldName;
    return data;
  }
}
