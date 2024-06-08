import { TestBed } from '@angular/core/testing';

import { RevisionService } from './revision.service';

describe('RevisionService', () => {
  let service: RevisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
