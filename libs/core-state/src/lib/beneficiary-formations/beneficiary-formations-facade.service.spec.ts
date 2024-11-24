import { TestBed } from '@angular/core/testing';

import { BeneficiaryFormationsFacadeService } from './beneficiary-formations-facade.service';

describe('BeneficiaryFormationsFacadeService', () => {
  let service: BeneficiaryFormationsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryFormationsFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
