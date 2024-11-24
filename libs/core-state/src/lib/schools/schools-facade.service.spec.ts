import { TestBed } from '@angular/core/testing';

import { SchoolsFacadeService } from './schools-facade.service';

describe('SchoolsFacadeService', () => {
  let service: SchoolsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolsFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
