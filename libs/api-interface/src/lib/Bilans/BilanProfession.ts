interface IBilanProfession {
  bilanProfessionId: any | number;
  professionTitle: string;
  bilanId: any | number;
  professionId: any | number;
  acquiredKnowledge: any | string;
  acquiredBehaviouralKnowledge: any | string;
  acquiredKnowHow: any | string;
  knowledgeToDevelop: any | string;
  behaviouralKnowledgeToDevelop: any | string;
  knowHowToDevelop: any | string;
}

export class BilanProfession implements IBilanProfession{
  bilanProfessionId: any | number;
  professionTitle: string;
  bilanId: any | number;
  professionId: any | number;
  acquiredKnowledge: any | string;
  acquiredBehaviouralKnowledge: any | string;
  acquiredKnowHow: any | string;
  knowledgeToDevelop: any | string;
  behaviouralKnowledgeToDevelop: any | string;
  knowHowToDevelop: any | string;

  constructor(data?: BilanProfession) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.bilanProfessionId= data['bilanProfessionId'];
      this.professionTitle= data['professionTitle'];
      this.bilanId= data['bilanId'];
      this.professionId= data['professionId'];
      this.acquiredKnowledge= data['acquiredKnowledge'];
      this.acquiredBehaviouralKnowledge= data['acquiredBehaviouralKnowledge'];
      this.acquiredKnowHow= data['acquiredKnowHow'];
      this.knowledgeToDevelop= data['knowledgeToDevelop'];
      this.behaviouralKnowledgeToDevelop= data['behaviouralKnowledgeToDevelop'];
      this.knowHowToDevelop= data['knowHowToDevelop'];
    }
  }

  static fromJS(data: any): BilanProfession {
    data = typeof data === 'object' ? data : {};
    let result = new BilanProfession();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {

    data['bilanProfessionId']=this.bilanProfessionId;
    data['bilanId']=this.bilanId;
    data['professionId']=this.professionId;
    data['acquiredKnowledge']=this.acquiredKnowledge;
    data['acquiredBehaviouralKnowledge']=this.acquiredBehaviouralKnowledge;
    data['acquiredKnowHow']=this.acquiredKnowHow;
    data['knowledgeToDevelop']=this.knowledgeToDevelop;
    data['behaviouralKnowledgeToDevelop']=this.behaviouralKnowledgeToDevelop;
    data['knowHowToDevelop']=this.knowHowToDevelop;
    return data;
  }
}

export interface IBilanProfessions {
  list: BilanProfession[];
}

export class BilanProfessions implements IBilanProfessions {
  list: BilanProfession[] = [];

  constructor(data?: BilanProfessions) {
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
        this.list = [] as any;
        for (let item of data)
          this.list?.push(BilanProfession.fromJS(item));
      }
    }
  }

  static fromJS(data: any): BilanProfessions {
    data = typeof data === 'object' ? data : {};
    let result = new BilanProfessions();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.list)) {
      data = [];
      for (let item of this.list) data.push(item.toJSON());
    }
    return data;
  }
}
