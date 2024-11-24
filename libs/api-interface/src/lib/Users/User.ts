export interface IUser {
  id: number;
  idUser: number;
  userName: string;
  lastname: string;
  firstname: string;
  softDeleted: boolean;
}

export class User implements IUser {
  id: number;
  idUser: number;
  userName: string;
  lastname: string;
  firstname: string;
  softDeleted: boolean;

  constructor(data?: IUser) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.idUser = data['idUser'];
      this.userName = data['userName'];
      this.lastname = data['lastname'];
      this.firstname = data['firstname'];
      this.softDeleted = data['softDeleted'];
    }
  }

  static fromJS(data: any): User {
    data = typeof data === 'object' ? data : {};
    let result = new User();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['idUser'] = this.idUser;
    data['userName'] = this.userName;
    data['lastname'] = this.lastname;
    data['firstname'] = this.firstname;
    data['softDeleted'] = this.softDeleted;
    return data;
  }
}
