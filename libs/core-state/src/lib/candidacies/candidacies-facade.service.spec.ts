import { TestBed } from '@angular/core/testing';

import { CandidaciesFacadeService } from './candidacies-facade.service';

describe('CandidaciesFacadeService', () => {
  let service: CandidaciesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidaciesFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
