export interface IPartnerSelections {
  partners?: PartnerSelection[] | undefined;
}

export class PartnerSelections implements IPartnerSelections {
  partners?: PartnerSelection[] | undefined;

  static fromJS(data: any): PartnerSelections {
    data = typeof data === 'object' ? data : {};
    let result = new PartnerSelections();
    result.init(data);
    return result;
  }

  constructor(data?: PartnerSelections) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['items'])) {
        this.partners = [] as any;
        for (let item of data['items'])
          this.partners!.push(PartnerSelection.fromJS(item));
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.partners)) {
      data['partners'] = [];
      for (let item of this.partners)
        data['partners'].push(item.toJSON());
    }
    return data;
  }
}
export interface IPartnerSelection {
  partnerId: number;
  name: string;
}

export class PartnerSelection implements IPartnerSelection {
  partnerId: number;
  name: string;

  static fromJS(data: any): PartnerSelection {
    data = typeof data === 'object' ? data : {};
    let result = new PartnerSelection();
    result.init(data);
    return result;
  }

  constructor(data?: IPartnerSelection) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.partnerId = data['partnerId'];
      this.name = data['name'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['partnerId'] = this.partnerId;
    data['name'] = this.name;
    return data;
  }
}
