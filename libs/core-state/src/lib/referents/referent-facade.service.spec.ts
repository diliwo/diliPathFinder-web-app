import { TestBed } from '@angular/core/testing';

import { ReferentFacadeService } from './referent-facade.service';

describe('ReferentFacadeService', () => {
  let service: ReferentFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferentFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
