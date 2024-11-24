import { TestBed } from '@angular/core/testing';

import { DocumentsFacadeService } from './documents-facade.service';

describe('DocumentsFacadeService', () => {
  let service: DocumentsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsFacadeService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
