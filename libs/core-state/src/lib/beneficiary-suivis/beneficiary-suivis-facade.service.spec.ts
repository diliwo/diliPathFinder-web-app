import { TestBed } from '@angular/core/testing';

import { BeneficiarySuivisFacadeService } from './beneficiary-suivis-facade.service';

describe('BeneficiarySuivisFacadeService', () => {
  let service: BeneficiarySuivisFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiarySuivisFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
