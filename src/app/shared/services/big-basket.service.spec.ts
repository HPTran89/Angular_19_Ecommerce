import { TestBed } from '@angular/core/testing';

import { BigBasketService } from './big-basket.service';

describe('BigBasketService', () => {
  let service: BigBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
