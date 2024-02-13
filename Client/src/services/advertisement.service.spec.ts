import { TestBed } from '@angular/core/testing';

import { AdvertisementServicesService } from './advertisement.service';

describe('AdvertisementServicesService', () => {
  let service: AdvertisementServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
