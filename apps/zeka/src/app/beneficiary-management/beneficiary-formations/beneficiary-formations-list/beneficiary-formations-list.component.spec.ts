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
import { BeneficiaryFormationsListComponent } from './beneficiary-formations-list.component';
import { MaterialModule } from '@frontend/material';

// import { BeneficiaryFormationsListComponent } from './beneficiary-formations-list.component';

// describe('BeneficiaryFormationsListComponent', () => {
//   let component: BeneficiaryFormationsListComponent;
//   let fixture: ComponentFixture<BeneficiaryFormationsListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ BeneficiaryFormationsListComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BeneficiaryFormationsListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   test('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('BeneficiaryFormationsListComponent', () => {
  let service: BeneficiariesFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiaryFormationsListComponent],
      imports: [HttpClientTestingModule,ReactiveFormsModule, MatSnackBarModule,RouterModule.forRoot([]),RouterTestingModule,MaterialModule ],
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
    const fixture = TestBed.createComponent(BeneficiaryFormationsListComponent);
    service = TestBed.inject(BeneficiariesFacade);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
