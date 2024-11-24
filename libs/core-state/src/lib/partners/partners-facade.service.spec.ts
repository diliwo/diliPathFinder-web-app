import { TestBed } from '@angular/core/testing';

import { PartnersFacadeService } from './partners-facade.service';

describe('PartnersFacadeService', () => {
  let service: PartnersFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnersFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
