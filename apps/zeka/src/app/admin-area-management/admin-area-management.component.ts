import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DocumentsFacadeService, PartnersFacadeService, ProfessionsFacadeService, SchoolsFacadeService, StaffMembersFacadeService, TeamsFacadeService } from '@frontend/core-state';
import {
  StaffMembers,
  StaffMember,
  Teams,
  Team,
  PartnersListVm,
  Partner,
  DocumentDetail,
  School,
  ProfessionMv,
  TrainingType
} from '@frontend/api-interface';

@Component({
  selector: 'frontend-management-console',
  templateUrl: './admin-area-management.component.html',
  styleUrls: ['./admin-area-management.component.scss'],
})
export class AdminAreaManagementComponent implements OnInit {
  allTeams$: Observable<Teams> = this.teamsFacadeService
    .allTeams$;
  allStaffMembers$: Observable<StaffMembers> = this.staffMembersFacadeService
    .allStaffMembers$;
  allPartners$: Observable<PartnersListVm> = this.partnersFacadeService
    .allPartnersListVm$;
  allProfessions$: Observable<ProfessionMv.ProfessionList> = this.professionsFacadeService
    .allProfessions$;

  constructor(
    private teamsFacadeService: TeamsFacadeService,
    private staffMembersFacadeService: StaffMembersFacadeService,
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
      this.teamsFacadeService.mutations$.subscribe((_) => {
        this.reset();
      });
    this.staffMembersFacadeService.mutations$.subscribe((_) => {
      this.reset();
    });
  }

  reset() {
    this.loadServices();
    this.load();
    this.load();
  }

  loadServices() {
    this.teamsFacadeService.loadServices();
  }

  load() {
    this.staffMembersFacadeService.load(1,1000);
  }

  persistteams(team: Team) {
    this.teamsFacadeService.persist(team);
  }

  persistStaffMember(staffMember: StaffMember) {
    this.staffMembersFacadeService.persist(staffMember);
  }

  persistPartner(partner: Partner) {
    this.partnersFacadeService.persist(partner);
  }

  updatePartner(partner: Partner){
    this.partnersFacadeService.update(partner);
  }
  deleteteams(team: Team) {
    this.teamsFacadeService.delete(team.id);
  }

  deleteStaffMember(staffMember: StaffMember) {
    console.log(staffMember.id);
    this.staffMembersFacadeService.delete(staffMember.id);
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
