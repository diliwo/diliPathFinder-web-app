export interface ITraining {
  trainingId?: number;
  name: string;
  trainingFieldId: number;
  fieldName: string;
}

export class Training implements ITraining {
  id?: number;
  name: string;
  trainingFieldId: number;
  fieldName: string;

  static fromJS(data: any): Training {
    data = typeof data === 'object' ? data : {};
    let result = new Training();
    result.init(data);
    return result;
  }

  constructor(data?: Training) {
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
      this.trainingFieldId = data['trainingFieldId'];
      this.fieldName = data['trainingFieldName'];
    }
  }


  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['trainingId'] = this.id;
    data['name'] = this.name;
    data['trainingFieldId'] = this.trainingFieldId;
    data['trainingFieldName'] = this.fieldName;
    return data;
  }
}
