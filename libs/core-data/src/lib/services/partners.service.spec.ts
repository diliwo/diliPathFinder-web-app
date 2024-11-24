import { TestBed } from '@angular/core/testing';

import { PartnersService } from './partners.service';

describe('PartnersService', () => {
  let service: PartnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnersService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
