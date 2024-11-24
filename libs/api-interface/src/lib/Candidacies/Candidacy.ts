import { EmploymentTerminationType } from "../EmploymentTerminationType/EmploymentTerminationType";
import { TerminationReasonsForEmployment } from "../TerminationReasonsForEmployment/TerminationReasonsForEmployment";
import { EmploymentStatusHistory } from "./EmploymentStatusHistory";

export interface ICandidacyDetail {
  candidacyId: number;
  jobOfferId: number;
  beneficiaryId: number;
  jobOfferInfo: string;
  isHired?: boolean;
  applicationDate: Date;
  isJobOfferClosed: boolean;
  employmentStatusHistory: EmploymentStatusHistory;
  threeMonHasPassed: boolean;
  employmentTerminationType: EmploymentTerminationType;
}

export class Candidacy implements ICandidacyDetail {
  candidacyId: number;
  jobOfferId: number;
  beneficiaryId: number;
  jobOfferInfo: string;
  isHired?: boolean;
  applicationDate: Date;
  isJobOfferClosed: boolean;
  jobOfferStartDate: Date;
  jobOfferEndDate: Date;
  jobRward: string;
  employmentStatusHistory: EmploymentStatusHistory;
  employmentTerminationType: EmploymentTerminationType;
  terminationReasonsForEmployment: TerminationReasonsForEmployment;

  threeMonHasPassed: boolean;

  static fromJS(data: any): Candidacy {
    data = typeof data === 'object' ? data : {};
    let result = new Candidacy();
    result.init(data);

    return result;
  }

  constructor(data?: Candidacy) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.candidacyId = data['candidacyId'];
      this.jobOfferId = data['jobOfferId'];
      this.beneficiaryId = data['beneficiaryId'];
      this.jobOfferInfo = data['jobOfferInfo'];
      this.isHired = data['isHired'];
      this.applicationDate = data['applicationDate'];
      this.isJobOfferClosed = data['isJobOfferClosed'];
      this.jobOfferStartDate = data['jobOfferStartDate'];
      this.jobOfferEndDate = data['jobOfferEndDate'];
      this.jobRward = data['jobRward'];
      this.employmentStatusHistory = EmploymentStatusHistory.fromJS(data['employmentStatusHistories']);
      this.employmentTerminationType = EmploymentTerminationType.fromJS(data['employmentTerminationType']);
      this.terminationReasonsForEmployment = TerminationReasonsForEmployment.fromJS(data['terminationReasonsForEmployment']);
      this.threeMonHasPassed = (this.employmentStatusHistory.items != null && this.employmentStatusHistory.items.length > 0) ? this.employmentStatusHistory.items[0].threeMonthHasPassed : false;
    }
  }

  toJSON(data?: any) {
    data['candidacyId'] = this.candidacyId;
    data['jobOfferId'] = this.jobOfferId;
    data['beneficiaryId'] = this.beneficiaryId;
    data['jobOfferInfo'] = this.jobOfferInfo;
    data['isHired'] = this.isHired;
    data['applicationDate'] = this.applicationDate;
    data['isJobOfferClosed'] = this.isJobOfferClosed;
    return data;
  }
}
