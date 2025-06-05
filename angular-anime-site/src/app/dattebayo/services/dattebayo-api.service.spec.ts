import { TestBed } from '@angular/core/testing';
import { DattebayoApiService } from './dattebayo-api.service';

describe('DattebayoApiService', () => {
  let service: DattebayoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DattebayoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
