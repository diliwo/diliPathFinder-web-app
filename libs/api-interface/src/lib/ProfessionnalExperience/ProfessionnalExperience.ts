// -- ProfessionnalExperience
interface IProfessionnalExperience {
  professionalExperienceId?: number | undefined;
  startDate: Date;
  endDate: Date;
  companyName: string;
  function: string;
  task: string;
  environment: string;
  contextOfHiring: string;
  natureOfContractId: number;
  natureOfContractName: string;
  reasonEndOfContract: string;
  clientId: number;
}

export class ProfessionnalExperience implements IProfessionnalExperience {
  professionalExperienceId?: number | undefined;
  startDate: Date;
  endDate: Date;
  companyName: string;
  function: string;
  task: string;
  environment: string;
  contextOfHiring: string;
  natureOfContractId: number;
  natureOfContractName: string;
  reasonEndOfContract: string;
  clientId: number;

  static fromJS(data: any): ProfessionnalExperience {
    data = typeof data === 'object' ? data : {};
    let result = new ProfessionnalExperience();
    result.init(data);

    return result;
  }

  constructor(data?: ProfessionnalExperience) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.professionalExperienceId = data['professionalExperienceId'];
      this.startDate = data['startDate'];
      this.endDate = data['endDate'];
      this.companyName = data['companyName'];
      this.function = data['function'];
      this.task = data['task'];
      this.environment = data['environment'];
      this.contextOfHiring = data['contextOfHiring'];
      this.natureOfContractId = data['natureOfContractId'];
      this.natureOfContractName = data['natureOfContractName'];
      this.reasonEndOfContract = data['reasonEndOfContract'];
      this.clientId = data['clientId'];
    }
  }

  toJSON(data?: any) {
    data['professionalExperienceId'] = this.professionalExperienceId;
    data['startDate'] = this.startDate;
    data['endDate'] = this.endDate;
    data['companyName'] = this.companyName;
    data['function'] = this.function;
    data['task'] = this.task;
    data['environment'] = this.environment;
    data['contextOfHiring'] = this.contextOfHiring;
    data['natureOfContractId'] = this.natureOfContractId;
    data['natureOfContractName'] = this.natureOfContractName;
    data['reasonEndOfContract'] = this.reasonEndOfContract;
    data['clientId'] = this.clientId;
    return data;
  }
}
