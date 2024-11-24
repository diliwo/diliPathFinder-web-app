import * as Tools from '../api-interface.module';

export interface IPartner {
  partnerId?: number | undefined;
  partnerNumber: number;
  name: string;
  streetNumber: string;
  streetName: string;
  boxNumber: string;
  streetPostalCode: string;
  streetCity: string;
  emails: string[];
  phones: string[];
  jobCoachId: number;
  jobCoachName: string;
  categoryOfPartnerName: string;
  categoryOfPartner: number;
  statusOfPartnerName: string;
  statusOfPartner: number;
  dateOfAgreementSignature: Date;
  isEconomieSociale: boolean;
  dateOfConclusion: Date;
  hasDocuments: boolean;
  note: string;
}

export class Partner implements IPartner {
  partnerId?: number | undefined;
  partnerNumber: number;
  name: string;
  streetNumber: string;
  streetName: string;
  boxNumber: string;
  streetPostalCode: string;
  streetCity: string;
  emails: string[];
  phones: string[];
  jobCoachId: number;
  jobCoachName: string;
  categoryOfPartnerName: string;
  categoryOfPartner: number;
  statusOfPartnerName: string;
  statusOfPartner: number;
  dateOfAgreementSignature: Date;
  note: string;
  isEconomieSociale: boolean;
  dateOfConclusion: Date;
  hasDocuments: boolean;

  static fromJS(data: any): Partner {
    data = typeof data === 'object' ? data : {};
    let result = new Partner();
    result.init(data);
    return result;
  }

  constructor(data?: Partner) {
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
      this.partnerNumber = data['partnerNumber'];
      this.name = data['name'];
      this.streetNumber = data['address']['number'];
      this.streetName = data['address']['street'];
      this.boxNumber = data['address']['boxNumber'];
      this.streetPostalCode = data['address']['postalCode'];
      this.streetCity = data['address']['city'];
      this.emails = data['emails'];
      this.phones = data['phones'];
      this.jobCoachId = data['jobCoachId'];
      this.jobCoachName = data['jobCoachName'];
      this.categoryOfPartnerName = Tools.CategoryOfPartnerConvertor(
        data['categoryOfPartner']
      );
      this.categoryOfPartner = data['categoryOfPartner'];
      this.statusOfPartnerName = Tools.StatutOfPartnerConvertor(
        data['statusOfPartner']
      );
      this.statusOfPartner = data['statusOfPartner'];
      this.dateOfAgreementSignature = data['dateOfAgreementSignature'];
      this.note = data['note'];
      this.isEconomieSociale = data['isEconomieSociale'];
      this.dateOfConclusion = data['dateOfConclusion'];
      this.hasDocuments = data['hasDocuments'];
    }
  }

  toJSON(data?: any) {
    data['partnerId'] = this.partnerId;
    data['partnerNumber'] = this.partnerNumber;
    data['name'] = this.name;
    data['address']['number'] = this.streetNumber;
    data['address']['street'] = this.streetName;
    data['address']['boxNumber'] = this.boxNumber;
    data['address']['postalCode'] = this.streetPostalCode;
    data['address']['city'] = this.streetCity;
    data['emails'] = this.emails;
    data['phones'] = this.phones;
    data['jobCoachId'] = this.jobCoachId;
    data['jobCoachName'] = this.jobCoachName;
    data['categoryOfPartner'] = this.categoryOfPartner;
    data['statusOfPartner'] = this.statusOfPartner;
    data['dateOfAgreementSignature'] = this.dateOfAgreementSignature;
    data['note'] = this.note;
    data['isEconomieSociale'] = this.isEconomieSociale;
    data['dateOfConclusion'] = this.dateOfConclusion;
    return data;
  }
}
