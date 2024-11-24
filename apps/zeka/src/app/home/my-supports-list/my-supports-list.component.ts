import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BeneficiariesService, SupportsService } from '@frontend/core-data';
import { BeneficiariesFacade, MySupportDataSource, SupportsFacadeService } from '@frontend/core-state';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'frontend-my-supports-list',
  templateUrl: './my-supports-list.component.html',
  styleUrls: ['./my-supports-list.component.scss']
})
export class MySupportsListComponent {
  title: string;
  iconItem: string;
  constructor(
    private beneficiariesFacadeService: BeneficiariesFacade,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MySupportsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, iconItem: string }
  ) {
    this.title = data.title;
    this.iconItem = data.iconItem;
  }

  close() {
    this.dialogRef.close();
  }

  refreshBeneficiaries(date: string[]){
    this.beneficiariesFacadeService.refreshMyBeneficiaries(date);
  }
}
