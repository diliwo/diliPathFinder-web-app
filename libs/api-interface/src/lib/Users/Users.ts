import { User } from "./User";

export interface IUsers {
  users?: User[] | undefined;
}

export class Users implements IUsers {
  users?: User[] | undefined;

  static fromJS(data: any): Users {
    data = typeof data === 'object' ? data : {};
    let result = new Users();
    result.init(data);
    return result;
  }
  constructor(data?: IUsers) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['users'])) {
        this.users = [] as any;
        for (let item of data['users'])
          this.users!.push(User.fromJS(item));
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.users)) {
      data['users'] = [];
      for (let item of this.users)
        data['users'].push(item.toJSON());
    }
    return data;
  }
}
