import { TestBed } from '@angular/core/testing';

import { PositionFacadeService } from './position-facade.service';

describe('PositionFacadeService', () => {
  let service: PositionFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
