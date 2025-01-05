import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'frontend-left-item-list',
  templateUrl: './left-item-list.component.html',
  styleUrls: ['./left-item-list.component.scss']
})
export class LeftItemListComponent {
  @Input() item;
  @Input() nbrItems;
  listOfItems:any[] = [];

    constructor(
      public dialog: MatDialog
    ) { }

    openList(){
      //const jobs = this.jobs;
      const dlg = this.dialog.open(this.item.component, { data: {
        title: this.item.title,
        iconItem: this.item.icon
      },
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'});
    }
  }

