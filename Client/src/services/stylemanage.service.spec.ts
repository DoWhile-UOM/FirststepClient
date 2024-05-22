import { TestBed } from '@angular/core/testing';

import { StylemanageService } from './stylemanage.service';

describe('StylemanageService', () => {
  let service: StylemanageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StylemanageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
