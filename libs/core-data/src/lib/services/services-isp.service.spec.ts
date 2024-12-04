import { TestBed } from '@angular/core/testing';

import { teamsService } from './services-isp.service';

describe('teamsService', () => {
  let service: teamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(teamsService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
