import { TestBed } from '@angular/core/testing';

import { SeekerService } from './seeker.service';

describe('SeekerService', () => {
  let service: SeekerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeekerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
