import { TestBed } from '@angular/core/testing';

import { ServicesIspService } from './services-isp.service';

describe('ServicesIspService', () => {
  let service: ServicesIspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesIspService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
