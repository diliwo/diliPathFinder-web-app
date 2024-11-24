import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BeneficiariesFacade, MatTableState, StateService } from '@frontend/core-state';
import { BeneficiaryLookUp, JobDetail } from '@frontend/api-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash-es';
import { Router } from '@angular/router';

@Component({
  selector: 'frontend-job-candidacies-list',
  templateUrl: './job-candidacies-list.component.html',
  styleUrls: ['./job-candidacies-list.component.scss']
})
export class JobCandidaciesListComponent implements AfterViewInit, OnDestroy{
  displayedColumns: string[] = [
    'name',
    'numDos'
   ];
   dataSource: MatTableDataSource<BeneficiaryLookUp> = new MatTableDataSource();
   filter: string;
   state: MatTableState;
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<JobCandidaciesListComponent>,
    public snackBar: MatSnackBar,
    private stateService: StateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { candidacies: BeneficiaryLookUp[] }
  ) {
    this.state = this.stateService.candidacyState;
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
    this.dataSource.data = this.data.candidacies;
    this.state.restoreState(this.dataSource);
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }
  close(){
    this.dialogRef.close();
  }

  redirectToBeneficiary(niss: string){
    this.dialogRef.close();
    this.router.navigate(['/beneficiary',niss,'jobs']);
  }
}
