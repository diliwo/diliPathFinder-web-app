import { TestBed } from '@angular/core/testing';

import { BeneficiariesFacade } from './beneficiaries-facade.service';

describe('BeneficiariesFacadeService', () => {
  let service: BeneficiariesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiariesFacade);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
