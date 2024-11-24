import { TestBed } from '@angular/core/testing';

import { CandidaciesService } from './candidacies.service';

describe('CandidaciesService', () => {
  let service: CandidaciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidaciesService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
