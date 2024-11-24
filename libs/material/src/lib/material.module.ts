import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSourcePaginator, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableDataSource } from "@angular/material/table";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSortModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule
    //SharedModule
  ],
})
export class MaterialModule {}

export class MatTableState {
  public sortActive: string;
  public sortDirection?: 'asc' | 'desc' = 'asc';
  public pageIndex: number = 0;
  public pageSize: number;
  public filter: string = '';

  constructor(active: string, direction: 'asc' | 'desc', pageSize: number) {
      this.sortActive = active;
      this.sortDirection = direction;
      this.pageSize = pageSize;
  }

  public restoreState(dataSource: MatTableDataSource<any>) {
      this.setSort(dataSource.sort, this.sortActive, this.sortDirection);
      this.setPage(dataSource.paginator, this.pageIndex, this.pageSize);
      this.setFilter(dataSource, this.filter);
  }

  public bind(dataSource: MatTableDataSource<any>) {
      dataSource.sort.sortChange.subscribe((e: { active: string, direction: 'asc' | 'desc' }) => {
          this.sortActive = e.active;
          this.sortDirection = e.direction;
      });
      dataSource.paginator.page.subscribe((e: PageEvent) => {
          this.pageIndex = e.pageIndex;
          this.pageSize = e.pageSize;
      });
  }

  // see: https://github.com/angular/components/issues/10242#issuecomment-470726829
  private setSort(sort: MatSort, active: string, direction?: 'asc' | 'desc') {
      if (active) {
          sort.sort({ id: null, start: direction, disableClear: false });
          sort.sort({ id: active, start: direction, disableClear: false });
          const header = sort.sortables.get(active) as MatSortHeader;
          if (header)
              header._setAnimationTransitionState({ toState: 'active' });
      }
  }

  // see: https://github.com/angular/components/issues/8417#issuecomment-453253715
  private setPage(paginator: MatTableDataSourcePaginator, pageIndex: number, pageSize: number) {
      paginator.pageIndex = pageIndex;
      paginator.pageSize = pageSize;
      //todo: utile ?
      //(this.paginator as any)._emitPageEvent(pageIndex);
  }

  private setFilter(dataSource: MatTableDataSource<any>, filter: string) {
      dataSource.filter = filter;
  }
}
