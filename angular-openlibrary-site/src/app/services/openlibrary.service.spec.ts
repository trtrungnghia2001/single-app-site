import { TestBed } from '@angular/core/testing';

import { OpenlibraryService } from './openlibrary.service';

describe('OpenlibraryService', () => {
  let service: OpenlibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenlibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
