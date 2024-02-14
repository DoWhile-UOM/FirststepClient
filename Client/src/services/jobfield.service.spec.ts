import { TestBed } from '@angular/core/testing';

import { JobfieldService } from './jobfield.service';

describe('JobfieldService', () => {
  let service: JobfieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobfieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
