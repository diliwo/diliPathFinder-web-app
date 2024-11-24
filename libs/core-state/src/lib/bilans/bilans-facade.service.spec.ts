import { TestBed } from '@angular/core/testing';

import { BilansFacadeService } from './bilans-facade.service';

describe('BilansFacadeService', () => {
  let service: BilansFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilansFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
