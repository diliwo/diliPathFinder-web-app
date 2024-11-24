import { TestBed } from '@angular/core/testing';

import { ReferentService } from './referent.service';

describe('ReferentService', () => {
  let service: ReferentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferentService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
