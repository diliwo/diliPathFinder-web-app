import { StaffMember } from "../StaffMember/StaffMember";

export interface ITeam {
  id?: number | undefined;
  name: string;
  acronym: string;
  staffmemnbers?: any[] | undefined;
}

export class Team implements ITeam {
  id?: number | undefined;
  name: string;
  acronym: string;
  staffmemnbers?: any[] | undefined;

  constructor(data?: ITeam) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.id = data['id'];
      this.name = data['name'];
      this.acronym = data['acronym'];
      if (Array.isArray(data['StaffMembers'])) {
        this.staffmemnbers = [] as any;
        for (let item of data['StaffMembers'])
          this.staffmemnbers!.push(StaffMember.fromJS(item));
      }
    }
  }

  static fromJS(data: any): Team {
    data = typeof data === 'object' ? data : {};
    let result = new Team();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['name'] = this.name;
    data['acronym'] = this.acronym;
    if (Array.isArray(this.staffmemnbers)) {
      data['staffmembers'] = [];
      for (let item of this.staffmemnbers) data['staffmembers'].push(item.toJSON());
    }
    return data;
  }
}
