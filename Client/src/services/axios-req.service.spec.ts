import { TestBed } from '@angular/core/testing';

import { AxiosReqService } from './axios-req.service';

describe('AxiosReqService', () => {
  let service: AxiosReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxiosReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
