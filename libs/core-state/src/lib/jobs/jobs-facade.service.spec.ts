import { TestBed } from '@angular/core/testing';

import { JobsFacadeService } from './jobs-facade.service';

describe('JobsFacadeService', () => {
  let service: JobsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
