import { TestBed } from '@angular/core/testing';

import { ServicesIspFacadeService } from './services-isp-facade.service';

describe('ServicesIspFacadeService', () => {
  let service: ServicesIspFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesIspFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
