export interface ITrainingField {
  id?: number;
  name: string;
}

export class TrainingField implements ITrainingField {
  id?: number;
  name: string;

  static fromJS(data: any): TrainingField {
    data = typeof data === 'object' ? data : {};
    let result = new TrainingField();
    result.init(data);
    return result;
  }

  constructor(data?: TrainingField) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.id = data['trainingFieldId'];
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
