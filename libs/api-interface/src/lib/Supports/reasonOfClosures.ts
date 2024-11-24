import { ReasonOfClosure } from "./reasonOfClosure";

export interface IReasonOfClosures {
  items?: ReasonOfClosure[] | undefined;
}

export class ReasonOfClosures implements IReasonOfClosures {
  items?: ReasonOfClosure[] | undefined;

  static fromJS(data: any): ReasonOfClosures {
    data = typeof data === 'object' ? data : {};
    let result = new ReasonOfClosures();
    result.init(data);
    return result;
  }

  constructor(data?: ReasonOfClosures) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data)) {
        this.items = [] as any;
        for (let item of data)
          this.items!.push(ReasonOfClosure.fromJS(item));
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data = [];
      for (let item of this.items)
        data.push(item.toJSON());
    }
    return data;
  }
}
