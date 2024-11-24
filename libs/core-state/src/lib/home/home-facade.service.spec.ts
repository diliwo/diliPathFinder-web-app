import { TestBed } from '@angular/core/testing';

import { HomeFacadeService } from './home-facade.service';

describe('HomeFacadeService', () => {
  let service: HomeFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
