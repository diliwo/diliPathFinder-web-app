import { TestBed } from '@angular/core/testing';

import { SupportsService } from './supports.service';

describe('SupportsService', () => {
  let service: SupportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportsService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
