import { Team } from "./Team";

export interface ITeams {
  teams: Team[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class Teams implements ITeams {
  teams: Team[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  constructor(data?: ITeams) {
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
        this.teams = [] as any;
        for (let item of data['items'])
          this.teams.push(Team.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  static fromJS(data: any): Teams {
    data = typeof data === 'object' ? data : {};
    let result = new Teams();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.teams)) {
      data['teams'] = [];
      for (let item of this.teams) data['teams'].push(item.toJSON());
    }
    return data;
  }
}
