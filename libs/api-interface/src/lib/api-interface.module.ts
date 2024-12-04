import { result } from "lodash-es";
import { Bilan } from "./Bilans/BilanMv";
import { EmploymentStatusItem } from "./Candidacies/EmploymentStatusItem";


// Roles
export class Roles {
  lists?: string[] | undefined;

  static fromJS(data: any): Roles {
    data = typeof data === 'object' ? data : {};
    let result = new Roles();
    result.init(data);
    return result;
  }

  constructor(data?: any) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
      if (data) {
          this.lists = [] as any;
          if (Array.isArray(data['role'])) {
            for (let item of data['role'])
              this.lists.push(item);
          } else {
              let item = data['role'];
              this.lists.push(item);
          }
      }
  }
}

// My supports
export interface IMyJobCoachSupportsList {
  myJobCoachSupportsList?: MyJobCoachSupport[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class MyJobCoachSupportsList implements IMyJobCoachSupportsList {
  myJobCoachSupportsList?: MyJobCoachSupport[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  static fromJS(data: any): MyJobCoachSupportsList {
    data = typeof data === 'object' ? data : {};
    let result = new MyJobCoachSupportsList();
    result.init(data);
    return result;
  }

  constructor(data?: MyJobCoachSupportsList) {
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
        this.myJobCoachSupportsList = [] as any;
        for (let item of data['items'])
          this.myJobCoachSupportsList.push(MyJobCoachSupport.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.myJobCoachSupportsList)) {
      data['items'] = [];
      for (let item of this.myJobCoachSupportsList) data['items'].push(item.toJSON());
    }
    return data;
  }
}
export interface IMyJobCoachSupport {
  clientId: number;
  clientReferenceNumber:string;
  clientfullname:string;
  clientLastName:string;
  clientNiss:string;
  clientPhoneNumber:string;
  hasChildren:boolean;
  dateLastStartContract:Date;
  dateLastEndContract:Date;
  workplace:string;
  dateLastQuartelyEvaluation:string;
  clientContactLanguage:string;
  comment:string;
}
export class MyJobCoachSupport implements IMyJobCoachSupport{
  clientId: number;
  clientReferenceNumber:string;
  clientfullname:string;
  clientLastName:string;
  clientNiss:string;
  clientPhoneNumber:string;
  hasChildren:boolean;
  dateLastStartContract:Date;
  dateLastEndContract:Date;
  workplace:string;
  dateLastQuartelyEvaluation:string;
  clientContactLanguage:string;
  comment:string;

  constructor(data?: MyJobCoachSupport) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.clientId= data['clientId'];
      this.clientReferenceNumber= data['clientReferenceNumber'];
      this.clientfullname= data['clientFullName'];
      this.clientLastName= data['clientLastName'];
      this.clientNiss = data['clientNiss'];
      this.clientPhoneNumber = data['clientPhoneNumber'];
      this.hasChildren = data['hasChildren'];
      this.dateLastStartContract = data['dateLastStartContract'];
      this.dateLastEndContract = data['dateLastEndContract'];
      this.workplace = data['workplace'];
      this.dateLastQuartelyEvaluation = data['dateLastQuartelyEvaluation'];
      this.clientContactLanguage = data['clientContactLanguage'];
      this.comment= data['comment'];
    }
  }

  static fromJS(data: any): MyJobCoachSupport {
    data = typeof data === 'object' ? data : {};
    let result = new MyJobCoachSupport();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {
    data['clientId'] =this.clientId;
    data['clientReferenceNumber'] = this.clientReferenceNumber;
    data['clientfullname'] = this.clientfullname;
    data['clientLastName'] = this.clientLastName;
    data['clientNiss'] = this.clientNiss;
    return data;
  }
}

export interface IMySupportsList {
  IntegrationWorker?: IntegrationWorker[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class MySupportsList implements IMySupportsList {
  mySupportsList?: MySupport[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  constructor(data?: MySupportsList) {
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
        this.mySupportsList = [] as any;
        for (let item of data['items'])
          this.mySupportsList.push(MySupport.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  static fromJS(data: any): MySupportsList {
    data = typeof data === 'object' ? data : {};
    let result = new MySupportsList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.mySupportsList)) {
      data['items'] = [];
      for (let item of this.mySupportsList) data['items'].push(item.toJSON());
    }
    return data;
  }
}
export interface IMySupport {
  clientId: number;
  clientReferenceNumber:string;
  clientfullname:string;
  clientLastName:string;
  clientNiss:string;
  clientPhoneNumber:string;
  clientNativeLanguage:string;
  clientContactLanguage:string;
  lastAction:string;
  hasChildren:boolean;
  projects:string;
  lastAppointment:Date;
  lastEvaluationDate:Date;
  comment:string;
}

export class MySupport implements IMySupport{
  clientId: number;
  clientReferenceNumber:string;
  clientfullname:string;
  clientLastName:string;
  clientNiss:string;
  clientPhoneNumber:string;
  clientNativeLanguage:string;
  clientContactLanguage:string;
  lastAction:string;
  hasChildren:boolean;
  projects:string;
  lastAppointment:Date;
  lastEvaluationDate:Date;
  comment:string;

  static fromJS(data: any): MySupport {
    data = typeof data === 'object' ? data : {};
    let result = new MySupport();
    result.init(data);

    return result;
  }

  constructor(data?: MySupport) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.clientId= data['clientId'];
      this.clientReferenceNumber= data['clientReferenceNumber'];
      this.clientfullname= data['clientFullName'];
      this.clientLastName= data['clientLastName'];
      this.clientNiss = data['clientNiss'];
      this.clientPhoneNumber = data['clientPhoneNumber'];
      this.clientNativeLanguage = data['clientNativeLanguage'];
      this.clientContactLanguage = data['clientContactLanguage'];
      this.hasChildren = data['hasChildren'];
      this.lastAction = data['lastAction'];
      this.projects= ConvertProjectsToString(data['projects']);
      this.lastAppointment= data['lastApppointmentDate'];
      this.lastEvaluationDate= data['lastEvaluationDate'];
      this.comment= data['comment'];
    }
  }

  toJSON(data?: any) {
    data['clientId'] =this.clientId;
    data['clientReferenceNumber'] = this.clientReferenceNumber;
    data['clientfullname'] = this.clientfullname;
    data['clientLastName'] = this.clientLastName;
    data['clientNiss'] = this.clientNiss;
    return data;
  }
}

// -- IntegrationJob

export interface IIntegrationWorkers {
  IntegrationWorker?: IntegrationWorker[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class IntegrationWorkers implements IIntegrationWorkers {
  integrationWorkers?: IntegrationWorker[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  static fromJS(data: any): IntegrationWorkers {
    data = typeof data === 'object' ? data : {};
    let result = new IntegrationWorkers();
    result.init(data);
    return result;
  }

  constructor(data?: IntegrationWorkers) {
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
        this.integrationWorkers = [] as any;
        for (let item of data['items'])
          this.integrationWorkers.push(IntegrationWorker.fromJS(item));
      }

      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.integrationWorkers)) {
      data['items'] = [];
      for (let item of this.integrationWorkers) data['items'].push(item.toJSON());
    }
    return data;
  }
}

export interface IIntegrationWorker {
  clientId: number;
  clientName: string;
  clientBirthDate: Date;
  clientGender: string;
  benenficiaryAddress: string;
  clientNiss: string;
  clientReferenceNumber: string;
  clientCivilStatus: string;
  partnerNumber: string;
  partnerName: string;
  partnerPostalCode: string;
  StaffMemberName: string;
  startContratDate:Date;
  endContratDate?: Date;
  jobReward: string;
  jobNumber: string;
  jobProfile: string;
}

export class IntegrationWorker implements IIntegrationWorker{
  clientId: number;
  clientName: string;
  clientBirthDate: Date;
  clientGender: string;
  benenficiaryAddress: string;
  clientNiss: string;
  clientReferenceNumber: string;
  clientCivilStatus: string;
  partnerNumber: string;
  partnerName: string;
  partnerPostalCode: string;
  StaffMemberName: string;
  startContratDate: Date;
  endContratDate?: Date;
  jobReward: string;
  jobNumber: string;
  jobProfile: string;

  constructor(data?: Bilan) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.clientId= data['clientId'];
      this.clientName= data['clientName'];
      this.clientBirthDate= data['clientBirthDate'];
      this.clientGender= data['clientGender'];
      this.benenficiaryAddress=data['benenficiaryAddress'];
      this.clientNiss= data['clientNiss'];
      this.clientReferenceNumber= data['clientReferenceNumber'];
      this.clientCivilStatus= data['clientCivilStatus'];
      this.partnerNumber = data['partnerNumber'];
      this.partnerName = data['partnerName'];
      this.partnerPostalCode = data['partnerPostalCode'];
      this.StaffMemberName = data['StaffMemberName'];
      this.startContratDate = data['startContratDate'];
      this.endContratDate = data['endContratDate'];
      this.jobReward = data['jobReward'];
      this.jobNumber = data['jobNumber'];
      this.jobProfile = data['jobProfile'];
    }
  }

  static fromJS(data: any): IntegrationWorker {
    data = typeof data === 'object' ? data : {};
    let result = new IntegrationWorker();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {
    data['clientId'] = this.clientId;
    data['clientName'] = this.clientName;
      data['clientBirthDate'] = this.clientBirthDate;
      data['clientGender'] = this.clientGender;
      data['benenficiaryAddress'] = this.benenficiaryAddress;
      data['clientNiss'] = this.clientNiss;
      data['clientReferenceNumber'] = this.clientReferenceNumber
      data['clientCivilStatus'] = this.clientCivilStatus
      data['partnerNumber'] = this.partnerNumber;
      data['partnerName'] = this.partnerName;
      data['partnerPostalCode'] = this.partnerPostalCode;
      data['StaffMemberName'] = this.StaffMemberName;
      data['startContratDate'] = this.startContratDate;
      data['endContratDate'] = this.endContratDate;
      data['jobReward'] = this.jobReward;
      data['jobNumber'] = this.jobNumber;
      data['jobProfile'] = this.jobProfile;
    return data;
  }
}

// -- Home Data
export interface IHome {
  quantities: Map<string, number>;
}

export class Home implements IHome {
  quantities: Map<string, number>;

  constructor(data?: Home) {
    this.quantities = new Map<string, number>();
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.quantities.set('emplois', data['numberOfJobs']);
      this.quantities.set('partenaires', data['numberOfPartners']);
      this.quantities.set('trainings', data['numberOftrainings']);
      this.quantities.set('insertions', data['numberOfIntegrations']);
      this.quantities.set('beneficiaires', data['numberOfMySupports']);
    }
  }
  static fromJS(data: any): Home {
    data = typeof data === 'object' ? data : {};
    let result = new Home();
    result.init(data);

    return result;
  }
}

//----------Start Document
export interface IDocument {
  documentId?: number;
  jobId: number;
  partnerId: number;
  name: string;
  description: string;
  contentType: string;
  contentFile: string;
}

export class DocumentDetail implements IDocument {
  documentId?: number;
  jobId: number;
  partnerId: number;
  bilanId: number;
  name: string;
  description: string;
  contentType: string;
  contentFile: string;

  constructor(data?: DocumentDetail) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.documentId = data['documentPartnerId'];
      this.jobId = data['jobId'];
      this.partnerId = data['partnerId'];
      this.name = data['name'];
      this.description = data['description'];
      this.contentType = data['contentType'];
      this.contentFile = data['contentFile'];
    }
  }

  static fromJS(data: any): DocumentDetail {
    data = typeof data === 'object' ? data : {};
    let result = new DocumentDetail();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {
    data['documentPartnerId'] = this.documentId;
    data['jobId'] = this.jobId;
    data['partnerId'] = this.partnerId;
    data['name'] = this.name;
    data['description'] = this.description;
    data['contentType'] = this.contentType;
    data['contentFile'] = this.contentFile;

    return data;
  }
}

export interface IDocumentListVm {
  documents?: DocumentDetail[] | undefined;
}

export class DocumentListVm implements IDocumentListVm {
  documents?: DocumentDetail[] | undefined;

  constructor(data?: DocumentListVm) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['documentPartners'])) {
        this.documents = [] as any;
        for (let item of data['documentPartners'])
          this.documents.push(DocumentDetail.fromJS(item));
      }
    }
  }

  static fromJS(data: any): DocumentListVm {
    data = typeof data === 'object' ? data : {};
    let result = new DocumentListVm();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.documents)) {
      data['documentPartners'] = [];
      for (let item of this.documents)
        data['documentPartners'].push(item.toJSON());
    }
    return data;
  }
}

//-----------Start JobOffer
export interface IJobOfferDetail {
  jobOfferId?: number | undefined;
  candidacyId?: number | undefined;
  jobOfferNumber?: number;
  vacancyDate?: Date;
  startOccupationDate?: Date;
  endOccupationDate?: Date;
  clientId?: number;
  clientName?: string;
  jobId?: number;
  statusOfJobOffer?: string;
  statusOfJobOfferId?: number;
  employmentStatus?: EmploymentStatusItem;
  jobInfo: string;
}

export class JobOfferDetail implements IJobOfferDetail {
  jobOfferId?: number | undefined;
  candidacyId?: number | undefined;
  jobOfferNumber?: number;
  vacancyDate?: Date;
  startOccupationDate?: Date;
  endOccupationDate?: Date;
  jobId?: number;
  statusOfJobOffer?: string;
  statusOfJobOfferId?: number;
  employmentStatusItem?: EmploymentStatusItem;
  jobInfo: string;

  constructor(data?: JobOfferDetail) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.jobOfferId = data['jobOfferId'];
      this.jobOfferNumber = +data['jobOfferNumber'];
      this.vacancyDate = data['vacancyDate'];
      this.startOccupationDate = data['startOccupationDate'];
      this.endOccupationDate = data['endOccupationDate'];
      this.jobId = data['jobId'];
      this.jobInfo = data['jobInfo'];
      this.statusOfJobOffer = StatusOfJobOffer(data['statusOfJobOffer']);
      this.employmentStatusItem = EmploymentStatusItem.fromJS(data['EmploymentStatusItem']);
    }
  }

  static fromJS(data: any): JobOfferDetail {
    data = typeof data === 'object' ? data : {};
    let result = new JobOfferDetail();
    result.init(data);

    return result;
  }

  toJSON(data?: any) {
    data['jobOfferId'] = this.jobOfferId;
    data['jobOfferNumber'] = this.jobOfferNumber;
    data['vacancyDate'] = this.vacancyDate;
    data['startOccupationDate'] = this.startOccupationDate;
    data['endOccupationDate'] = this.endOccupationDate;
    // data["clientId"] = this.clientId;
    // data["clientName"] = this.clientName;
    data['jobId'] = this.jobId;
    data['jobInfo'] = this.jobInfo;
    data['statusOfJobOffer'] = this.statusOfJobOffer;

    return data;
  }
}

export interface IJobOffersListVm {
  joboffers?: JobOfferDetail[] | undefined;
}

export class JobOffersListVm implements IJobOffersListVm {
  joboffers?: JobOfferDetail[] | undefined;

  constructor(data?: JobOffersListVm) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['jobOffers'])) {
        this.joboffers = [] as any;
        for (let item of data['jobOffers'])
          this.joboffers.push(JobOfferDetail.fromJS(item));
      }
    }
  }

  static fromJS(data: any): JobOffersListVm {
    data = typeof data === 'object' ? data : {};
    let result = new JobOffersListVm();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.joboffers)) {
      data['jobOffers'] = [];
      for (let item of this.joboffers) data['jobOffers'].push(item.toJSON());
    }
    return data;
  }
}

//-----------Start Job
export interface IJobDetail {
  jobId?: number | undefined;
  jobNumber: string;
  jobTitle: string;
  reward: string;
  rewardName: string;
  commentReward: string;
  isVacant: boolean;
  comment: string;
  typeOfJob: number;
  typeOfJobName: string;
  statusOfJobOffer: number;
  statusOfJobOfferName: string;
  categoryOfJob: string;
  categoryOfJobName: string;
  isIntegrationJob: boolean;
  partnerId: number;
  partnerName: string;
  categoryOfPartner: string;
  numberOfCandidates: number;
  lastJobOfferVacancyDateTime: Date;
  lastJobOfferOccupationDateTime: Date;
  lastDate: Date;
  lastEndDate: Date;
  lastJobOfferId: number;
  lastOccupiedJobOfferId: number;
  lastOccupiedJobOfferStatus: string;
  hasJobOffer: boolean;
  isLastJobOfferClosed: boolean;
  jobOffers: JobOfferDetail[];
  nameOfhired: string;
  numOffer: string;
  candidacies: clientLookUp[];
  hasDocumentAttached: boolean;
  occupiedBy: string;
  occupiedFrom: Date;
  occupiedTo: Date;
  jobCoachName: string;
  annualClosures: AnnualClosure[];
}

export class JobDetail implements IJobDetail {
  jobId?: number;
  jobNumber: string;
  jobTitle: string;
  reward: string;
  rewardName: string;
  commentReward: string;
  isVacant: boolean;
  comment: string;
  typeOfJob: number;
  typeOfJobName: string;
  statusOfJobOffer: number;
  statusOfJobOfferName: string;
  categoryOfJob: string;
  categoryOfJobName: string;
  isIntegrationJob: boolean;
  partnerId: number;
  partnerName: string;
  categoryOfPartner: string;
  numberOfCandidates: number;
  lastJobOfferVacancyDateTime: Date;
  lastJobOfferOccupationDateTime: Date;
  lastJobOfferId: number;
  lastOccupiedJobOfferId: number;
  lastOccupiedJobOfferStatus: string;
  lastDate: Date;
  lastEndDate: Date;
  hasJobOffer: boolean;
  isLastJobOfferClosed: boolean;
  jobOffers: JobOfferDetail[];
  nameOfhired: string;
  numOffer: string;
  candidacies: clientLookUp[];
  hasDocumentAttached: boolean;
  occupiedBy: string;
  occupiedFrom: Date;
  occupiedTo: Date;
  jobCoachName: string;
  contactPersons : any[];
  annualClosures: AnnualClosure[];
  constructor(data?: JobDetail) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.jobId = data['jobId'];
      this.jobNumber = data['jobNumber'];
      this.jobTitle = data['jobTitle'];
      this.reward = data['reward'];
      this.rewardName = RewardConvertor(data['reward']);
      this.commentReward = data['commentReward'];
      this.isVacant = data['isVacant'];
      this.comment = data['comment'];
      this.typeOfJob = data['typeOfJob'];
      this.typeOfJobName = TypeOfJobConvertor(data['typeOfJob']);
      this.statusOfJobOffer = data['statusOfJobOffer'];
      this.statusOfJobOfferName = StatusOfJobOffer(
        data['statusOfJobOffer']
      );
      this.categoryOfJob = data['categoryOfJob'];
      this.categoryOfJobName = CategoryOfJobConvertor(data['categoryOfJob']);
      this.isIntegrationJob = data['isIntegrationJob'];
      this.partnerId = data['partnerId'];
      this.partnerName = data['partnerName'];
      this.categoryOfPartner = CategoryOfPartnerConvertor(data["categoryOfPartner"]);
      this.numberOfCandidates = data['numberOfCandidates'];
      this.lastJobOfferVacancyDateTime = data['lastJobOfferVacancyDateTime'];
      this.lastJobOfferOccupationDateTime =
        data['lastJobOfferOccupationDateTime'];
      this.lastJobOfferId = data['lastJobOfferId'];
      this.lastOccupiedJobOfferId = data['lastOccupiedJobOfferId'];
      this.lastOccupiedJobOfferStatus = GetLastOccupiedJobOfferStatus(data['jobOffers'], data['lastOccupiedJobOfferId'])
      this.lastDate =
        data['isVacant'] == false
          ? data['lastJobOfferVacancyDateTime']
          : data['lastJobOfferOccupationDateTime'];
      this.lastEndDate = data['lastJobOfferEndOccupationDateTime'];
      this.hasJobOffer = data['hasJobOffer'];
      this.jobOffers = data['jobOffers'];
      this.isLastJobOfferClosed = data['isLastJobOfferClosed'];
      this.nameOfhired = data['nameOfhired'];
      this.numOffer = data['numOffer'];
      this.candidacies = data['candidacies'];
      this.hasDocumentAttached = data['hasDocumentAttached'];
      this.occupiedBy = data['occupiedBy'];
      this.occupiedFrom = data['occupiedFrom'];
      this.occupiedTo = data['occupiedTo'];
      this.jobCoachName = data['jobCoachName'];
      this.contactPersons = data['contactPersons'];
      if (Array.isArray(data["annualClosures"])) {
        this.annualClosures = [] as any;
        for (let item of data["annualClosures"])
            this.annualClosures!.push(AnnualClosure.fromJS(item));
    }
    }
  }

  static fromJS(data: any): JobDetail {
    data = typeof data === 'object' ? data : {};
    let result = new JobDetail();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data['jobId'] = this.jobId;
    data['jobNumber'] = this.jobNumber;
    data['jobTitle'] = this.jobTitle;
    data['reward'] = this.reward;
    data['commentReward'] = this.commentReward;
    data['isVacant'] = this.isVacant;
    data['comment'] = this.comment;
    data['typeOfJob'] = this.typeOfJob;
    data['statusOfJobOffer'] = this.statusOfJobOffer;
    data['categoryOfJob'] = this.categoryOfJob;
    data['isIntegrationJob'] = this.isIntegrationJob;
    data['partnerId'] = this.partnerId;
    data['partnerName'] = this.partnerName;
    data['categoryOfPartner'] = this.categoryOfPartner;
    data['numberOfCandidates'] = this.numberOfCandidates;
    data['lastJobOfferVacancyDateTime'] = this.lastJobOfferVacancyDateTime;
    data[
      'lastJobOfferOccupationDateTime'
    ] = this.lastJobOfferOccupationDateTime;
    data['lastJobOfferId'] = this.lastJobOfferId;
    data['hasJobOffer'] = this.hasJobOffer;
    data['isLastJobOfferClosed'] = this.isLastJobOfferClosed;
    data['nameOfhired'] = this.nameOfhired;
    data['numOffer'] = this.numOffer;
    data['candidacies'] = this.candidacies;
    //data["jobOffers"] = this.jobOffers;
    data['hasDocumentAttached'] = this.hasDocumentAttached;
    if (Array.isArray(this.annualClosures)) {
      data["annualClosures"] = [];
      for (let item of this.annualClosures)
          data["annualClosures"].push(item.toJSON());
    }
    return data;
  }
}

export interface IJobsListVm {
  jobs?: JobDetail[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}
export class AnnualClosure implements IAnnualClosure {
  id? : number;
  startDay?: number;
  startMonth?: number;
  endDay?: number;
  endMonth?: number;
  jobId?: number;

  constructor(data?: IAnnualClosure) {
    if (data) {
      for (var property in data) {
          if (data.hasOwnProperty(property))
              (<any>this)[property] = (<any>data)[property];
      }
  }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.startDay = _data["startDay"];
          this.startMonth = _data["startMonth"];
          this.endDay = _data["endDay"];
          this.endMonth = _data["endMonth"];
          this.jobId = _data["jobId"];
      }
  }

  static fromJS(data: any): AnnualClosure {
      data = typeof data === 'object' ? data : {};
      let result = new AnnualClosure();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["startDay"] = this.startDay;
      data["startMonth"] = this.startMonth;
      data["endDay"] = this.endDay;
      data["endMonth"] = this.endMonth;
      data["jobId"] = this.jobId;
      return data;
  }
}

export interface IAnnualClosure  {
  id?: number;
  startDay?: number;
  startMonth?: number;
  endDay?: number;
  endMonth?: number;
  jobId?: number;
}

export class JobsListVm implements IJobsListVm {
  jobs?: JobDetail[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  constructor(data?: JobsListVm) {
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
        this.jobs = [] as any;
        for (let item of data['items']) this.jobs.push(JobDetail.fromJS(item));
      }
      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  static fromJS(data: any): JobsListVm {
    data = typeof data === 'object' ? data : {};
    let result = new JobsListVm();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.jobs)) {
      data['jobs'] = [];
      for (let item of this.jobs) data['jobs'].push(item.toJSON());
    }

    data['sortOrder'] = this.sortOrder;
    data['pageNumber'] = this.pageNumber;
    data['pageSize'] = this.pageSize;
    data['totalCount'] = this.totalCount;

    return data;
  }
}

//---------Start Supports
export interface ISupport {
  supportId?: number | undefined;
  startDate: Date;
  endDate?: Date;
  id: number;
  clientId: number;
  StaffMemberInfo: string;
  isActif: boolean;
  note: string;
  reasonOfClosure:string;
  hasNote: string;
  isLastSupport:boolean;
}

export class Support implements ISupport {
  supportId?: number | undefined;
  startDate: Date;
  endDate?: Date;
  id: number;
  clientId: number;
  StaffMemberInfo: string;
  isActif: boolean;
  note: string;
  reasonOfClosure:string;
  hasNote: string;
  isLastSupport:boolean;

  constructor(data?: Support) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.supportId = data['supportId'];
      this.startDate = data['startDate'];
      this.endDate = data['endDate'];
      this.id = data['id'];
      this.clientId = data['clientId'];
      this.StaffMemberInfo = data['StaffMemberInfo'];
      this.isActif = data['isActif'];
      this.note = data['note'];
      this.hasNote = hasNote(data['hasNote']);
      this.reasonOfClosure = data['reasonOfClosure'];
      this.isLastSupport = data['isLastSupport'];
    }
  }

  static fromJS(data: any): Support {
    data = typeof data === 'object' ? data : {};
    let result = new Support();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data['supportId'] = this.supportId;
    data['startdate'] = this.startDate;
    data['id'] = this.id;
    data['note'] = this.note;
    data['clientId'] = this.clientId;
    // data["hasNote"] = this.hasNote;
    return data;
  }
}

export interface ISupportListVm {
  supports?: Support[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export class SupportListVm implements ISupportListVm {
  supports?: Support[] | undefined;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  totalCount: number;

  constructor(data?: ISupportListVm) {
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
        this.supports = [] as any;
        for (let item of data['items'])
          this.supports.push(Support.fromJS(item));
      }
      this.sortOrder = data['sortOrder'];
      this.pageNumber = data['pageNumber'];
      this.pageSize = data['pageSize'];
      this.totalCount = data['totalCount'];
    }
  }

  static fromJS(data: any): SupportListVm {
    data = typeof data === 'object' ? data : {};
    let result = new SupportListVm();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.supports)) {
      data['items'] = [];
      for (let item of this.supports) data['supports'].push(item.toJSON());
    }

    data['sortOrder'] = this.sortOrder;
    data['pageNumber'] = this.pageNumber;
    data['pageSize'] = this.pageSize;
    data['totalCount'] = this.totalCount;

    return data;
  }
}

export interface ISupportDetail {
  supportId?: number | undefined;
  startDate: Date;
  endDate?: Date;
  id: number;
  clientId: number;
  StaffMemberInfo: string;
  isActif: boolean;
  note: string;
  hasNote: string;
}

export class SupportDetail implements ISupportDetail {
  supportId?: number;
  startDate: Date;
  endDate?: Date;
  id: number;
  clientId: number;
  StaffMemberInfo: string;
  isActif: boolean;
  note: string;
  hasNote: string;

  constructor(data?: SupportDetail) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.supportId = data['supportId'];
      this.startDate = data['startDate'];
      this.endDate = data['endDate'];
      this.id = data['id'];
      this.clientId = data['clientId'];
      this.StaffMemberInfo = data['StaffMemberInfo'];
      this.isActif = data['isActif'];
      this.note = data['note'];
      this.hasNote = hasNote(data['hasNote']);
    }
  }

  static fromJS(data: any): SupportDetail {
    data = typeof data === 'object' ? data : {};
    let result = new SupportDetail();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data['supportId'] = this.supportId;
    data['startDate'] = this.startDate;
    data['endDate'] = this.endDate;
    data['id'] = this.id;
    data['clientId'] = this.clientId;
    data['StaffMemberInfo'] = this.StaffMemberInfo;
    data['isActif'] = this.isActif;
    data['note'] = this.note;
    //data["hasNote"] = this.hasNote;
    return data;
  }
}
//----------End Supports

//----------Start client
export interface IclientDetail {
  clientId?: string | undefined;
  referenceNumber: string;
  civilStatus: string;
  firstname: string;
  lastname: string;
  fullName: string | undefined;
  gender: string;
  birthDate: Date | undefined;
  startDateInCpas: Date;
  endDateInCpas: Date;
  nationality: string;
  niss: string;
  email?: string | undefined;
  phone?: string | undefined;
  supportStaffMemberName?: string | undefined;
  supportStaffMemberService?: string | undefined;
  supportStartDate?: Date | undefined;
  supportEndDate?: Date | undefined;
  supports?: any[] | undefined;
  nativeLanguage?: string | undefined;
  contactLanguage: string;
  address?: string | undefined;
  lasttrainingName: string;
  lasttrainingNote: string;
  lasttrainingResult: number;
  lasttrainingResultName: string;
  lasttrainingStartDate: Date;
  lasttrainingEndDate: Date;
  socialWorkerName?: string | undefined;
  lastJobExperienceCompanyName: string;
  lastJobExperienceContractTypeName: string;
  lastJobExperienceFunction: string;
  lastJobExperienceStartDate: Date;
  lastJobExperienceEndDate: Date;
  contratPiis:ContratPiis;
  lastEvaluationDate:Date;
}

export class clientDetail implements IclientDetail {
  clientId?: string;
  referenceNumber: string;
  civilStatus: string;
  firstname: string;
  lastname: string;
  fullName: string | undefined;
  gender: string;
  birthDate: Date;
  startDateInCpas: Date;
  endDateInCpas: Date;
  nationality: string;
  niss: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  supportStaffMemberName?: string | undefined;
  supportStaffMemberService?: string | undefined;
  supportStartDate?: Date | undefined;
  supportEndDate?: Date | undefined;
  supports?: any[] | undefined;
  nativeLanguage?: string;
  contactLanguage: string;
  address?: string;
  candidacies?: any[] | undefined;
  lasttrainingName: string;
  lasttrainingNote: string;
  lasttrainingResult: number;
  lasttrainingResultName: string;
  lasttrainingStartDate: Date;
  lasttrainingEndDate: Date;
  socialWorkerName?: string;
  lastJobExperienceCompanyName: string;
  lastJobExperienceContractTypeName: string;
  lastJobExperienceFunction: string;
  lastJobExperienceStartDate: Date;
  lastJobExperienceEndDate: Date;
  contratPiis:ContratPiis;
  lastEvaluationDate:Date;
  ibisNumber: string;

  constructor(data?: IclientDetail) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.clientId = data['clientId'];
      this.referenceNumber = data['referenceNumber'];
      this.civilStatus = CivilStatusConvertor(data['civilStatus']);
      this.firstname = data['firstName'];
      this.lastname = data['lastName'];
      this.fullName = data['lastName'] +' '+ capitalize(data['firstName']);
      this.gender = data['gender'] == 0 ? 'H' : 'F';
      this.birthDate = data['birthDate'];
      this.startDateInCpas = data['startDateInCpas'];
      this.endDateInCpas = data['endDateInCpas'];
      this.nationality = data['nationality'];
      this.niss = data['niss'];
      this.email = data['email'];
      this.phone = data['phone'];
      this.mobilePhone = data['mobilePhone'];
      this.supportStaffMemberName = data['supportStaffMemberName'];
      this.supportStaffMemberService = data['supportStaffMemberService'];
      this.supportStartDate = data['supportStartDate'];
      this.supportEndDate = data['supportEndDate'];
      this.nativeLanguage = data['nativeLanguage'];
      this.contactLanguage = data['contactLanguage'];
      this.address = data['address'];
      this.candidacies = data['candidacies'];
      this.lasttrainingName = data['lasttrainingName']
        ? data['lasttrainingName']
        : '-';
      this.lasttrainingNote = data['lasttrainingNote'];
      this.lasttrainingResult = data['lasttrainingResult'];
      this.lasttrainingResultName = data['lasttrainingResult']
        ? ResultConvertor(data['lasttrainingResult'])
        : '-';
      this.lasttrainingStartDate = data['lasttrainingStartDate'];
      this.lasttrainingEndDate = data['lasttrainingEndDate'];
      this.socialWorkerName = data['socialWorkerName'];
      this.lastJobExperienceCompanyName = data['lastJobExperienceCompanyName'];
      this.lastJobExperienceContractTypeName = typeOfContractConvertor(data['lastJobExperienceContractTypeName']);
      this.lastJobExperienceFunction = data['lastJobExperienceFunction'];
      this.lastJobExperienceStartDate = data['lastJobExperienceStartDate'];
      this.lastJobExperienceEndDate = data['lastJobExperienceEndDate'];
      this.contratPiis = ContratPiis.fromJS(data['contratPiis']);
      this.lastEvaluationDate = data['lastEvaluationDate'];
      this.ibisNumber = data['ibisNumber'];

      if (Array.isArray(data['supports'])) {
        this.supports = [] as any;
        for (let item of data['supports'])
          this.supports!.push(SupportDetail.fromJS(item));
      }
    }
  }

  static fromJS(data: any): clientDetail {
    data = typeof data === 'object' ? data : {};
    let result = new clientDetail();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['clientId'] = this.clientId;
    data['referenceNumber'] = this.referenceNumber;
    data['civilStatus'] = this.civilStatus;
    data['firstname'] = this.firstname;
    data['lastname'] = this.lastname;
    data['gender'] = this.gender;
    data['birthDate'] = this.birthDate;
    data['startDateInCpas'] = this.startDateInCpas;
    data['endDateInCpas'] = this.endDateInCpas;
    data['nationality'] = this.nationality;
    data['niss'] = this.niss;
    data['email'] = this.email;
    data['phone'] = this.phone;
    data['mobilePhone'] = this.mobilePhone;
    data['supportStaffMemberName'] = this.supportStaffMemberName;
    data['supportStaffMemberService'] = this.supportStaffMemberService;
    data['supportStartDate'] = this.supportStartDate;
    data['supportEndDate'] = this.supportEndDate;
    data['nativeLanguage'] = this.nativeLanguage;
    data['contactLanguage'] = this.contactLanguage;
    data['address'] = this.address;
    data['candidacies'] = this.candidacies;
    data['socialWorkerName'] = this.socialWorkerName;

    if (Array.isArray(this.supports)) {
      data['supports'] = [];
      for (let item of this.supports) data['supports'].push(item.toJSON());
    }
    return data;
  }
}

export interface IclientLookUp {
  clientId: string | null;
  referenceNumber: string;
  name: string;
  niss: string;
  socialWorkerName: string;
}

export class clientLookUp implements IclientLookUp {
  clientId: string;
  referenceNumber: string;
  name: string;
  niss: string;
  socialWorkerName: string

  constructor(data?: IclientLookUp) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.clientId = data['clientId'];
      this.referenceNumber = data['referenceNumber'];
      this.name = data['name'];
      this.niss = data['niss'];
      this.socialWorkerName = data['socialWorkerName'];
    }
  }

  static fromJS(data: any): clientLookUp {
    data = typeof data === 'object' ? data : {};
    let result = new clientLookUp();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['clientId'] = this.clientId;
    data['referenceNumber'] = this.referenceNumber;
    data['name'] = this.name;
    data['niss'] = this.niss;
    data['socialWorkerName'] = this.socialWorkerName;
    return data;
  }
}

export interface IBeneficiariesLookUp {
  beneficiariesLookUp?: clientLookUp[] | undefined;
}

export class BeneficiariesLookUp implements IBeneficiariesLookUp {
  beneficiariesLookUp?: clientLookUp[] | undefined;

  constructor(data?: IBeneficiariesLookUp) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['beneficiaries'])) {
        this.beneficiariesLookUp = [] as any;
        for (let item of data['beneficiaries'])
          this.beneficiariesLookUp!.push(clientLookUp.fromJS(item));
      }
    }
  }

  static fromJS(data: any): BeneficiariesLookUp {
    data = typeof data === 'object' ? data : {};
    let result = new BeneficiariesLookUp();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.beneficiariesLookUp)) {
      data['beneficiaries'] = [];
      for (let item of this.beneficiariesLookUp)
        data['beneficiaries'].push(item.toJSON());
    }
    return data;
  }
}

// ---------End client

// ---- Start Contrat Piis

export interface IContratPiis {
  libelle: string;
  asTraitant: string;
  startDate: Date;
  endDate: Date;
}

export class ContratPiis implements IContratPiis {
  libelle: string;
  asTraitant: string;
  startDate: Date;
  endDate: Date;

  static fromJS(data: any): ContratPiis {
    data = typeof data === 'object' ? data : {};
    let result = new ContratPiis();
    result.init(data);
    return result;
  }

  constructor(data?: ContratPiis) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.libelle= data['libelle'];
      this.asTraitant= data['asTraitant'];
      this.startDate= data['startDate'];
      this.endDate= data['endDate'];
    }
  }
}
// -- End Contrat Piis

//------Rewards
export interface IReward {
  type: string;
}

export class Reward implements IReward {
  type: string;

  constructor(data?: Reward) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data: any) {
    if (data) {
      this.type = data['type'];
    }
  }

  static fromJS(data: any): Reward {
    data = typeof data === 'object' ? data : {};
    let result = new Reward();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['type'] = this.type;
    return data;
  }
}

export interface IRewards {
  list?: Reward[] | undefined;
}

export class Rewards implements IRewards {
  list?: Reward[] | undefined;

  constructor(data?: Rewards) {
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
          this.list!.push(Reward.fromJS(item));
      }
    }
  }

  static fromJS(data: any): Rewards {
    data = typeof data === 'object' ? data : {};
    let result = new Rewards();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.list)) {
      data = [];
      for (let item of this.list)
        data.push(item.toJSON());
    }
    return data;
  }
}

function ConvertProjectsToString(projects : string[]): string {
 let  result = "";
  if (Array.isArray(projects)) {
    for (let item of projects){
      result += item + "\n";
    }
  }
  return result;
}
function CivilStatusConvertor(sociabiliCivilStatusCode: number): string {
  let result: string;

  switch (sociabiliCivilStatusCode) {
    case 1:
      result = 'Célibataire';
      break;
    case 2:
      result = 'Marié(e)';
      break;
    case 3:
      result = 'Veuf(ve)';
      break;
    case 4:
      result = 'Divorcé(e)';
      break;
    case 5:
      result = 'Partenariat';
      break;
    default:
      result = 'Indéterminé';
      break;
  }
  return result;
}

function RewardConvertor(Reward: number): string {
  let result: string;

  switch (Reward) {
    case 1:
      result = '318';
      break;
    case 2:
      result = '530';
      break;
    case 3:
      result = '688';
      break;
    case 4:
      result = 'totale';
      break;
    case 5:
      result = 'Eco soc';
      break;
    case 6:
      result = 'Exonération';
      break;
    case 7:
      result = 'Dérogation';
      break;
    default:
      result = 'Echange de service';
      break;
  }
  return result;
}

function StatusOfJobOffer(status: number): string {
  let result: string = 'Ouverte';

  if (status == 1) {
    result = 'Fermée';
  }

  return result;
}

function GetLastOccupiedJobOfferStatus(jobOffers: JobOfferDetail[], jobOffeId: number): string {
  let result = 'Ouverte';
  //const jobOffer = jobOffers.find((x) => x.jobOfferId == jobOffeId);
  const jobOffer = jobOffers.find((x) => parseInt(x.statusOfJobOffer) == 0);
  if (jobOffer == null || jobOffer == undefined) {
    //result = StatusOfJobOffer(jobOffer.statusOfJobOfferId);
    result = 'Fermée';
  }

    return result;
}


function CategoryOfJobConvertor(status: number): string {
  let result: string = 'Ouvrier';

  if (status == 1) result = 'Employée';

  return result;
}

function TypeOfJobConvertor(status: number): string {
  let result: string = 'Nouveau';

  if (status == 1) result = 'Remplacement';

  return result;
}

function hasNote(hasANote: boolean): string {
  return hasANote ? 'Oui' : 'Non';
}
function nameCutter(name: string): string {
  return name.slice(0, 10) + '...';
}
export interface CategoryOfPartner {
  id: number;
  value: string;
}

export interface LanguageKnowledgeScore {
  id: number;
  value: string;
}

export interface CategoryOfJob {
  id: number;
  value: string;
}

export interface TypeOfJob {
  id: number;
  value: string;
}

export interface statusOfJobOffer {
  id: number;
}

export interface StatusOfPartner {
  id: number;
  value: string;
}

export interface Reward {
  id: number;
  value: string;
}

export interface StatusOfJobOffer {
  id: number;
  value: string;
}

export interface NotificationMessage {
  Type: string;
  Text: string;
}

export interface SearchJobFilter {
  partnerId: number;
  isVacant: boolean;
  filterText: string;
  isOpen: boolean;
}

export class LastBeneftraining {
  // ["training","result","startdate","enddate"];
  training: string;
  result: string;
  startdate: Date;
  enddate: Date;

  constructor(
    training: string,
    result: string,
    startdate: Date,
    enddate: Date
  ) {
    this.training = training;
    this.result = result;
    this.startdate = startdate;
    this.enddate;
  }
}

export enum MessageType {
  Error,
  Success,
  Information,
  Warning,
}

export enum RequestStatus {
  None,
  InProgress,
  Failed,
  Done,
  Cancelled,
}

export interface Type {
  id: number;
  value: string;
}

export interface Field {
  id: number;
  value: string;
}

export interface courseLevel {
  id: number;
  value: string;
}

export interface trainingResult {
  id: number;
  value: string;
}

export interface Gender {
  id: number;
  value: string;
}

export interface ConsultItem {
  name: string;
  title?: string;
  component: any;
  icon: string;
}

export interface TypeOfContract {
  id: number;
  value: string;
}
function TypeConvertor(Type: number): string {
  let result: string;

  switch (Type) {
    case 1:
      result = 'FLE';
      break;
    case 2:
      result = 'NLE';
      break;
    case 3:
      result = 'Remise à niveau';
      break;
    case 4:
      result = 'trainings professionelles';
      break;
    case 5:
      result = 'Apprentissage';
      break;
    case 6:
      result = 'ESI';
      break;
    case 7:
      result = 'ESS';
      break;
    case 8:
      result = 'Bachelier';
      break;
    case 9:
      result = 'Master';
      break;
    case 10:
      result = 'Doctorat';
      break;
    default:
      result = 'Autre';
      break;
  }
  return result;
}

export function ResultConvertor(Result: number): string {
  let result: string;

  switch (Result) {
    case 1:
      result = 'Réussite';
      break;
    case 2:
      result = 'Échec';
      break;
    case 3:
      result = 'Abandon';
      break;
    default:
      result = 'En cours';
      break;
  }
  return result;
}

function FieldConvertor(Field: number): string {
  let result: string;
  switch (Field) {
    case 1:
      result = 'Beauté';
      break;
    case 2:
      result = 'Commerce';
      break;
    case 3:
      result = 'Communication';
      break;
    case 4:
      result = 'Construction';
      break;
    case 5:
      result = 'Entretien';
      break;
    case 6:
      result = 'Gestion';
      break;
    case 7:
      result = 'Habillement et confection';
      break;
    case 8:
      result = 'Horeca';
      break;
    case 9:
      result = 'Industrie';
      break;
    case 10:
      result = 'Informatique';
      break;
    case 11:
      result = 'Nature';
      break;
    case 12:
      result = 'Pédagogie';
      break;
    case 13:
      result = 'Santé';
      break;
    case 14:
      result = 'Sécurité';
      break;
    case 15:
      result = 'Transport et logistique';
      break;
    case 16:
      result = 'Langue';
      break;
    default:
      result = 'Autre';
      break;
  }
  return result;
}

export function LevelConvertor(Level: number): string {
  let result: string;

  switch (Level) {
    case 1:
      result = '1ère';
      break;
    case 2:
      result = '2eme';
      break;
    case 3:
      result = '3eme';
      break;
    case 4:
      result = '4eme';
      break;
    case 5:
      result = '5eme';
      break;
    case 6:
      result = '6eme';
      break;
    case 7:
      result = '7eme';
      break;
    case 8:
      result = 'A1';
      break;
    case 9:
      result = 'A2';
      break;
    case 10:
      result = 'B1';
      break;
    case 11:
      result = 'B2';
      break;
    case 12:
      result = 'C1';
      break;
    case 13:
      result = 'C2';
      break;
    default:
      result = 'Autre';
      break;
  }
  return result;
}

function typeOfContractConvertor(typeOfContract: number) {
  let result: string;

  switch (typeOfContract) {
    case 0:
      result = 'CDD';
      break;
    case 1:
      result = 'CDI';
      break;
    case 2:
      result = 'Interim';
      break;
    case 3:
      result = 'ALE';
      break;
    case 4:
        result = 'Bénévolat';
        break;
    case 5:
        result = 'Insertion';
        break;
    case 6:
        result = 'Stage';
        break;
    case 7:
        result = 'Job étudiant';
        break;
    case 8:
        result = 'Indépendant';
        break;
  }

  return result;
}

function personalExpectationLanguageknowledgeScore(languageKnowledgeScore: number) {
  let result: string;

  switch (languageKnowledgeScore) {
    case 1:
      result = 'En initiation';
      break;
    case 2:
      result = 'Besoin de soutien';
      break;
    case 3:
      result = 'Autonome';
      break;
    default:
      result = 'Pas du tout';
      break;
  }
  return result;
}

//Actions et suivis .......................................................
//.........................................................................
export class PaginatedListOfQuarterlyMonitoringDto implements IPaginatedListOfQuarterlyMonitoringDto {
  items?: QuarterlyMonitoringDto[] | undefined;
  sortOrder?: string | undefined;
  pageNumber?: number;
  pageSize?: number;
  totalCount?: number;

  constructor(data?: IPaginatedListOfQuarterlyMonitoringDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          if (Array.isArray(_data["items"])) {
              this.items = [] as any;
              for (let item of _data["items"])
                  this.items!.push(QuarterlyMonitoringDto.fromJS(item));
          }
          this.sortOrder = _data["sortOrder"];
          this.pageNumber = _data["pageNumber"];
          this.pageSize = _data["pageSize"];
          this.totalCount = _data["totalCount"];
      }
  }

  static fromJS(data: any): PaginatedListOfQuarterlyMonitoringDto {
      data = typeof data === 'object' ? data : {};
      let result = new PaginatedListOfQuarterlyMonitoringDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      if (Array.isArray(this.items)) {
          data["items"] = [];
          for (let item of this.items)
              data["items"].push(item.toJSON());
      }
      data["sortOrder"] = this.sortOrder;
      data["pageNumber"] = this.pageNumber;
      data["pageSize"] = this.pageSize;
      data["totalCount"] = this.totalCount;
      return data;
  }
}

export interface IPaginatedListOfQuarterlyMonitoringDto {
  items?: QuarterlyMonitoringDto[] | undefined;
  sortOrder?: string | undefined;
  pageNumber?: number;
  pageSize?: number;
  totalCount?: number;
}

export class QuarterlyMonitoringDto implements IQuarterlyMonitoringDto {
  qMonitoringId?: number;
  clientId?: number;
  clientName?: string | undefined;
  clientLastName?: string | undefined;
  clientFirstName?: string | undefined;
  clientNiss?: string | undefined;
  clientDossier?: string | undefined;
  id?: number;
  StaffMemberName?: string | undefined;
  StaffMemberLastName?: string | undefined;
  StaffMemberFirstName?: string | undefined;
  monitoringActionId?: number;
  monitoringActionLabel?: string | undefined;
  actionDate?: Date;
  actionComment?: string | undefined;
  quarter?: string | undefined;
  softdelete?: boolean;

  static fromJS(data: any): QuarterlyMonitoringDto {
    data = typeof data === 'object' ? data : {};
    let result = new QuarterlyMonitoringDto();
    result.init(data);
    return result;
}

  constructor(data?: IQuarterlyMonitoringDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.qMonitoringId = _data["qMonitoringId"];
          this.clientId = _data["clientId"];
          this.clientName = _data["clientName"];
          this.clientLastName = _data["clientLastName"];
          this.clientFirstName = _data["clientFirstName"];
          this.clientNiss = _data["clientNiss"];
          this.clientDossier = _data["clientDossier"];
          this.id = _data["id"];
          this.StaffMemberName = _data["StaffMemberName"];
          this.StaffMemberLastName = _data["StaffMemberLastName"];
          this.StaffMemberFirstName = _data["StaffMemberFirstName"];
          this.monitoringActionId = _data["monitoringActionId"];
          this.monitoringActionLabel = _data["monitoringActionLabel"];
          this.actionDate = _data["actionDate"] ? new Date(_data["actionDate"].toString()) : <any>undefined;
          this.actionComment = _data["actionComment"];
          this.quarter = _data["quarter"];
          this.softdelete = _data["softdelete"];
      }
  }


  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["qMonitoringId"] = this.qMonitoringId;
      data["clientId"] = this.clientId;
      data["clientName"] = this.clientName;
      data["clientLastName"] = this.clientLastName;
      data["clientFirstName"] = this.clientFirstName;
      data["clientNiss"] = this.clientNiss;
      data["clientDossier"] = this.clientDossier;
      data["id"] = this.id;
      data["StaffMemberName"] = this.StaffMemberName;
      data["StaffMemberLastName"] = this.StaffMemberLastName;
      data["StaffMemberFirstName"] = this.StaffMemberFirstName;
      data["monitoringActionId"] = this.monitoringActionId;
      data["monitoringActionLabel"] = this.monitoringActionLabel;
      data["actionDate"] = this.actionDate ? this.actionDate : <any>undefined;
      data["actionComment"] = this.actionComment;
      data["quarter"] = this.quarter;
      data["softdelete"] = this.softdelete;
      return data;
  }
}

export interface IQuarterlyMonitoringDto {
  qMonitoringId?: number;
  clientId?: number;
  clientName?: string | undefined;
  clientLastName?: string | undefined;
  clientFirstName?: string | undefined;
  clientNiss?: string | undefined;
  clientDossier?: string | undefined;
  id?: number;
  StaffMemberName?: string | undefined;
  StaffMemberLastName?: string | undefined;
  StaffMemberFirstName?: string | undefined;
  monitoringActionId?: number;
  monitoringActionLabel?: string | undefined;
  actionDate?: Date;
  actionComment?: string | undefined;
  quarter?: string | undefined;
  softdelete?: boolean;
}

export class CreateQuarterlyMonitoringCommand implements ICreateQuarterlyMonitoringCommand {
  clientId?: number;
  id?: number;
  monitoringActionId?: number;
  actionDate?: Date;
  actionComment?: string | undefined;

  constructor(data?: ICreateQuarterlyMonitoringCommand) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.clientId = _data["clientId"];
          this.id = _data["id"];
          this.monitoringActionId = _data["monitoringActionId"];
          this.actionDate = _data["actionDate"] ? new Date(_data["actionDate"].toString()) : <any>undefined;
          this.actionComment = _data["actionComment"];
      }
  }

  static fromJS(data: any): CreateQuarterlyMonitoringCommand {
      data = typeof data === 'object' ? data : {};
      let result = new CreateQuarterlyMonitoringCommand();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["clientId"] = this.clientId;
      data["id"] = this.id;
      data["monitoringActionId"] = this.monitoringActionId;
      data["actionDate"] = this.actionDate ? this.actionDate : <any>undefined;
      data["actionComment"] = this.actionComment;
      return data;
  }
}

export interface ICreateQuarterlyMonitoringCommand {
  clientId?: number;
  id?: number;
  monitoringActionId?: number;
  actionDate?: Date;
  actionComment?: string | undefined;
}

export class UpdateQuarterlyMonitoringCommand implements IUpdateQuarterlyMonitoringCommand {
  qMonitoringId?: number;
  clientId?: number;
  id?: number;
  monitoringActionId?: number;
  actionDate?: Date;
  actionComment?: string | undefined;

  constructor(data?: IUpdateQuarterlyMonitoringCommand) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.qMonitoringId = _data["qMonitoringId"];
          this.clientId = _data["clientId"];
          this.id = _data["id"];
          this.monitoringActionId = _data["monitoringActionId"];
          this.actionDate = _data["actionDate"] ? new Date(_data["actionDate"].toString()) : <any>undefined;
          this.actionComment = _data["actionComment"];
      }
  }

  static fromJS(data: any): UpdateQuarterlyMonitoringCommand {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateQuarterlyMonitoringCommand();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["qMonitoringId"] = this.qMonitoringId;
      data["clientId"] = this.clientId;
      data["id"] = this.id;
      data["monitoringActionId"] = this.monitoringActionId;
      data["actionDate"] = this.actionDate ? this.actionDate : <any>undefined;
      data["actionComment"] = this.actionComment;
      return data;
  }
}

export interface IUpdateQuarterlyMonitoringCommand {
  qMonitoringId?: number;
  clientId?: number;
  id?: number;
  monitoringActionId?: number;
  actionDate?: Date;
  actionComment?: string | undefined;
}

export class MonitoringActionDto implements IMonitoringActionDto {
  actionId?: number;
  actionLabel?: string | undefined;

  constructor(data?: IMonitoringActionDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.actionId = _data["actionId"];
          this.actionLabel = _data["actionLabel"];
      }
  }

  static fromJS(data: any): MonitoringActionDto {
      data = typeof data === 'object' ? data : {};
      let result = new MonitoringActionDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["actionId"] = this.actionId;
      data["actionLabel"] = this.actionLabel;
      return data;
  }
}

export interface IMonitoringActionDto {
  actionId?: number;
  actionLabel?: string | undefined;
}

export class CreateMonitoringActionCommand implements ICreateMonitoringActionCommand {
  actionLabel?: string | undefined;

  static fromJS(data: any): CreateMonitoringActionCommand {
    data = typeof data === 'object' ? data : {};
    let result = new CreateMonitoringActionCommand();
    result.init(data);
    return result;
}

  constructor(data?: ICreateMonitoringActionCommand) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.actionLabel = _data["actionLabel"];
      }
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["actionLabel"] = this.actionLabel;
      return data;
  }
}

export interface ICreateMonitoringActionCommand {
  actionLabel?: string | undefined;
}

export class UpdateMonitoringActionCommand implements IUpdateMonitoringActionCommand {
  actionId?: number;
  actionLabel?: string | undefined;

  constructor(data?: IUpdateMonitoringActionCommand) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.actionId = _data["actionId"];
          this.actionLabel = _data["actionLabel"];
      }
  }

  static fromJS(data: any): UpdateMonitoringActionCommand {
      data = typeof data === 'object' ? data : {};
      let result = new UpdateMonitoringActionCommand();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["actionId"] = this.actionId;
      data["actionLabel"] = this.actionLabel;
      return data;
  }
}

export interface IUpdateMonitoringActionCommand {
  actionId?: number;
  actionLabel?: string | undefined;
}

export class LanguageDto implements ILanguageDto {
  id?: number;
  name?: string | undefined;

  constructor(data?: ILanguageDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.name = _data["name"];
      }
  }

  static fromJS(data: any): LanguageDto {
      data = typeof data === 'object' ? data : {};
      let result = new LanguageDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["name"] = this.name;
      return data;
  }
}

export interface ILanguageDto {
  id?: number;
  name?: string | undefined;
}

export function CategoryOfPartnerConvertor(CategoryOfPartner: number): string {
  let result: string;

  switch (CategoryOfPartner) {
    case 1:
      result = 'ASBL 1030';
      break;
    case 2:
      result = 'ASBL SC 1030';
      break;
    case 3:
      result = 'Entreprise privée';
      break;
    case 4:
      result = 'Commune';
      break;
    case 5:
      result = 'ASBL hors 1030';
      break;
    default:
      result = 'CPAS';
      break;
  }
  return result;
}

export function StatutOfPartnerConvertor(CategoryOfPartner: number): string {
  let result: string;

  switch (CategoryOfPartner) {
    case 1:
      result = 'Inactif';
      break;
    case 2:
      result = 'Clôturé';
      break;
    default:
      result = 'Actif';
      break;
  }
  return result;
}

function capitalize(value: string){
  return typeof value === 'string' && value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() || value;
}


