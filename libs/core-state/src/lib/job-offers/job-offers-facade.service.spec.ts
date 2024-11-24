import { TestBed } from '@angular/core/testing';

import { JobOffersFacadeService } from './job-offers-facade.service';

describe('JobOffersFacadeService', () => {
  let service: JobOffersFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobOffersFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
