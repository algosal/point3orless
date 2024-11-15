import { TestBed } from '@angular/core/testing';

import { DynamicPriceRestrictionService } from './dynamic-price-restriction.service';

describe('DynamicPriceRestrictionService', () => {
  let service: DynamicPriceRestrictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicPriceRestrictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
