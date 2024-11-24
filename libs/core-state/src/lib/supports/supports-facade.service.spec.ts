import { TestBed } from '@angular/core/testing';

import { SupportsFacadeService } from './supports-facade.service';

describe('SupportsFacadeService', () => {
  let service: SupportsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportsFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
