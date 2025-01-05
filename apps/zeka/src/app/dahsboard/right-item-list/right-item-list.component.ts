import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'frontend-right-item-list',
  templateUrl: './right-item-list.component.html',
  styleUrls: ['./right-item-list.component.scss']
})
export class RightItemListComponent {
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
