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
import { MaterialModule } from '@frontend/material';
import { PersonalExpectationComponent } from './personal-expectation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('PersonalExpectationComponent', () => {
//   let component: PersonalExpectationComponent;
//   let fixture: ComponentFixture<PersonalExpectationComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ PersonalExpectationComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PersonalExpectationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   test('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('PersonalExpectationComponent', () => {
  let service: BeneficiariesFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalExpectationComponent],
      imports: [MaterialModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                MatSnackBarModule,
                RouterModule.forRoot([]),
                RouterTestingModule,
                BrowserAnimationsModule
              ],
      providers: [BeneficiariesFacade,{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  });

  test('should create the app', () => {
    //component = new PersonalExpectationComponent(service,actRoute,positionFacadeServices);
    const fixture = TestBed.createComponent(PersonalExpectationComponent);
    service = TestBed.inject(BeneficiariesFacade);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
