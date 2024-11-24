import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Input,  OnDestroy,  Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentDetail, EmploymentStatusHistory, EmploymentStatusItem } from '@frontend/api-interface';
import { MatTableState, StateService } from '@frontend/core-state';

@Component({
  selector: 'frontend-beneficiary-employment-status-history',
  templateUrl: './beneficiary-employment-status-history.component.html',
  styleUrls: ['./beneficiary-employment-status-history.component.scss']
})
export class BeneficiaryEmploymentStatusHistoryComponent implements AfterViewInit, OnDestroy{
  displayedColumns: string[] = [
    'date',
    'employmentStatus'
   ];
   dataSource: MatTableDataSource<EmploymentStatusItem> = new MatTableDataSource();
   filter: string;
   state: MatTableState;
   @Input() data : EmploymentStatusItem[] = [];
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BeneficiaryEmploymentStatusHistoryComponent>,
    public snackBar: MatSnackBar,
    private stateService: StateService,
  ) {
    this.state = this.stateService.historyState;
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.state.bind(this.dataSource)
      this.refresh();
    },0)
  }

  refresh(){
    this.dataSource.data = this.data;
    this.state.restoreState(this.dataSource);
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }
  close(){
    this.dialogRef.close();
  }
}
