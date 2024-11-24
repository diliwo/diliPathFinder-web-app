import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  ServicesIspFacadeService,
  ReferentFacadeService,
  PartnersFacadeService,
  DocumentsFacadeService,
  SchoolsFacadeService,
  ProfessionsFacadeService
} from '@frontend/core-state';
import {
  ReferentListVm,
  Referent,
  UpsertReferenceCommand,
  ServiceListVm,
  ServiceDetail,
  UpsertServiceDetailCommand,
  PartnersListVm,
  Partner,
  DocumentDetail,
  School,
  ProfessionMv,
  TrainingType
} from '@frontend/api-interface';

@Component({
  selector: 'frontend-management-console',
  templateUrl: './management-console.component.html',
  styleUrls: ['./management-console.component.scss'],
})
export class ManagementConsoleComponent implements OnInit {
  allServices$: Observable<ServiceListVm> = this.servicesIspFacadeService
    .allServices$;
  allReferences$: Observable<ReferentListVm> = this.referentFacadeService
    .allReferents$;
  allPartners$: Observable<PartnersListVm> = this.partnersFacadeService
    .allPartnersListVm$;
  allProfessions$: Observable<ProfessionMv.ProfessionList> = this.professionsFacadeService
    .allProfessions$;

  constructor(
    private servicesIspFacadeService: ServicesIspFacadeService,
    private referentFacadeService: ReferentFacadeService,
    private partnersFacadeService: PartnersFacadeService,
    private documentsFacadeService: DocumentsFacadeService,
    private schooServiceFace: SchoolsFacadeService,
    private professionsFacadeService: ProfessionsFacadeService
  ) {}

  ngOnInit(): void {
    this.reset();
    this.partnersFacadeService.mutations$.subscribe((_) => {
      this.reset();
    });
      this.servicesIspFacadeService.mutations$.subscribe((_) => {
        this.reset();
      });
    this.referentFacadeService.mutations$.subscribe((_) => {
      this.reset();
    });
  }

  reset() {
    this.loadServices();
    this.loadReferents();
    //this.loadPartners();
  }

  loadServices() {
    this.servicesIspFacadeService.loadServices();
  }

  loadReferents() {
    this.referentFacadeService.loadReferents(1,1000);
  }

  persistServicesIsp(serviceDetail: ServiceDetail) {
    this.servicesIspFacadeService.persist(serviceDetail);
  }

  persistReferent(upsertReferenceCommand: UpsertReferenceCommand) {
    this.referentFacadeService.persist(upsertReferenceCommand);
  }

  persistPartner(partner: Partner) {
    this.partnersFacadeService.persist(partner);
  }

  updatePartner(partner: Partner){
    this.partnersFacadeService.update(partner);
  }
  deleteServicesIsp(upsertServiceDetailCommand: UpsertServiceDetailCommand) {
    this.servicesIspFacadeService.delete(upsertServiceDetailCommand.serviceId);
  }

  deleteReferent(upsertReferenceCommand: UpsertReferenceCommand) {
    console.log(upsertReferenceCommand.referentId);
    this.referentFacadeService.delete(upsertReferenceCommand.referentId);
  }

  deletePartner(Partner: Partner) {
    this.partnersFacadeService.delete(Partner.partnerId);
  }

  saveDocument(documentDetail: DocumentDetail) {
    this.documentsFacadeService.save(documentDetail);
  }

  createSchool(school: School) {
    console.log(school);
    this.schooServiceFace.persist(school);
  }

  updateSchool(school: School) {
    this.schooServiceFace.persist(school);
  }

  deleteSchool(school: School) {
    this.schooServiceFace.delete(school.schoolId);
  }

  createProfession(profession: ProfessionMv.Profession) {
    this.professionsFacadeService.persist(profession);
  }

  updateProfession(profession: ProfessionMv.Profession) {
    this.professionsFacadeService.persist(profession);
  }

  deleteProfession(profession: ProfessionMv.Profession) {
    this.professionsFacadeService.delete(profession.professionId);
  }
}
