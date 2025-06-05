import { TestBed } from '@angular/core/testing';

import { DragonballApiService } from './dragonball-api.service';

describe('DragonballApiService', () => {
  let service: DragonballApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragonballApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
