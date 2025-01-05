import { Component, OnInit } from '@angular/core';
import { DashboardItem } from '@frontend/api-interface';

@Component({
  selector: 'frontend-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  itemsRight: DashboardItem[] = [
    {
      name: 'partners',
      title: 'My partners',
      component: '',
      icon: 'groups',
    },
  ];

  itemsLeft: DashboardItem[] = [
    {
      name: 'clients',
      title: 'My clients',
      component: '',
      icon: 'folder_shared',
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }

}
