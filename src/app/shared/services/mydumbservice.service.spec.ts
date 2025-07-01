import { TestBed } from '@angular/core/testing';

import { MydumbserviceService } from './mydumbservice.service';

describe('MydumbserviceService', () => {
  let service: MydumbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MydumbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
