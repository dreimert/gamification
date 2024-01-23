import { TestBed } from '@angular/core/testing';

import { TpScrappingService } from './tp-scrapping.service';

describe('TpScrappingService', () => {
  let service: TpScrappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TpScrappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
