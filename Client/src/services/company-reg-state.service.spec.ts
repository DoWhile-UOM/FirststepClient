import { TestBed } from '@angular/core/testing';

import { CompanyRegStateService } from './company-reg-state.service';

describe('CompanyRegStateService', () => {
  let service: CompanyRegStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyRegStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
