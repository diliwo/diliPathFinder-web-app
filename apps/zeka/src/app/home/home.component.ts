import { Component, OnInit } from '@angular/core';
import { ConsultItem, Home } from '@frontend/api-interface';
import { HomeFacadeService } from '@frontend/core-state';
import { Observable } from 'rxjs';
import { BeneficiariesIntegrationJobListComponent }
from './beneficiaries-integration-job-list/beneficiaries-integration-job-list.component';
import { JobOfferListComponent } from './job-offer-list/job-offer-list.component';
import { MySupportsListComponent } from './my-supports-list/my-supports-list.component';
import { PartnersListComponent } from './partners-list/partners-list.component';

@Component({
  selector: 'frontend-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  homeDataApi$: Observable<Home> = this.homeFacadeService.getHomData$;
  itemsRight: ConsultItem[] = [
    {
      name: 'emplois',
      title: ' Liste des emplois',
      component: JobOfferListComponent,
      icon: 'business',
    },
    {
      name: 'partenaires',
      title: 'Liste des partenaires',
      component: PartnersListComponent,
      icon: 'groups',
    },
  ];

  itemsLeft: ConsultItem[] = [
    {
      name: 'insertions',
      title: 'Liste des travailleurs article 60',
      component: BeneficiariesIntegrationJobListComponent,
      icon: 'work',
    },
    {
      name: 'beneficiaires',
      title: 'Liste de mes suivis',
      component: MySupportsListComponent,
      icon: 'folder_shared',
    }
  ];

  constructor(private homeFacadeService: HomeFacadeService) {}
  public homeDataLoading = true;

  ngOnInit(): void {
    this.loadHomeData();

    this.homeFacadeService.spinner$.subscribe((_) => {
      this.stopSpinner();
    });
  }

  loadHomeData() {
    this.homeFacadeService.loadData();
  }

  stopSpinner() {
    this.homeDataLoading = false;
  }
}
