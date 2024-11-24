interface IProfession {
  professionId?: number;
  name: string;
}

export class Profession implements IProfession {
  professionId?: number;
  name: string;

  constructor(data?: Profession) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.professionId = data['professionId'];
      this.name = data['name'];
    }
  }

  static fromJS(data: any): Profession {
    data = typeof data === 'object' ? data : {};
    let result = new Profession();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {
    data['professionId'] = this.professionId;
    data['name'] = this.name;
    return data;
  }
}

interface IProfessionList {
  professions?: Profession[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class ProfessionList implements IProfessionList {
  professions?: Profession[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  constructor(data?: ProfessionList) {
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
        this.professions = [] as any;
        for (let item of data['items']) this.professions.push(Profession.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  static fromJS(data: any): ProfessionList {
    data = typeof data === 'object' ? data : {};
    let result = new ProfessionList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.professions)) {
      data['items'] = [];
      for (let item of this.professions) data['items'].push(item.toJSON());
    }
    return data;
  }
}
