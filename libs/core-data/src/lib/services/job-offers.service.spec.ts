import { TestBed } from '@angular/core/testing';

import { JobOffersService } from './job-offers.service';

describe('JobOffersService', () => {
  let service: JobOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobOffersService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
