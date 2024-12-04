import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BeneficiariesService } from '@frontend/core-data';
import { BeneficiariesFacade, PositionFacadeService } from '@frontend/core-state';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchoolsComponent } from './schools.component';
import { MaterialModule } from '@frontend/material';

// import { SchoolsComponent } from './schools.component';

// describe('SchoolsComponent', () => {
//   let component: SchoolsComponent;
//   let fixture: ComponentFixture<SchoolsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ SchoolsComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SchoolsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   test('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('SchoolsComponent', () => {
  let service: BeneficiariesFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolsComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterModule.forRoot([]),
        RouterTestingModule,
        MaterialModule],
      providers: [
        BeneficiariesFacade,
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MatDialog,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(SchoolsComponent);
    service = TestBed.inject(BeneficiariesFacade);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
