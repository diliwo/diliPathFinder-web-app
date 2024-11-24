import { TestBed } from '@angular/core/testing';

import { FormationsFacadeService } from './formations-facade.service';

describe('FormationsFacadeService', () => {
  let service: FormationsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationsFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
