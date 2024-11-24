//------ReasonOfClosures
export interface IReasonOfClosure {
  reason: string;
}

export class ReasonOfClosure implements IReasonOfClosure {
  reason: string;

  static fromJS(data: any): ReasonOfClosure {
    data = typeof data === 'object' ? data : {};
    let result = new ReasonOfClosure();
    result.init(data);
    return result;
  }


  constructor(data?: ReasonOfClosure) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.reason = data['reason'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['reason'] = this.reason;
    return data;
  }
}

